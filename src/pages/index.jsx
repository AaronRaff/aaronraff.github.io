import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Layout from "../components/layout";
import PostList from "../components/post-list";
import SEO from "../components/seo";

export default function Home() {
  const data = useStaticQuery(graphql`
    query ProfilePictureQuery {
      file(relativePath: { eq: "profile-picture.jpg" }) {
        childImageSharp {
          fixed(width: 400) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  return (
    <Layout>
      <SEO image={data.file.childImageSharp.fixed.src} />
      <PostList />
    </Layout>
  );
}
