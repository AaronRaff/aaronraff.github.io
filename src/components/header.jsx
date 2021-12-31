import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import logo from "../assets/ar-logo.svg";

export default function Header() {
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
      <div className="inline-block mb-4 flex">
        <div>
          <Link to="/" className="text-3xl font-bold inline-block">
            <div className="flex items-center mb-3">
              Aaron Raff
              <img src={logo} alt="Logo" className="inline-block h-10 ml-4" />
            </div>
          </Link>
          <h3 className="text-1xl font-light">
            Software Engineer based in Raleigh, NC. Interested in
            distributed systems.
          </h3>
        </div>
        <div className="text-right pl-40 hidden sm:inline-block">
          <Img
            className="rounded-full h-20 w-20"
            fixed={data.file.childImageSharp.fixed}
            alt="Aaron"
          />
        </div>
      </div>
    </div>
  );
}
