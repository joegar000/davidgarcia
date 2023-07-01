import ReactPaginate from "react-paginate";

export function Paging({ children, pageNum, setPageNum, resultsNum, setResultsNum, max: maxPerPage, totalPages }) {
    return (
        <>
            <div className="row d-md-flex justify-content-center my-4 m-auto w-50">
                <div className="col-auto m-md-0 mb-3">
                    <label className="form-label" htmlFor="resultsPerPageInput">Rows per page</label>
                    <input className="form-control" type="number" value={resultsNum} min="1" max={maxPerPage}
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
            {children}
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