import React from "react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import Img from "gatsby-image";
import { DiscussionEmbed } from "disqus-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";
import Layout from "../components/layout";

export default function Template({ data }) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  const pageLink = encodeURIComponent(
    `https://aaronraff.dev${frontmatter.slug}`
  );
  const links = [
    `https://twitter.com/intent/tweet?url=${pageLink}`,
    `http://www.facebook.com/share.php?u=${pageLink}`,
  ];
  const icons = [
    <FontAwesomeIcon icon={faTwitter} />,
    <FontAwesomeIcon icon={faFacebook} />,
  ];

  const shareLinks = icons.map((icon, index) => {
    return (
      <a
        href={links[index]}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mx-4 text-lg"
      >
        {icon}
      </a>
    );
  });

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
      <div className="post mt-4">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
      <div className="text-center my-16 font-light">
        <p>
          If you liked this post, it would mean a lot to me if you shared it
          with your friends!
        </p>
        <div className="mt-4 text-gray-500">{shareLinks}</div>
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
