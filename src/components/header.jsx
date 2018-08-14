import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';


export default function Header({ siteTitle }) {
  return (
    <div>
      <div className="d-flex flex-md-row flex-column underline justify-content-between pt-2 nav">
        <div className="h3"><Link to="/" className="text-dark">{siteTitle}</Link></div>
        <div><Link to="/blog/" className="text-secondary">Blog</Link></div>
        <div><Link to="/photography/" className="text-secondary">Photography</Link></div>
        <div><Link to="/tasks/" className="text-secondary">Presently</Link></div>
        <div><Link to="/epics/" className="text-secondary">Epics</Link></div>
        <div><Link to="/components/" className="text-secondary">Skills</Link></div>
        <div><Link to="/taskstats/" className="text-secondary">Stats</Link></div>
        <div><Link to="/reading/" className="text-secondary">Reading</Link></div>
      </div>
      <hr className="mb-2 mt-2" />
    </div>
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
};
