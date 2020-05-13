import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import PropTypes from "prop-types";
import Img from "gatsby-image";

export default function Header({ children }) {
  const data = useStaticQuery(graphql`
    query MyQuery {
      file(relativePath: { eq: "profile-picture.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <div>
      <div className="inline-block">
        <h1 className="text-3xl font-bold pb-3">Aaron Raff</h1>
        <h3 className="text-1xl">
          Full-Stack Software Engineer at
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.fishtownanalytics.com/"
            className="font-bold"
          >
            <span> Fishtown Analytics</span>
          </a>
        </h3>
      </div>
      <Img
        className="rounded-full h-20 w-20 float-right hidden sm:inline-block"
        fluid={data.file.childImageSharp.fluid}
        alt="Aaron"
      />
      {children}
    </div>
  );
}

Header.propTypes = {
  children: PropTypes.element.isRequired,
};
