import React from 'react'
import Link from 'gatsby-link'

const Header = ({ siteTitle }) => (
  <div>
    <div className="d-flex flex-md-row flex-column underline justify-content-between pt-2 nav">
      <div className="h5"><Link to="/">{siteTitle}</Link></div>
      <div><Link to="/blog/">Blog</Link></div>
      <div><Link to="/photography/">Photography</Link></div>
      <div><Link to="/tasks/">Presently</Link></div>
      <div><Link to="/epics/">Epics</Link></div>
      <div><Link to="/reading/">Reading</Link></div>
    </div>
    <hr className="mt-sm-1"/>
  </div>
)

export default Header
