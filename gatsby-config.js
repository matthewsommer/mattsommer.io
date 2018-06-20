module.exports = {
  siteMetadata: {
    title: 'MattSommer.io',
  },
  plugins: [
    'gatsby-plugin-react-helmet', 
    {
      resolve: "gatsby-source-jira",
      options: {
        host: "jira.mattsommer.io",
        epic_field_id: "customfield_10009",
      },
    }]
}
