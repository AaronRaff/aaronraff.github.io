import React from "react";
import { graphql, Link } from "gatsby";
import PropTypes from "prop-types";
import Img from "gatsby-image";
import { DiscussionEmbed } from "disqus-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/layout";
import SEO from "../components/seo";

export default function Template({ data }) {
  const { markdownRemark, site } = data;
  const { siteMetadata } = site;
  const { frontmatter, html } = markdownRemark;
  const pageLink = encodeURIComponent(`${siteMetadata.url}${frontmatter.slug}`);
  const tweetText = encodeURIComponent(
    `${frontmatter.title} by ${siteMetadata.twitterUsername}`
  );
  const links = [
    `https://twitter.com/intent/tweet?url=${pageLink}&text=${tweetText}`,
    `http://www.facebook.com/share.php?u=${pageLink}`,
  ];
  const icons = [
    <FontAwesomeIcon icon={faTwitter} />,
    <FontAwesomeIcon icon={faFacebook} />,
  ];

  const shareLinks = icons.map((icon, index) => {
    return (
      <a
        key={links[index]}
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
      <SEO
        title={frontmatter.title}
        description={frontmatter.subtitle}
        image={frontmatter.featuredImage.childImageSharp.fluid.src}
        article
        slug={frontmatter.slug}
      />
      <Link to="/" className="text-gray-500">
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        See other posts
      </Link>
      <h1 className="text-3xl font-bold pb-3 mt-8">{frontmatter.title}</h1>
      <p className="font-light mb-4 text-gray-500">{frontmatter.date}</p>
      <p className="mb-4 text-lg italic">{frontmatter.subtitle}</p>
      <Img
        className="w-full block featured-image"
        imgStyle={{"objectFit": "contain"}}
        alt={frontmatter.altText}
        fluid={frontmatter.featuredImage.childImageSharp.fluid}
      />
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
        altText
        featuredImage {
          childImageSharp {
            fluid(maxHeight: 450) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        url
        twitterUsername
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
        altText: PropTypes.string.isRequired,
        featuredImage: PropTypes.shape({
          childImageSharp: PropTypes.shape({
            fluid: PropTypes.instanceOf(Img.fluidObject).isRequired,
          }).isRequired,
        }).isRequired,
      }).isRequired,
      html: PropTypes.element.isRequired,
    }).isRequired,
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        url: PropTypes.string.isRequired,
        twitterUsername: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
};
