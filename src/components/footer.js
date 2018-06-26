import React from 'react'
import Link from 'gatsby-link'

const Footer = () => (
    <div className="footer">
        <hr/>
        <ul>
            <li>PGP Fingerprint: CDE4 C4FB 0B11 3A1C 5298 83D3 B2CE 5771 60C7 7DA0</li>
            <li>© 2018 Matt Sommer - All Rights Reserved</li>
            <li><Link to="/privacy/">Privacy</Link> - <Link to="/tech-stack/">Tech Stack</Link></li>
        </ul>
    </div>
)

export default Footer