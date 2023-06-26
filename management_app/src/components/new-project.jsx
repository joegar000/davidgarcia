import { useState } from "react";
import { Link } from "react-router-dom";
import { ProjectsForm } from "./util";
import { saveNewProject } from "./api";

export function NewProject() {
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState([]);
    const [desc, setDesc] = useState('');
    const [links, setLinks] = useState([]);

    return (
        <>
            <div className="position-absolute py-4" style={{ top: 0 }}>
                <Link to="/" className="w-auto">
                    Go Home
                </Link>
            </div>
            <ProjectsForm title={title} setTitle={setTitle} tags={tags} setTags={setTags}
                desc={desc} setDesc={setDesc} links={links} setLinks={setLinks}
            />
            <div className="row">
                <div className="col-auto">
                    <button className="btn btn-success w-auto" id="submit-new-post" type="button"
                        onClick={() => {
                            saveNewProject({ title, tags, links, description: desc });
                        }}
                    >Submit</button>
                </div>
                <div className="col-auto">
                </div>
                <div className="col-auto">
                    <Link to="/" className="btn btn-danger w-auto">Cancel</Link>
                </div>
            </div>
        </>
    );
}