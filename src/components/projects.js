import { useState } from "react";
import ReactPaginate from "react-paginate";
import data from "../data/mock-db.json";

export function Projects() {
    let projects = [
        { title: 'Temp', tags: ['new', 'idea', 'idk'], links: [{ link: 'https://www.example.com', text: 'test' }, { link: 'https://www.google.com', text: 'test2' }], description: 'This is a sample description' },
        { title: 'Temp', tags: ['new', 'idea', 'idk'], links: [{ link: 'https://www.example.com', text: 'test' }, { link: 'https://www.google.com', text: 'test2' }], description: 'This is a sample description' },
        { title: 'Temp', tags: ['new', 'idea', 'idk'], links: [{ link: 'https://www.example.com', text: 'test' }, { link: 'https://www.google.com', text: 'test2' }], description: 'This is a sample description' },
        { title: 'Temp', tags: ['new', 'idea', 'idk'], links: [{ link: 'https://www.example.com', text: 'test' }, { link: 'https://www.google.com', text: 'test2' }], description: 'This is a sample description' },
        { title: 'Temp', tags: ['new', 'idea', 'idk'], links: [{ link: 'https://www.example.com', text: 'test' }, { link: 'https://www.google.com', text: 'test2' }], description: 'This is a sample description' },
        { title: 'Temp', tags: ['new', 'idea', 'idk'], links: [{ link: 'https://www.example.com', text: 'test' }, { link: 'https://www.google.com', text: 'test2' }], description: 'This is a sample description' },
        { title: 'Temp', tags: ['new', 'idea', 'idk'], links: [{ link: 'https://www.example.com', text: 'test' }, { link: 'https://www.google.com', text: 'test2' }], description: 'This is a sample description' },
        { title: 'Temp', tags: ['new', 'idea', 'idk'], links: [{ link: 'https://www.example.com', text: 'test' }, { link: 'https://www.google.com', text: 'test2' }], description: 'This is a sample description' },
        { title: 'Temp', tags: ['new', 'idea', 'idk'], links: [{ link: 'https://www.example.com', text: 'test' }, { link: 'https://www.google.com', text: 'test2' }], description: 'This is a sample description' },
        { title: 'Temp', tags: ['new', 'idea', 'idk'], links: [{ link: 'https://www.example.com', text: 'test' }, { link: 'https://www.google.com', text: 'test2' }], description: 'This is a sample description' },
        { title: 'Temp', tags: ['new', 'idea', 'idk'], links: [{ link: 'https://www.example.com', text: 'test' }, { link: 'https://www.google.com', text: 'test2' }], description: 'This is a sample description' },
        { title: 'Temp', tags: ['new', 'idea', 'idk'], links: [{ link: 'https://www.example.com', text: 'test' }, { link: 'https://www.google.com', text: 'test2' }], description: 'This is a sample description' },
        { title: 'Temp', tags: ['new', 'idea', 'idk'], links: [{ link: 'https://www.example.com', text: 'test' }, { link: 'https://www.google.com', text: 'test2' }], description: 'This is a sample description' },
        { title: 'Temp', tags: ['new', 'idea', 'idk'], links: [{ link: 'https://www.example.com', text: 'test' }, { link: 'https://www.google.com', text: 'test2' }], description: 'This is a sample description' },
        { title: 'Temp', tags: ['new', 'idea', 'idk'], links: [{ link: 'https://www.example.com', text: 'test' }, { link: 'https://www.google.com', text: 'test2' }], description: 'This is a sample description' },
        { title: 'Temp', tags: ['new', 'idea', 'idk'], links: [{ link: 'https://www.example.com', text: 'test' }, { link: 'https://www.google.com', text: 'test2' }], description: 'This is a sample description' },
        { title: 'Temp', tags: ['new', 'idea', 'idk'], links: [{ link: 'https://www.example.com', text: 'test' }, { link: 'https://www.google.com', text: 'test2' }], description: 'This is a sample description' },
        { title: 'Temp', tags: ['new', 'idea', 'idk'], links: [{ link: 'https://www.example.com', text: 'test' }, { link: 'https://www.google.com', text: 'test2' }], description: 'This is a sample description' },
        { title: 'Temp', tags: ['new', 'idea', 'idk'], links: [{ link: 'https://www.example.com', text: 'test' }, { link: 'https://www.google.com', text: 'test2' }], description: 'This is a sample description' },
        { title: 'Temp', tags: ['new', 'idea', 'idk'], links: [{ link: 'https://www.example.com', text: 'test' }, { link: 'https://www.google.com', text: 'test2' }], description: 'This is a sample description' },
        { title: 'Temp', tags: ['new', 'idea', 'idk'], links: [{ link: 'https://www.example.com', text: 'test' }, { link: 'https://www.google.com', text: 'test2' }], description: 'This is a sample description' },
        { title: 'Temp', tags: ['new', 'idea', 'idk'], links: [{ link: 'https://www.example.com', text: 'test' }, { link: 'https://www.google.com', text: 'test2' }], description: 'This is a sample description' },
    ]

    const [resultsNum, setResultsNum] = useState(4);
    const [pageNum, setPageNum] = useState(0);

    const resultsStart = pageNum * resultsNum * 3;
    const projectsToRender = projects.slice(resultsStart, resultsStart + resultsNum * 3);
    const totalPages = Math.ceil(Math.ceil(projects.length / 3) / resultsNum);
    if (pageNum > totalPages - 1)
        setPageNum(totalPages - 1);
    return (
        <>
            <div className="row my-4 m-auto w-50">
                <div className="col-auto">
                    <label className="form-label" htmlFor="resultsPerPageInput">Rows per page</label>
                    <input className="form-control" type="number" defaultValue={resultsNum} min="1" max={`${Math.ceil(projects.length / 3)}`}
                        onChange={e => setResultsNum(Number(e.target.value))}
                    />
                </div>
                <div className="col d-flex justify-content-end align-items-end">
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
                {props.links.map(link => {
                    return (
                        <a className="card-link" href={link.link} target="_blank">{link.text}</a>
                    );
                })}
            </div>
        </div>
    );
}
