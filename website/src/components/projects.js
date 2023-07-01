import { useState, useEffect } from "react";
import { Paging } from "./paging";
import { useLoaderData } from "react-router-dom";

export function Projects() {
    const { projects } = useLoaderData();
    const [resultsNum, setResultsNum] = useState(Math.min(4, projects.length));
    const [pageNum, setPageNum] = useState(0);

    const resultsStart = pageNum * resultsNum * 3;
    const projectsToRender = projects.slice(resultsStart, resultsStart + resultsNum * 3);
    const totalPages = Math.ceil(Math.ceil(projects.length / 3) / resultsNum);
    if (pageNum > totalPages - 1)
        setPageNum(totalPages - 1);
    return (
        <Paging pageNum={pageNum} setPageNum={setPageNum} resultsNum={resultsNum} setResultsNum={setResultsNum}
            maxPerPage={projects.length - 1} totalPages={totalPages}
        >
            <div className="d-flex justify-content-center">
                <div className="row w-75">
                    {projectsToRender.map((project, i) => <div key={i} className="col-md-4 pt-5"><ProjectCard {...project} /></div>)}
                </div>
            </div>
        </Paging>
    );
}

export async function projectsLoader() {
    const data = await fetch('mock-db.json').then(res => res.json());
    return { projects: data.projects };
}

export function ProjectCard(props) {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">Tags: {props.tags.join(', ')}</h6>
                <p className="card-text">{props.description}</p>
                {props.links.map((link, i) => {
                    return (
                        <a key={i} className="card-link" href={link.link} target="_blank">{link.text}</a>
                    );
                })}
            </div>
        </div>
    );
}
