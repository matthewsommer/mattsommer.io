module.exports = {
  siteMetadata: {
    title: 'MattSommer.io',
  },
  plugins: [
    'gatsby-plugin-react-helmet', {
      resolve: "gatsby-source-jira",
      options: {
        host: "timetopretend.atlassian.net",
        epic_field_id: "customfield_10009",
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-91408509-1",
        // Puts tracking script in the head instead of the body
        
        head: false,
        // Setting this parameter is optional
        anonymize: false,
        // Setting this parameter is also optional
        respectDNT: false,
        // Avoids sending pageview hits from custom paths
        exclude: ["/preview/**", "/do-not-track/me/too/"],
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Josefin Sans:300,400', 'sans-serif']
        }
      }
    },
    'gatsby-plugin-eslint'
  ]
}
