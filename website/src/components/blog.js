import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { EmailSignUp } from "./email-signup";
import { Paging } from "./paging";

export function Blog() {
    const { posts } = useLoaderData();
    const [resultsNum, setResultsNum] = useState(Math.min(10, posts.length));
    const [pageNum, setPageNum] = useState(0);

    const resultsStart = pageNum * resultsNum;
    const postsToRender = posts.slice().reverse().slice(resultsStart, resultsStart + resultsNum);
    const totalPages = Math.ceil(posts.length / resultsNum);
    if (pageNum > totalPages - 1)
        setPageNum(totalPages - 1);

    return (
        <Paging pageNum={pageNum} setPageNum={setPageNum} resultsNum={resultsNum} setResultsNum={setResultsNum}
            maxPerPage={posts.length} totalPages={totalPages}
        >
            <div className="d-flex align-items-center mt-4 flex-column">
                {postsToRender.map((post, i) => <PostCard key={i + resultsStart} {...post} id={posts.indexOf(post) + 1} />)}
            </div>
        </Paging>
    );
}


export function PostCard(props) {
    return (
        <div className="post-card card w-50 my-3">
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">{props.subtitle}</h6>
                <p className="card-subtitle mb-2 text-body-secondary">{props.date}</p>
                <Link to={`${props.id}`} className="btn btn-primary stretched-link" style={{ display: 'contents' }} />
            </div>
        </div>
    );
}

export async function postsLoader({ params }) {
    const data = await fetch('mock-db.json').then(res => res.json());
    return { posts: data.posts, id: params.postId - 1 };
}

export async function postLoader({ params }) {
    const data = await fetch('mock-db.json').then(res => res.json());
    return { post: data.posts[params.postId - 1] };
}

export function BlogPost() {
    const { post } = useLoaderData();

    return (
        <div className="d-flex justify-content-center mt-5">
            <div className="w-75">
                <h1>{post.title}</h1>
                <h5>{post.subtitle}</h5>
                <p>{post.date}</p>
                <hr />
                <div className="mt-3 mb-5 blog-content">
                    <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
                </div>
                <hr />
                <EmailSignUp />
            </div>
        </div >
    );
}
