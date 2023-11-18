import { editDraft, getDrafts, saveNewPost, editDraft } from "./api";
import { Link, useLoaderData } from "react-router-dom";
import { useState } from "react";
import { PostForm } from "./util";

export function DraftList() {
    const drafts = getDrafts();
    return (
        <>
            <div className="position-absolute py-4" style={{ top: 0 }}>
                <Link to="/" className="w-auto">
                    Go Home
                </Link>
            </div>
            {drafts.map((draft, id) => {
                return (
                    <div className="post-card card w-100 my-3" key={id}>
                        <div className="card-body">
                            <h5 className="card-title">{draft.title}</h5>
                            <h6 className="card-subtitle mb-2 text-body-secondary">{draft.subtitle}</h6>
                            <p className="card-subtitle mb-2 text-body-secondary">{draft.date}</p>
                            <Link to={`/edit_drafts/${id + 1}`} className="btn btn-primary stretched-link" style={{ display: 'contents' }} />
                        </div>
                    </div >
                );
            })}
        </>
    );
}

export function draftLoader({ params }) {
    const drafts = getDrafts();
    return { ...drafts[params.draftId - 1], id: params.draftId - 1 };
}

export function EditDraft() {
    const draft = useLoaderData();
    return <EditDraftHelper draft={draft} />
}

export function EditDraftHelper({ draft }) {
    const [title, setTitle] = useState(draft.title);
    const [subtitle, setSubtitle] = useState(draft.subtitle);
    const [html, setHtml] = useState(draft.html);
    return (
        <>
            <div className="position-absolute py-4" style={{ top: 0 }}>
                <Link to="/edit_drafts" className="w-auto">
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
                            saveNewPost({ title, subtitle, html, date: new Date().toDateString() }, draft.id);
                        }}
                    >
                        Submit
                    </button>
                </div>
                <div className="col-auto">
                    <button className="btn btn-warning w-auto" id="submit-draft-post" type="button"
                        onClick={() => {
                            editDraft({ title, subtitle, html, date: new Date().toDateString() }, draft.id);
                        }}
                    >
                        Submit as Draft
                    </button>
                </div>
                <div className="col-auto">
                    <Link to="/edit_drafts" className="btn btn-danger w-auto">Cancel</Link>
                </div>
            </div>
        </>
    );
}
