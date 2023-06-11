import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

export function Projects() {
    const [projects, setProjects] = useState([]);
    const [resultsNum, setResultsNum] = useState(Math.min(4, projects.length));
    const [pageNum, setPageNum] = useState(0);

    useEffect(() => {
        fetch('mock-db.json').then(response => response.json()).then(data => {
            setProjects(data.projects ?? []);
            setResultsNum(Math.min(4, (data.projects?.length ?? 0)));
        });
    }, []);

    const resultsStart = pageNum * resultsNum * 3;
    const projectsToRender = projects.slice(resultsStart, resultsStart + resultsNum * 3);
    const totalPages = Math.ceil(Math.ceil(projects.length / 3) / resultsNum);
    if (pageNum > totalPages - 1)
        setPageNum(totalPages - 1);
    return (
        <>
            <div className="row d-md-flex justify-content-center my-4 m-auto w-50">
                <div className="col-auto m-md-0 mb-3">
                    <label className="form-label" htmlFor="resultsPerPageInput">Rows per page</label>
                    <input className="form-control" type="number" value={resultsNum} min="1" max={`${Math.ceil(projects.length / 3)}`}
                        onChange={e => setResultsNum(Number(e.target.value))}
                    />
                </div>
                <div className="col-md d-flex justify-content-md-end justify-content-center align-items-end">
                    <nav>
                        <ReactPaginate forcePage={pageNum} className="pagination"
                            pageCount={totalPages} pageRangeDisplayed={2} marginPagesDisplayed={1}
                            activeClassName="disabled"
                            pageClassName="page-item" pageLinkClassName="page-link"
                            previousLabel="&laquo;" previousClassName="page-item" previousLinkClassName="page-link"
                            nextLabel="&raquo;" nextClassName="page-item" nextLinkClassName="page-link"
                            breakClassName="page-item" breakLinkClassName="page-link"
                            onPageChange={(item) => {
                                setPageNum(item.selected);
                            }}
                        />
                    </nav>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <div className="row w-75">
                    {projectsToRender.map((project, i) => <div key={i} className="col-md-4 pt-5"><ProjectCard {...project} /></div>)}
                </div>
            </div>
            <div className="d-flex mt-3 justify-content-center align-items-end" style={{ flexGrow: 10 }}>
                <nav>
                    <ReactPaginate forcePage={pageNum} className="pagination"
                        pageCount={totalPages} pageRangeDisplayed={2} marginPagesDisplayed={1}
                        activeClassName="disabled"
                        pageClassName="page-item" pageLinkClassName="page-link"
                        previousLabel="&laquo;" previousClassName="page-item" previousLinkClassName="page-link"
                        nextLabel="&raquo;" nextClassName="page-item" nextLinkClassName="page-link"
                        breakClassName="page-item" breakLinkClassName="page-link"
                        onPageChange={(item) => {
                            setPageNum(item.selected);
                        }}
                    />
                </nav>
            </div>
        </>
    );
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
