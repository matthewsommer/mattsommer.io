import React from 'react'
import Link from 'gatsby-link'

const Header = ({ siteTitle }) => (
  <div>
    <p><Link to="/">{siteTitle}</Link></p>
  </div>
)

export default Header
