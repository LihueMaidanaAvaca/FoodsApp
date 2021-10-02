import React from "react";
// import style from './Card.module.css'

export default function Card({title, image}) {
    return (
        <div >
            
            <img src={image} alt="img not found" width="150px" height="150px" />
            <h3>{title}</h3>
            {/* <label>W min:{weightmin} max:{weightmax}</label> */}
        
            {/* {temp?.map(t=> <div key={t.name}>{t.name}</div>)} */}
           
        </div>
    )
}