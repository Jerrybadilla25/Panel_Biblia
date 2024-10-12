
import React from "react";



export default function SelectForm(props) {
  



  return (
    <div>
      <div className="select-form-p mt-3">
        <h2>Cargar datos en la api-Biblia</h2>
        <p>
          En esta seccion seleccionamos que dato queremos cargar, ya se <strong>Book</strong>  para cargar nombre de libro, <strong>Charter</strong>  para cargar libro mas capitulo y <strong>Verse</strong>  para cargar versiculo.
        </p>
      </div>
      
        <div className="my-3 mx-5 d-flex justify-content-around"> 
        <button className="btn-select-form" onClick={props.versionBiblia}>
            Version
          </button>
          <button className="btn-select-form" onClick={props.libro}>
            Book
          </button>
          <button className="btn-select-form" onClick={props.capitulo}>
            Charter
          </button>
         
          <button className="btn-select-form" onClick={props.Bibliaapp}>
            Biblia
          </button>
          <button className="btn-select-form" onClick={props.EditCharte}>
            Edit Charter
          </button>
          <button className="btn-select-form" onClick={props.VerseDia} >
            Versiculo dia
          </button>
          <button className="btn-select-logout" onClick={props.LoginOut}>
            Logout
          </button>
        </div>
      
    </div>
  );
}
