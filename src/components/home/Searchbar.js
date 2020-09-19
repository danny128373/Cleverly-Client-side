import React from "react";

export default function Searchbar(props) {
  return (
    <>
      <form>
        <div className="sb-example-1">
          <div className="search">
            <input
              id="search"
              ref={props.search}
              type="text"
              className="searchTerm"
              name="search"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  props.handleSearchSubmit();
                }
              }}
              placeholder="Search Communities"
            />
            <img
              type="submit"
              className="searchButton"
              onClick={(e) => {
                e.preventDefault();
                props.handleSearchSubmit();
              }}
              src="https://res.cloudinary.com/dp5l2gxzh/image/upload/v1600475622/12_svjlua.png"
            />
            <i className="fa fa-search"></i>
          </div>
        </div>
      </form>
    </>
  );
}
