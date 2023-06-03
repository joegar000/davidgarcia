import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";
import { contextBridge } from "electron";

const PATH_TO_DATA = __dirname + '/../../website/src/data/mock-db.json';

const adapter = new JSONFileSync(PATH_TO_DATA);
const db = new LowSync(adapter, { posts: [], projects: [], drafts: [] });

window.api = {
    editPosts: (callback) => {
        db.read();
        callback(db.data.posts);
        db.write();
    },
    editDrafts: (callback) => {
        db.read();
        callback(db.data.drafts);
        db.write();
    },
    editProjects: (callback) => {
        db.read();
        callback(db.data.projects);
        db.write();
    }
};
