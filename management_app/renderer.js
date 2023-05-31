import "bootstrap-icons/bootstrap-icons.svg";
import "bootstrap/dist/css/bootstrap.css";
import "prosemirror-view/style/prosemirror.css";
import { history } from "prosemirror-history";
import { DOMSerializer } from "prosemirror-model";
import { schema } from "prosemirror-schema-basic"
import { EditorState } from "prosemirror-state"
import { EditorView } from "prosemirror-view"
import { keymap } from "prosemirror-keymap";
import { history, undo, redo } from "prosemirror-history";
import { baseKeymap } from "prosemirror-commands";

import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";

document.addEventListener('DOMContentLoaded', () => {
    const editor = document.querySelector('.editor');
    const html = document.querySelector('#html');
    const title = document.querySelector('#title');
    const subtitle = document.querySelector('#subtitle');

    const domSerializer = DOMSerializer.fromSchema(schema);
    let state = EditorState.create({
        schema,
        plugins: [
            history(),
            keymap({ "Mod-z": undo, "Mod-y": redo }),
            keymap(baseKeymap)
        ]
    });
    let view = new EditorView(editor, {
        state,
        dispatchTransaction(transaction) {
            let newState = view.state.apply(transaction)
            view.updateState(newState);
            const target = document.createElement('div');
            domSerializer.serializeFragment(newState.doc.content, { document }, target);
            html.value = target.outerHTML;
        },
        attributes: { class: 'form-control' }
    });

    const submitButton = document.querySelector('#submit-new-post');
    submitButton.addEventListener('click', async () => {
        const data = {
            title: title.value,
            subtitle: subtitle.value,
            html: html.value,
            date: new Date().toDateString()
        };

        const adapter = new JSONFileSync('../src/data/mock-db.json');
        const db = new LowSync(adapter, {});

        db.read();

        db.data.posts.push(data);
        alert('Data written');
    });
});
