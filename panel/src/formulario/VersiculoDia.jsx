import React, {useState} from 'react';

const Versiculodia = (props) => {
    const [verse, setVerse]=useState(null)

    const verseDia = async ()=>{
        const data = await fetch(`${props.http}/books/verseDia`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "x-access-token": props.user.token,
              },
        });
        const res = await data.json()
        setVerse(res)
    }


    return (
        <div>
            <div className="my-3 pb-toolbar d-flex justify-content-center">
               <button 
               className="btn-select-verse"
               onClick={verseDia}
               >Cargar versiculo del dia aleatoriamente</button>
           </div>
           <div className="my-4">
               {
                   verse && (
                       <div className="pb-verse-show">
                         <p>{verse.numero}  {verse.versiculo}</p>
                         <h6>{verse.originCharter}</h6>
                         <h5>{verse.testament}</h5>
                      </div>
                   )
               }
               
           </div>
        </div>
       
        
    );
}

export default Versiculodia;
