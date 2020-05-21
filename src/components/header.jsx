import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
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
      <div className="inline-block mb-20 flex">
        <div>
          <Link to="/" className="text-3xl font-bold mb-3 inline-block">
            Aaron Raff
          </Link>
          <h3 className="text-1xl font-light">
            Full-Stack Software Engineer with an interest in compilers and
            distributed systems. Recently graduated from Kutztown University
            with a B.S. in Computer Science.
          </h3>
        </div>
        <div className="text-right pl-40 hidden sm:inline-block">
          <Img
            className="rounded-full h-20 w-20"
            fluid={data.file.childImageSharp.fluid}
            alt="Aaron"
          />
        </div>
      </div>
      {children}
    </div>
  );
}

Header.propTypes = {
  children: PropTypes.element.isRequired,
};
