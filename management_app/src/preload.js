import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";
import { Feed } from "feed";

const PATH_TO_DATA = __dirname + '/../../website/public/mock-db.json';

const adapter = new JSONFileSync(PATH_TO_DATA);
const db = new LowSync(adapter, { posts: [], projects: [], drafts: [] });

window.api = {
    editPosts: (callback) => {
        db.read();
        if (!db.data.posts)
            db.data.posts = [];
        callback(db.data.posts);
        db.write();
    },
    getPosts: () => {
        db.read();
        return db.data.posts;
    },
    editDrafts: (callback) => {
        db.read();
        if (!db.data.drafts)
            db.data.drafts = [];
        callback(db.data.drafts);
        db.write();
    },
    getDrafts: () => {
        db.read();
        return db.data.drafts;
    },
    editProjects: (callback) => {
        db.read();
        if (!db.data.projects)
            db.data.projects = [];
        callback(db.data.projects);
        db.write();
    },
    getProjects: () => {
        db.read();
        return db.data.projects;
    }
};

function updateRSS() {
    const feed = new Feed({
        title: 'David Garcia',
        description: 'The personal blog of David Garcia',
        copyright: 'David Garcia',
        updated: new Date().toGMTString(),
        id: 'https://joegar000.github.io/davidgarcia/',
        link: 'https://joegar000.github.io/davidgarcia/',
        author: {
            name: 'David Garcia',
            email: 'joegar000@gmail.com'
        }
    });
    db.data.posts.forEach((post, i) => {
        const url = `https://joegar000.github.io/davidgarcia/#/blog/${i}`;
        feed.addItem({
            title: post.title,
            id: url,
            link: url,
            description: post.subtitle,
            date: new Date(post.date).toGMTString()
        });
    });
}
