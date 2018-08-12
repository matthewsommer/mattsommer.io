import React from 'react'

function importAll(r) {
  return r.keys().map(r);
}

const photography = importAll(require.context('./photography/', false, /\.(png|jpe?g|svg)$/));

const PhotographyPage = () => (
  <div className="gallery">
      {photography.map((img, i) => {
        return (
          <div key={i} className='p-5 m-5 text-center'><img src={img} alt="photography" style={{ width: '70%' }} /></div>
        )
      })}
  </div>
)

export default PhotographyPage
