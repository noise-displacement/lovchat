import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";

function Nav(props) {
    const pages = props.pages;

  const [currentPage, setCurrentPage] = useState(undefined);

  return (
    <nav className="p-8 flex justify-between items-center sticky top-0">
      <div className="flex h-[75%]">
        <Link className="flex" to="/" onClick={() => setCurrentPage("/")}>
          <img src="/lovchatqm2.svg" />
        </Link>
      </div>

      <div>
        {pages.map((page) => {
            return (
                <Link
                key={page.title}
                className={`px-4 text-dark-red font-sans-alt text-lg ${
                    currentPage === page.path ? "underline" : ""
                }`}
                to={page.path}
                onClick={() => setCurrentPage(page.path)}
                >
                {page.title}
                </Link>
            );
        })}
      </div>
    </nav>
  );
}

Nav.propTypes = {
    pages: PropTypes.array
}

export default Nav;
