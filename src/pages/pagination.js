import React, { useState, useEffect } from "react";

function Pagination({ showPerPage, paginationChange, total }) {
  const [counter, setCounter] = useState(1);

  const totalpageshow = Math.ceil(total / showPerPage);

  const [showbutton, setShowbutton] = useState(4);

  useEffect(() => {
    const value = showPerPage * counter;

    paginationChange(value - showPerPage, value);
  }, [counter]);
  const onButtonClick = (type) => {
    if (type === "prev") {
      if (counter === 1) {
        setCounter(1);
      } else {
        setCounter(counter - 1);
      }
    } else if (type === "next") {
      if (totalpageshow === counter) {
        setCounter(counter);
      } else {
        setCounter(counter + 1);
      }
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a
              className="page-link"
              href="#"
              onClick={() => onButtonClick("prev")}
            >
              Previous
            </a>
          </li>
          {new Array(showbutton).fill("").map((el, index) => (
            <li
              className={`page-item ${index + 1 === counter ? "active" : null}`} key={index}
            >
              <a
                className="page-link"
                href="#"
                onClick={() => setCounter(index + 1)}
              >
                {index}
              </a>
            </li>
          ))}

          <li className="page-item">
            <a
              className="page-link"
              href="#"
              onClick={() => onButtonClick("next")}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
