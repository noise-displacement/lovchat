import { Route, Routes, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Index from "../pages/Index";
import { AnimatePresence } from "framer-motion";

function SiteRoutes(props) {
  const location = useLocation();
  const pages = props.pages;

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index />} />
          {pages.map((page) => {
            return (
              <Route key={page.title} path={page.path} element={page.element} />
            );
          })}
      </Routes>
    </AnimatePresence>
  );
}

SiteRoutes.propTypes = {
  pages: PropTypes.array,
};

export default SiteRoutes;
