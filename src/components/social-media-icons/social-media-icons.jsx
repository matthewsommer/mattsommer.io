import React from 'react';

function importAll(r) {
  return r.keys().map(r);
}
const imgUrls = require.context('./imgs/', false, /\.(png|jpe?g|svg)$/);
const images = importAll(imgUrls);

const SocialMediaIcons = () => (
  <div className="gallery">
    {images.map((img, i) => {
      if (i === 0) {
        return (
          <a key={0} href="https://facebook.com/matthewsommer" target="_blank" rel="noopener noreferrer"><img src={img} alt="facebook icon" style={{ width: '2em' }} className="m-2" /></a>
        );
      }
      if (i === 1) {
        return (
          <a key={1} href="https://github.com/matthewsommer" target="_blank" rel="noopener noreferrer"><img src={img} alt="github icon" style={{ width: '2em' }} className="m-2" /></a>
        );
      }
      if (i === 2) {
        return (
          <a key={2} href="https://www.instagram.com/matthew.sommer/" target="_blank" rel="noopener noreferrer"><img src={img} alt="instagram icon" style={{ width: '2em' }} className="m-2" /></a>
        );
      }
      if (i === 3) {
        return (
          <a key={3} href="https://www.linkedin.com/in/matthewsommer/" target="_blank" rel="noopener noreferrer"><img src={img} alt="linkedin icon" style={{ width: '2em' }} className="m-2" /></a>
        );
      }
      if (i === 4) {
        return (
          <a key={4} href="https://twitter.com/yerself" target="_blank" rel="noopener noreferrer"><img src={img} alt="twitter icon" style={{ width: '2em' }} className="m-2" /></a>
        );
      }
      if (i === 5) {
        return (
          <a key={5} href="/"><img src={img} alt="website icon" style={{ width: '2em' }} className="m-2" /></a>
        );
      }
      return (null);
    })}
  </div>
);

export default SocialMediaIcons;
