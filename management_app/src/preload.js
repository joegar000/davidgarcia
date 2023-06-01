// const { contextBridge } = require('electron')
import { contextBridge } from "electron";

import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";


contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron
    // we can also expose variables, not just functions
})


window.addEventListener('DOMContentLoaded', () => {
    const html = document.querySelector('#html');
    const title = document.querySelector('#title');
    const subtitle = document.querySelector('#subtitle');

    const submitButton = document.querySelector('#submit-new-post');
    submitButton.addEventListener('click', async () => {
        const data = {
            title: title.value,
            subtitle: subtitle.value,
            html: html.value,
            date: new Date().toDateString()
        };

        console.log('path: ' + __dirname + '/../../website/src/data/mock-db.json')
        const adapter = new JSONFileSync(__dirname + '/../../website/src/data/mock-db.json');
        const db = new LowSync(adapter, { posts: [] });

        db.read();

        db.data.posts.push(data);

        db.write();

        alert('Data written');
        document.dispatchEvent(new CustomEvent('clearInputs'));
    });
});
