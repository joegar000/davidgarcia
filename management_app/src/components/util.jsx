import { useEffect, useRef } from "react";
import { DOMSerializer, DOMParser } from "prosemirror-model";
import { EditorView } from "prosemirror-view";
import { EditorState } from "prosemirror-state";
import { schema } from "prosemirror-schema-basic";
import { history, undo, redo } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";


export function PostForm(props) {

    return (
        <>
            <div className="row justify-content-center mb-3">
                <label className="form-control-label" htmlFor="title">Title:</label>
                <input className="form-control" value={props.title} id="title" type="text" onChange={e => props.setTitle(e.target.value)} />
            </div>
            <div className="row justify-content-center mb-3">
                <label className="form-control-label" htmlFor="subtitle">Subtitle:</label>
                <input className="form-control" id="subtitle" value={props.subtitle} type="text" onChange={e => props.setSubtitle(e.target.value)} />
            </div>
            <div className="row justify-content-center mb-3">
                <input type="hidden" id="html" />
                <label className="form-control-label" htmlFor="htmlEditor">HTML:</label>
                <ProseMirror id="htmlEditor" className="p-0" defaultValue={props.html} onChange={(value) => props.setHtml(value)} />
            </div>
        </>
    );
}

export function ProseMirror(props) {
    const ref = useRef(document.createElement('div'));
    const inputRef = useRef(document.createElement('input'));

    const { defaultValue, onChange, ...editorProps } = props;


    useEffect(() => {
        if (ref.current.querySelector('div.ProseMirror')) return;

        defaultValue && (ref.current.innerHTML = defaultValue);

        const domSerializer = DOMSerializer.fromSchema(schema);
        const doc = DOMParser.fromSchema(schema).parse(ref.current);
        ref.current.innerHTML = '';

        let state = EditorState.create({
            doc,
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