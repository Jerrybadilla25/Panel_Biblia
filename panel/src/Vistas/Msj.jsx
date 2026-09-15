import React from 'react'

export default function Msj(props) {
    return (
        <div className="msj-1 pb-msj">
            {
                <p>{props.msj.msj}</p>
            }
        </div>
    )
}
