import React from 'react'

export default function Charter(props) {
    return (
        <div className="mt-4 mb-5 box-per">
        <div className=''>
          <h3 className="pb-section-title">Capitulos creados</h3>
          <div className="pb-chip-grid">
            {props.charter.map((itm) => (
              <div key={itm._id}>
                <button className="btn btn-outline-primary">
                {itm.charter} / {itm.verses.length} ver.
                </button>
              </div>
          ))}
          </div>
          
        </div>
       
      </div>
    )
}
