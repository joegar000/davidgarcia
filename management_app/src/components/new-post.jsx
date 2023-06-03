import { Link } from "react-router-dom";
import { useState } from "react";
import { ProseMirror } from "./util";
import { saveNewPost } from "./api";

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
            <div className="row justify-content-center mb-3">
                <label className="form-control-label" htmlFor="title">Title:</label>
                <input className="form-control" id="title" type="text" onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="row justify-content-center mb-3">
                <label className="form-control-label" htmlFor="subtitle">Subtitle:</label>
                <input className="form-control" id="subtitle" type="text" onChange={e => setSubtitle(e.target.value)} />
            </div>
            <div className="row justify-content-center mb-3">
                <input type="hidden" id="html" />
                <label className="form-control-label" htmlFor="htmlEditor">HTML:</label>
                <ProseMirror id="htmlEditor" className="p-0" onChange={(value) => setHtml(value)} />
            </div>
            <div className="row">
                <div className="col-auto">
                    <button className="btn btn-success w-auto" id="submit-new-post" type="button"
                        onClick={() => {
                            saveNewPost({ title, subtitle, html, date: new Date().toDateString() })
                        }}
                    >Submit</button>
                </div>
                <div className="col-auto">
                    <button className="btn btn-warning w-auto" id="submit-draft-post" type="button">Submit as Draft</button>
                </div>
                <div className="col-auto">
                    <Link to="/" className="btn btn-danger w-auto">Cancel</Link>
                </div>
            </div>
        </>
    );
}
