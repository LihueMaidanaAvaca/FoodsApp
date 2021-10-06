import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions";
import { useEffect, useState } from "react";


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
        <div>          
            
            <Link to= '/home'>
                <button>Home</button>
            </Link>
            {
                myRecipe.length>0?
                <div>
                    <h1>{myRecipe[0].title} </h1>
                    <img src={myRecipe[0].image} width="400px" height="400px" />
                    {/* <h2>weightmin:{myRecipe[0].weightmin} </h2> */}
                    {/* <h2>weightmax:{myRecipe[0].weightmax} </h2> */}
                    <label>Types: {myRecipe[0].Diets.map(el=> el.name)} </label>
                    </div> :<p>Loading...</p>
            }
        </div>
    )
}