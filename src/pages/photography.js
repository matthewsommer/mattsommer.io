import React from 'react'
import Link from 'gatsby-link'

function importAll(r) {
  return r.keys().map(r);
}

const photography = importAll(require.context('./photography/', false, /\.(png|jpe?g|svg)$/));

const PhotographyPage = () => (
  <div className="gallery">
      {photography.map((img) => {
        return (
          <div><img src={img} alt="photography"/></div>
        )
      })}
  </div>
)

export default PhotographyPage
