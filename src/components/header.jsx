import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import PropTypes from "prop-types";
import Img from "gatsby-image";

export default function Header({ children }) {
  const data = useStaticQuery(graphql`
    query MyQuery {
      file(relativePath: { eq: "profile-picture.jpg" }) {
        childImageSharp {
          fixed(width: 100) {
            ...GatsbyImageSharpFixed
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
            Full-Stack Software Engineer based in Lancaster, PA. Interested in
            compilers and distributed systems. Recent graduate of Kutztown
            University with a B.S. in Computer Science.
          </h3>
        </div>
        <div className="text-right pl-40 hidden sm:inline-block">
          <Img
            className="rounded-full h-20 w-20"
            fluid={data.file.childImageSharp.fixed}
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
