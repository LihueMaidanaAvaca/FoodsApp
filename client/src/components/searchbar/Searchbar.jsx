import React from "react";
import {useState} from 'react'
import { useDispatch } from "react-redux";
import { getNameRecipes } from "../../actions";


export default function SearchBar(){
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")

    function handleInputChange(e){
        e.preventDefault()
        setTitle(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameRecipes(title))
    }

    return (
        <div>
            <input
            type= 'text'
            placeholder = "Search..."
            onChange= {(e) => handleInputChange(e)}
            />
            <button type='submit' onClick={(e)=>handleSubmit(e)}>Search</button>
        </div>
    )
}