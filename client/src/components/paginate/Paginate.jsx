import React from "react";
import styles from './Paginate.module.css'



export default function Paginate ({recipesPerPage, recipes, paginate}){
    const pageNumber= []

    for (let i = 0; i <= Math.floor(recipes/recipesPerPage); i++) {
         pageNumber.push(i+1)
    }
    return(
        <nav>
            <ul className={`${styles.paginate}`}>
                {pageNumber && pageNumber.map(num =>(
                    <div className='paginate' key={num}>
                    <a onClick={()=> paginate(num)}>{num}</a>
                    </div>                
                ))}
            </ul>
        </nav>
    )

}