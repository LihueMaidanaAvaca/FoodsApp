import styles from './Landing.module.css'
import React from 'react'
// import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export function Landing(){
    // const recipes= useSelector((state)=>state.recipes)
    return(
        <div className={styles.landing}>
            <div >
            <label className={styles.title}> LoveRecipes </label>
            <div>
            <Link  className={styles.welcome} to={'/home'} >Welcome</Link>

            </div>
            </div>
        </div>
    )
}

// return(
//     <div className={styles.div_render}>
//         <div className={styles.items}>
//         <label className={styles.title}> LoveRecipes </label>
//         {console.log()}
//         <Link className={styles.home} to={'/home'} >Welcome</Link>
//         </div>
//     </div>
// )