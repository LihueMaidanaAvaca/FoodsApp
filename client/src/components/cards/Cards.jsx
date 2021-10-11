import React from "react";
import style from './Cards.module.css'

export default function Card({title, image, Diets, score}) {
    return (
        <div className={style.card}>
            
            <h3 className={style.title}>{title}</h3>
            <img src={image} className={style.image} alt="img not found" width="150px" height="150px" />
            <h3>HEALTH:{score} </h3>
                        
        
            {Diets?.map(t=> <div key={t.name} className={style.diets}>{t.name}</div>)}
           
        </div>
    )
}