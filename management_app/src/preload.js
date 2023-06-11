import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";
import { contextBridge } from "electron";

const PATH_TO_DATA = __dirname + '/../../website/public/mock-db.json';

const adapter = new JSONFileSync(PATH_TO_DATA);
const db = new LowSync(adapter, { posts: [], projects: [], drafts: [] });

window.api = {
    editPosts: (callback) => {
        db.read();
        callback(db.data.posts);
        db.write();
    },
    getPosts: () => {
        db.read();
        return db.data.posts;
    },
    editDrafts: (callback) => {
        db.read();
        callback(db.data.drafts);
        db.write();
    },
    getDrafts: () => {
        db.read();
        return db.data.drafts;
    },
    editProjects: (callback) => {
        db.read();
        callback(db.data.projects);
        db.write();
    },
    getProjects: () => {
        db.read();
        return db.data.projects;
    }
};
