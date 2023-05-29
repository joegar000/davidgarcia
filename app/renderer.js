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

document.addEventListener('DOMContentLoaded', () => {
    const editor = document.querySelector('.editor');
    const input = document.querySelector('#html');

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
            input.value = target.outerHTML;
        }
    });
    view.dom.classList.add('form-control', 'p-3');
});
