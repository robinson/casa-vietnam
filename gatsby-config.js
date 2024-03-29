// Initialize dotenv
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`, // or '.env'
});

const path = require(`path`)

module.exports = {
  siteMetadata: {
    title: `casavietnam`,
    description: `Il ristorante tradizionale vietnamita dove si possono gustare autentici sapori dal VietnamSmall street food restaurant that specialize in preparing food from a wok according to slow food philosophy and using only season ingredients  `,
    author: `@gaperi`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,

    },
    // {
    //   resolve: `gatsby-source-googlemaps-static`,
    //   options: {
    //     key: process.env.GOOGLE_MAPS_API,
    //     center: "Chicago, IL",
    //   },
    // },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `casa vietnam`,
        short_name: `casa vietnam`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/mushroms.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-background-image-es5`,
    {
      resolve: `gatsby-source-datocms`,
      options: {
        // You can find your read-only API token under the Settings > API tokens
        // section of your administrative area:
        apiToken: process.env.DATO_API_TOKEN,
        // If you are working on development/staging environment, you might want to
        // preview the latest version of records instead of the published one:
        previewMode: false,
        // Disable automatic reloading of content when some change occurs on DatoCMS:
        disableLiveReload: false,

      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
    },
    {
      resolve: `gatsby-plugin-polished`
    },
    `gatsby-plugin-anchor-links`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
