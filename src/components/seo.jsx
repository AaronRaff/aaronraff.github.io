import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useLocation } from "@reach/router";
import { useStaticQuery, graphql } from "gatsby";
import pngFavicon from "../assets/favicon.png";
import svgFavicon from "../assets/favicon.svg";

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        url
        defaultDescription: description
        twitterUsername
      }
    }
  }
`;

export default function SEO({ title, description, image, article }) {
  const location = useLocation();
  const { site } = useStaticQuery(query);
  const {
    defaultTitle,
    url,
    defaultDescription,
    twitterUsername,
  } = site.siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${url}${image}`,
    url: encodeURIComponent(location.href),
  };

  return (
    <Helmet title={seo.title} htmlAttributes={{ lang: "en" }}>
      <link rel="canonical" href={seo.url} />
      <link rel="icon" href={svgFavicon} type="image/svg+xml" />
      <link rel="icon" href={pngFavicon} type="image/png" />
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />

      {article && <meta property="og:type" content="article" />}

      <meta name="twitter-card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterUsername} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
    </Helmet>
  );
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  article: PropTypes.bool,
};

SEO.defaultProps = {
  title: null,
  description: null,
  article: false,
};
