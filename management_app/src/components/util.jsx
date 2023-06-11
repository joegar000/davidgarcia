import { useEffect, useRef } from "react";
import { DOMSerializer, DOMParser } from "prosemirror-model";
import { useEffect, useRef, useState } from "react";
import { DOMSerializer, DOMParser, Schema } from "prosemirror-model";
import { EditorView } from "prosemirror-view";
import { EditorState } from "prosemirror-state";
import { nodes, marks } from "prosemirror-schema-basic";
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

export function ProjectsForm(props) {
    const [tag, setTag] = useState('');
    const [url, setUrl] = useState('');
    const [text, setText] = useState('');
    return (
        <>
            <div className="row justify-content-center mb-3">
                <label className="form-control-label" htmlFor="title">Title:</label>
                <input className="form-control" value={props.title} id="title" type="text" onChange={e => props.setTitle(e.target.value)} />
            </div>
            <div className="row justify-content-center mb-3">
                <div className="col">
                    <label className="form-control-label" htmlFor="tag">New Tag:</label>
                    <div className="row">
                        <input className="form-control" id="tag" value={tag} onChange={e => setTag(e.target.value)} />
                        <button className="btn btn-primary" onClick={() => (props.setTags([...props.tags, tag]), setTag(''))}>Add Tag</button>
                    </div>
                </div>
                <div className="col">
                    <label className="form-control-label" htmlFor="tags">Tags:</label>
                    <div id="tags">{props.tags.join(', ')}</div>
                </div>
            </div>
            <div className="row justify-content-center">
                <label className="form-control-label" htmlFor="desc">Description:</label>
                <input className="form-control" value={props.desc} id="desc" type="text" onChange={e => props.setDesc(e.target.value)} />
            </div>
            <div className="row justify-content-center">
                <div className="col">
                    <label className="form-control-label" htmlFor="link">New Link:</label>
                    <div className="row" id="link">
                        <div className="col">
                            <label className="form-control-label" htmlFor="url">Url:</label>
                            <input className="form-control" id="url" value={url} onChange={e => setUrl(e.target.value)} />
                        </div>
                        <div className="col">
                            <label className="form-control-label" htmlFor="text">Text:</label>
                            <input className="form-control" id="text" value={text} onChange={e => setText(e.target.value)} />
                        </div>
                        <button className="btn btn-primary" onClick={() => props.setLinks([...props.links, { link: url, text }])}>Add Link</button>
                    </div>
                </div>
                <div className="col">
                    <label className="form-control-label" htmlFor="link-list">Links:</label>
                    <div className="row" id="link-list">
                        {props.links.map(({ link, text }) => {
                            return (
                                <div className="row">
                                    <div className="col">{text}</div>
                                    <div className="col">{link}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

const mySchema = new Schema({
    nodes: {
        ...nodes,
        code_block: {
            content: "text*",
            marks: "",
            group: "block",
            code: true,
            defining: true,
            parseDOM: [{ tag: "pre", preserveWhitespace: "full" }],
            toDOM() { return ["pre", { class: 'bg-secondary-subtle rounded-2 p-2' }, ["code", 0]] }
        }
    },
    marks: {
        ...marks
    }
});
export function ProseMirror(props) {
    const ref = useRef(document.createElement('div'));
    const inputRef = useRef(document.createElement('input'));

    const { defaultValue, onChange, ...editorProps } = props;


    useEffect(() => {
        if (ref.current.querySelector('div.ProseMirror')) return;

        defaultValue && (ref.current.innerHTML = defaultValue);

        const domSerializer = DOMSerializer.fromSchema(mySchema);
        const doc = DOMParser.fromSchema(mySchema).parse(ref.current);
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