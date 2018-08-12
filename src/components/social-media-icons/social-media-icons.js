import React from 'react'

function importAll(r) {
  return r.keys().map(r);
}
const img_urls = require.context('./imgs/', false, /\.(png|jpe?g|svg)$/);
const images = importAll(img_urls);

const SocialMediaIcons = () => (
  <div className="gallery">
    {images.map((img, i) => {
      if (i == 0) {
        return (
          <a key={i} href='https://facebook.com/matthewsommer' target="_blank"><img src={img} alt="facebook icon" style={{ width: '2em' }} className='m-2' /></a>
        )
      } else if (i == 1) {
        return (
          <a key={i} href='https://github.com/matthewsommer' target="_blank"><img src={img} alt="github icon" style={{ width: '2em' }} className='m-2' /></a>
        )
      } else if (i == 2) {
        return (
          <a key={i} href='https://www.instagram.com/matthew.sommer/' target="_blank"><img src={img} alt="instagram icon" style={{ width: '2em' }} className='m-2' /></a>
        )
      } else if (i == 3) {
        return (
          <a key={i} href='https://www.linkedin.com/in/matthewsommer/' target="_blank"><img src={img} alt="linkedin icon" style={{ width: '2em' }} className='m-2' /></a>
        )
      } else if (i == 4) {
        return (
          <a key={i} href='https://twitter.com/yerself' target="_blank"><img src={img} alt="twitter icon" style={{ width: '2em' }} className='m-2' /></a>
        )
      } else if (i == 5) {
        return (
          <a key={i} href='/'><img src={img} alt="website icon" style={{ width: '2em' }} className='m-2' /></a>
        )
      }
    })}
  </div>
)

export default SocialMediaIcons
