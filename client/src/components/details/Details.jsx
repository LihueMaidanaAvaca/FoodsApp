import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions";
import { useEffect, useState } from "react";
import style from "./Details.module.css"

export default function Detail(props){
    console.log(props)
    const dispatch = useDispatch()
    const [stats, setStats] = useState([]);

    const myRecipe = useSelector ((state)=> state.detail)

    useEffect(()=> {
        dispatch(getDetail(props.match.params.id));
    },[dispatch])
    
    
    
    useEffect(() => {
        setStats(myRecipe);
    }, [myRecipe])
    
    return (
        <div className={style.back} >          
         <div>
            <Link to= '/home'>
                <button >Home</button>
            </Link>
            {
                myRecipe.length>0?
                <div className={style.megacard}>
                    <h1 className={style.title}>{myRecipe[0].title} </h1>
                    <img src={myRecipe[0].image} className={style.image} width="400px" height="400px" />
                    <h2 className={style.word}>HealthScore: {myRecipe[0].healthScore} </h2>
                    <h2 className={style.word}>Score: {myRecipe[0].score} </h2>
                    <h2 className={style.word}>Types: {myRecipe[0].Types.map(el=> el.name)} </h2>
                    <h3 className={style.word}>Steps: {myRecipe[0].steps} </h3>
                    <h2 className={style.word}>Summary: </h2><div className={style.summary} dangerouslySetInnerHTML={{ __html: myRecipe[0].summary }}></div>
                    </div> :<p>Loading...</p>
            }
            </div>   
        </div>
    )
}