import { Link } from "react-router-dom";
import { useState } from "react";
import { PostForm } from "./util";
import { saveNewDraft, saveNewPost } from "./api";

export function NewPost() {
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [html, setHtml] = useState('');

    return (
        <>
            <div className="position-absolute py-4" style={{ top: 0 }}>
                <Link to="/" className="w-auto">
                    Go Home
                </Link>
            </div>
            <PostForm setTitle={setTitle} setSubtitle={setSubtitle} setHtml={setHtml}
                title={title} subtitle={subtitle} html={html}
            />
            <div className="row">
                <div className="col-auto">
                    <button className="btn btn-success w-auto" id="submit-new-post" type="button"
                        onClick={() => {
                            saveNewPost({ title, subtitle, html, date: new Date().toDateString() });
                        }}
                    >Submit</button>
                </div>
                <div className="col-auto">
                    <button className="btn btn-warning w-auto" id="submit-draft-post" type="button"
                        onClick={() => {
                            saveNewDraft({ title, subtitle, html, date: new Date().toDateString() });
                        }}
                    >
                        Submit as Draft
                    </button>
                </div>
                <div className="col-auto">
                    <Link to="/" className="btn btn-danger w-auto">Cancel</Link>
                </div>
            </div>
        </>
    );
}
