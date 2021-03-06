import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Header from '../components/header';
import Footer from '../components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import favicon from '../static/favicon.ico';

export default function Layout({ children, data }) {
  return (
    <div>
      <Helmet
        title={data.site.siteMetadata.title}
        meta={[
          { name: 'description', content: 'Matt Sommer\'s personal website' },
          { name: 'keywords', content: 'blog' },
        ]}
        link={[
          { rel: 'shortcut icon', type: 'image/png', href: `${favicon}` },
        ]}
      />

      <div
        style={{
          margin: '0 auto',
          maxWidth: 960,
          padding: '0px 1.0875rem 1.45rem',
          paddingTop: 0,
        }}
      >
        <Header siteTitle={data.site.siteMetadata.title} />
        {children()}
        <Footer />
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
