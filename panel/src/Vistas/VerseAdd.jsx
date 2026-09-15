import React from 'react'

export default function VerseAdd(props) {
    return (
        <div className="row mt-4">
        <div className="pb-card">
          <h2 className="pb-section-title">Capitulos creados</h2>
            <h4>
                {props.versiculos.charter}
            </h4>
            {props.versiculos.versiculos.map(idx=>(
                <p key={idx._id}>
                    {idx.numero} {idx.versiculo}
                </p>
            ))}
        </div>
        <div></div>
      </div>
    )
}
