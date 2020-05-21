import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";

export default function PostList() {
  const postData = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            id
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              slug
              title
              subtitle
            }
          }
        }
      }
    }
  `);

  const posts = postData.allMarkdownRemark.edges.map((edge) => {
    const { node } = edge;
    return (
      <div className="my-16">
        <Link to={node.frontmatter.slug}>
          <h1 className="text-2xl font-bold pb-2">{node.frontmatter.title}</h1>
          <p className="font-light pb-2 text-gray-500">
            {node.frontmatter.date}
          </p>
          <p>{node.frontmatter.subtitle}</p>
        </Link>
      </div>
    );
  });

  return posts;
}
