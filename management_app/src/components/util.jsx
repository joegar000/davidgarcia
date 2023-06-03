import { useEffect, useRef } from "react";
import { DOMSerializer } from "prosemirror-model";
import { EditorView } from "prosemirror-view";
import { EditorState } from "prosemirror-state";
import { schema } from "prosemirror-schema-basic";
import { history, undo, redo } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";

export function ProseMirror(props) {
    const ref = useRef(document.createElement('div'));
    const inputRef = useRef(document.createElement('input'));

    const { value, onChange, ...editorProps } = props;

    value && (ref.current.innerHTML = value);

    useEffect(() => {
        if (ref.current.querySelector('div[contenteditable]')) return;
        const domSerializer = DOMSerializer.fromSchema(schema);
        let state = EditorState.create({
            schema,
            plugins: [
                history(),
                keymap({ "Mod-z": undo, "Mod-y": redo }),
                keymap(baseKeymap)
            ]
        });
        let view = new EditorView(ref.current, {
            state,
            dispatchTransaction(transaction) {
                let newState = view.state.apply(transaction)
                view.updateState(newState);
                const target = document.createElement('div');
                domSerializer.serializeFragment(newState.doc.content, { document }, target);
                inputRef.current.value = target.outerHTML;
                onChange && onChange(target.outerHTML);
            },
            attributes: { class: 'form-control' }
        });
    }, []);

    return (
        <>
            <input className="editor-input" ref={inputRef} type="hidden" onChange={onChange} />
            <div {...editorProps} ref={ref}></div>
        </>
    )
}