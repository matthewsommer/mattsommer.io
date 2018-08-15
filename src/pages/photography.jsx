import React from 'react';

function importAll(r) {
  return r.keys().map(r);
}

const photography = importAll(require.context('./photography/', false, /\.(png|jpe?g|svg)$/));

export default function PhotographyPage() {
  return (
    <div className="gallery">
      {photography.map((img, i) => (
        /* eslint-disable */
        <div key={i} className="pt-5 pb-5 mt-5 mb-5 text-center"><img src={img} alt="photography" style={{ width: '60%', minWidth: '15em' }} /></div>
        /* eslint-enable */
      ))}
    </div>
  );
}
