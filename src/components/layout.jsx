import React from "react";
import PropTypes from "prop-types";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Header from "./header";
import Footer from "./footer";

export default function Layout({ children }) {
  config.autoAddCss = false;
  return (
    <div className="font-body my-16 mx-8 lg:my-16 lg:mx-40">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};
