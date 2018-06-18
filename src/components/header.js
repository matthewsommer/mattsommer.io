import React from 'react'
import Link from 'gatsby-link'

const Header = ({ siteTitle }) => (
  <div>
    <h4 className="pt-2"><Link to="/">{siteTitle}</Link></h4>
    <div className="d-flex flex-row pb-2 underline">
      <div className="pr-2"><Link to="/blog/">*Blog</Link></div>
      <div className="pr-2"><Link to="/photography/">*Photography</Link></div>
      <div className="pr-2"><Link to="/tasks/">*What I'm up to</Link></div>
    </div>
    <div className="d-flex flex-row pb-2 underline">
      <div className="pr-2"><Link to="/epics/">*My Goals</Link></div>
      <div className="pr-2"><Link to="/stories/">*My Stories</Link></div>
    </div>
    <div className="d-flex flex-row pb-2 underline">
      <div className="pr-2"><Link to="/reading/">*Reading List</Link></div>
      <div className="pr-2"><Link to="/employment/">*Work History</Link></div>
      <div className="pr-2"><Link to="/education/">*Formal Education</Link></div>
    </div>
    <div className="d-flex flex-row pb-2 underline">
      <div className="pr-2"><Link to="/taskstats/">*Task Stats</Link></div>
      <div className="pr-2"><Link to="/components/">*Topics</Link></div>
    </div>
  </div>
)

export default Header
