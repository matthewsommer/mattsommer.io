import React from 'react'
import Link from 'gatsby-link'
import SocialMediaIcons from '../components/social-media-icons/social-media-icons'

const Footer = () => (
    <div className="footer h6 text-secondary">
        <hr className="mt-3"/>
        <ul>
            <li className='mb-1'><small>PGP Fingerprint: CDE4 C4FB 0B11 3A1C 5298 83D3 B2CE 5771 60C7 7DA0</small></li>
            <li>© 2018 Matt Sommer - All Rights Reserved</li>
            <li><Link to="/privacy/" className="text-secondary">Privacy</Link> - <Link to="/tech-stack/" className="text-secondary">Tech Stack</Link></li>
            <li><SocialMediaIcons/></li>
        </ul>
    </div>
)

export default Footer