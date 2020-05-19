import React from "react";
import PropTypes from "prop-types";
import Header from "./header";
import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <div className="my-16 mx-8 lg:my-16 lg:mx-40">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};
