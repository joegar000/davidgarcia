import { editPost, getPosts } from "./api"
import { Link, useLoaderData } from "react-router-dom";
import { useMemo, useState } from "react";
import { PostForm } from "./util";

export function PostList() {
    const posts = getPosts();
    return (
        <>
            <div className="position-absolute py-4" style={{ top: 0 }}>
                <Link to="/" className="w-auto">
                    Go Home
                </Link>
            </div>
            {posts.map((post, id) => {
                return (
                    <div className="post-card card w-100 my-3" key={id}>
                        <div className="card-body">
                            <h5 className="card-title">{post.title}</h5>
                            <h6 className="card-subtitle mb-2 text-body-secondary">{post.subtitle}</h6>
                            <p className="card-subtitle mb-2 text-body-secondary">{post.date}</p>
                            <Link to={`/edit_posts/${id + 1}`} className="btn btn-primary stretched-link" style={{ display: 'contents' }} />
                        </div>
                    </div >
                );
            })}
        </>
    );
}

export function postLoader({ params }) {
    const posts = getPosts();
    return { ...posts[params.postId - 1], id: params.postId - 1 };
}

export function EditPost() {
    const post = useLoaderData();
    return <EditPostHelper post={post} />
}

export function EditPostHelper({ post }) {
    const [title, setTitle] = useState(post.title);
    const [subtitle, setSubtitle] = useState(post.subtitle);
    const [html, setHtml] = useState(post.html);
    return (
        <>
            <div className="position-absolute py-4" style={{ top: 0 }}>
                <Link to="/edit_posts" className="w-auto">
                    Back to post list
                </Link>
            </div>
            <PostForm setTitle={setTitle} setSubtitle={setSubtitle} setHtml={setHtml}
                title={title} subtitle={subtitle} html={html}
            />
            <div className="row">
                <div className="col-auto">
                    <button className="btn btn-success w-auto" id="submit-new-post" type="button"
                        onClick={() => {
                            editPost({ title, subtitle, html }, post.id);
                        }}
                    >
                        Submit
                    </button>
                </div>
                <div className="col-auto">
                    <button className="btn btn-warning w-auto" id="submit-draft-post" type="button">Submit as Draft</button>
                </div>
                <div className="col-auto">
                    <Link to="/edit_posts" className="btn btn-danger w-auto">Cancel</Link>
                </div>
            </div>
        </>
    );
}
