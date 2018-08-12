import React from 'react'

function importAll(r) {
  return r.keys().map(r);
}

const photography = importAll(require.context('./photography/', false, /\.(png|jpe?g|svg)$/));

const PhotographyPage = () => (
  <div className="gallery">
      {photography.map((img, i) => {
        return (
          <div key={i} className='pt-5 pb-5 mt-5 mb-5 text-center'><img src={img} alt="photography" style={{ width: '60%', minWidth: '15em' }} /></div>
        )
      })}
  </div>
)

export default PhotographyPage
