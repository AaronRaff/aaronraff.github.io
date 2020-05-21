module.exports = {
  siteMetadata: {
    title: "Aaron Raff",
    url: "https://www.aaronraff.dev",
    description: "Aaron Raff's Blog",
    twitterUsername: "@aaronraff_",
  },
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/src/posts`,
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-plugin-prefetch-google-fonts",
      options: {
        fonts: [
          {
            family: "Montserrat",
            variants: ["100", "300", "500", "700", "900"],
          },
        ],
      },
    },
  ],
};
