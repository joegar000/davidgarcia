import { useState } from "react";
import ReactPaginate from "react-paginate";
import data from "../data/mock-db.json";

export function Blog() {
    // TODO: Replace `posts` with `data`
    let posts = [
        { title: 'Placeholder', subtitle: 'this is a subtitle', html: '<p>hi</p>' },
        { title: 'Placeholder', subtitle: 'this is a subtitle', html: '<p>hi</p>' },
        { title: 'Placeholder', subtitle: 'this is a subtitle', html: '<p>hi</p>' },
        { title: 'Placeholder', subtitle: 'this is a subtitle', html: '<p>hi</p>' },
        { title: 'Placeholder', subtitle: 'this is a subtitle', html: '<p>hi</p>' },
        { title: 'Placeholder', subtitle: 'this is a subtitle', html: '<p>hi</p>' },
        { title: 'Placeholder', subtitle: 'this is a subtitle', html: '<p>hi</p>' },
        { title: 'Placeholder', subtitle: 'this is a subtitle', html: '<p>hi</p>' },
        { title: 'Placeholder', subtitle: 'this is a subtitle', html: '<p>hi</p>' },
        { title: 'Placeholder', subtitle: 'this is a subtitle', html: '<p>hi</p>' },
        { title: 'Placeholder', subtitle: 'this is a subtitle', html: '<p>hi</p>' },
        { title: 'Placeholder', subtitle: 'this is a subtitle', html: '<p>hi</p>' },
        { title: 'Placeholder', subtitle: 'this is a subtitle', html: '<p>hi</p>' },
        { title: 'Placeholder', subtitle: 'this is a subtitle', html: '<p>hi</p>' },
    ];
    const [resultsNum, setResultsNum] = useState(10);
    const [pageNum, setPageNum] = useState(0);

    const resultsStart = pageNum * resultsNum;
    const postsToRender = posts.slice(resultsStart, resultsStart + resultsNum);
    const totalPages = Math.ceil(posts.length / resultsNum);
    if (pageNum > totalPages - 1)
        setPageNum(totalPages - 1);
    return (
        <>
            <div className="row my-4 m-auto w-50">
                <div className="col-auto">
                    <label className="form-label" htmlFor="resultsPerPageInput">Results per page</label>
                    <input className="form-control" type="number" defaultValue={resultsNum} min="1" max={`${posts.length}`}
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
            <div className="d-flex align-items-center mt-4 flex-column">
                {postsToRender.map((post, i) => <PostCard key={i + resultsStart} {...post} />)}
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


export function PostCard(props) {
    return (
        <div className="card w-50 my-3">
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">{props.subtitle}</h6>
            </div>
        </div>
    );
}