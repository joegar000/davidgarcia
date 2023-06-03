export function saveNewPost(data) {
    window.api.editPosts((posts) => {
        posts.push(data);
    });
    alert('New post saved');
}