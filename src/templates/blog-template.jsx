import React from "react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import Img from "gatsby-image";
import { DiscussionEmbed } from "disqus-react";
import Layout from "../components/layout";

export default function Template({ data }) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;

  return (
    <Layout>
      <h1 className="text-3xl font-bold pb-3">{frontmatter.title}</h1>
      <p className="font-light pb-2 text-gray-500">{frontmatter.date}</p>
      <p className="mb-8">{frontmatter.subtitle}</p>
      <Img
        className="h-64 w-full block"
        alt={frontmatter.altText}
        fluid={frontmatter.featuredImage.childImageSharp.fluid}
      />
      <p className="font-light text-center text-sm text-gray-500 mt-2">
        {frontmatter.photoCreds}
      </p>
      <div className="post mt-4 mb-16">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
      <DiscussionEmbed
        shortname={process.env.GATSBY_DISQUS_NAME}
        config={{ identifier: frontmatter.slug, title: frontmatter.title }}
      />
    </Layout>
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        subtitle
        photoCreds
        altText
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

Template.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        photoCreds: PropTypes.string.isRequired,
        altText: PropTypes.string.isRequired,
        featuredImage: PropTypes.shape({
          childImageSharp: PropTypes.shape({
            fluid: PropTypes.instanceOf(Img.fluidObject).isRequired,
          }).isRequired,
        }).isRequired,
      }).isRequired,
      html: PropTypes.element.isRequired,
    }).isRequired,
  }).isRequired,
};
