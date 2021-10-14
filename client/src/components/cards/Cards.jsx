import React from "react";
import style from './Cards.module.css'

export default function Card({title, image, Diets, score}) {
    return (
        <div className={style.card}>
            
            <h3 className={style.title}>{title}</h3>
            <img src={image} className={style.image} alt="img not found" width="150px" height="150px" />
            <h3 className={style.words}>HEALTH:{score} </h3>
                        
            <h4 className={style.words}>Type Diet
            {Diets?.map(t=> <li key={t.name} className={style.diets}>{t.name}</li>)}

            </h4>
           
        </div>
    )
}