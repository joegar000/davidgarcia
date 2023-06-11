import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Link, useLoaderData } from "react-router-dom";

export function Blog() {
    const [posts, setPosts] = useState([]);
    const [resultsNum, setResultsNum] = useState(Math.min(10, posts.length));
    useEffect(() => {
        fetch('mock-db.json').then(response => response.json()).then(data => {
            setPosts(data.posts ?? []);
            setResultsNum(Math.min(10, (data.posts?.length ?? 0)));
        });
    }, []);
    const [pageNum, setPageNum] = useState(0);

    const resultsStart = pageNum * resultsNum;
    const postsToRender = posts.slice().reverse().slice(resultsStart, resultsStart + resultsNum);
    const totalPages = Math.ceil(posts.length / resultsNum);
    if (pageNum > totalPages - 1)
        setPageNum(totalPages - 1);
    return (
        <>
            <div className="row d-md-flex justify-content-center my-4 m-auto w-50">
                <div className="col-auto m-md-0 mb-3">
                    <label className="form-label" htmlFor="resultsPerPageInput">Results per page</label>
                    <input className="form-control" type="number" value={resultsNum} min="1" max={`${posts.length}`}
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
            <div className="d-flex align-items-center mt-4 flex-column">
                {postsToRender.map((post, i) => <PostCard key={i + resultsStart} {...post} id={posts.indexOf(post) + 1} />)}
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

export async function postLoader({ params }) {
    const data = await fetch('mock-db.json').then(res => res.json());
    return data.posts[params.postId - 1];
}

export function BlogPost() {
    const post = useLoaderData();
    return (
        <div className="d-flex justify-content-center mt-5">
            <div className="w-75">
                <h1>{post.title}</h1>
                <h5>{post.subtitle}</h5>
                <p>{post.date}</p>
                <hr />
                <div className="mt-3">
                    <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
                </div>
            </div>
        </div >
    );
}
