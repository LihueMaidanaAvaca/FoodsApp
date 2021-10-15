import React from "react";
import {useState} from 'react'
import { useDispatch } from "react-redux";
import { getNameRecipes } from "../../actions";
import styles from "./Searchbar.module.css"

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
        <div className={styles.search} >
            <input
            type= 'text'
            placeholder = "Search..."
            onChange= {(e) => handleInputChange(e)}
            />
            <button  type='submit' onClick={(e)=>handleSubmit(e)}>Search</button>
        </div>
    )
}