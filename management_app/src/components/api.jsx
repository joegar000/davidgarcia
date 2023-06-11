export function saveNewPost(data, draftId) {
    window.api.editPosts((posts) => {
        posts.push(data);
    });
    draftId !== undefined && window.api.editDrafts((drafts) => {
        drafts.splice(draftId, 1);
        alert('Removed from drafts');
    });
    alert('New post saved');
}

export function editPost(data, id) {
    window.api.editPosts((posts) => {
        posts[id] = { ...posts[id], ...data };
    });
    alert('Post edited successfully');
}

export function getPosts() {
    return window.api.getPosts();
}

export function saveNewDraft(data) {
    window.api.editDrafts((drafts) => {
        drafts.push(data);
    });
    alert('Draft saved');
}

export function editDraft(data, id) {
    window.api.editDrafts((drafts) => {
        drafts[id] = { ...drafts[id], data };
    });
    alert('Draft edits saved');
}

export function saveNewProject(data) {
    window.api.editProjects((projects) => {
        projects.push(data);
    });
    alert('Project saved');
}
