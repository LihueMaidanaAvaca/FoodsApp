import React from "react";
import style from './Cards.module.css'

export default function Card({title, image, Diets}) {
    return (
        <div >
            
            <img src={image} alt="img not found" width="150px" height="150px" />
            <h3 className={style.title}>{title}</h3>
            
        
            {Diets?.map(t=> <div key={t.name}>{t.name}</div>)}
           
        </div>
    )
}