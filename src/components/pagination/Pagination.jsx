import React, { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { makeArray } from "../../helpers/makeArray";
import "./pagination.css";

export const Pagination = ({
  count,
  page,
  setPage,
  setPages,
  currentPathName,
  action,
  data,
}) => {
  const limit = 15;
  const { both } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlePageClick = (e) => {
    let istino = {};
    for (let key in data) {
      if (data[key] !== "" && data[key] !== null) {
        istino[key] = data[key];
      }
    }
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth",
    });
    navigate(`${currentPathName}/${both}/${Number(e.selected) + 1}`);
    setPage(e.selected);
    dispatch(action({ ...istino, page: Number(e.selected) + 1 }));
  };
  useEffect(() => {
    if (count) {
      setPages(makeArray(Math.ceil(count / limit)));
    }
  }, [count, limit, setPages]);
  return (
    <div className="pagination-box">
      <div>
        <ReactPaginate
          pageClassName="pagItem"
          // pageLinkClassName="page-link"
          previousClassName="pagItem next"
          previousLinkClassName="page-link"
          nextClassName="pagItem next"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="pagItem"
          forcePage={Number(page - 1)}
          // breakLinkClassName="page-link"
          activeClassName="ActivePagItem"
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={count}
          previousLabel="<"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
        />
      </div>
    </div>
  );
};
