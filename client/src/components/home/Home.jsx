import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes } from '../../actions';
import { Link } from 'react-router-dom';
import Card from '../cards/Cards';
import Paginate from '../paginate/Paginate';
import styles from './Home.module.css'

export function Home(){
    const dispatch= useDispatch()
    const recipes = useSelector((state) => state.recipes)
    const [orden, setOrden] = useState('')
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [recipesPerPage, setRecipesPerPage] = useState(9)
    const indexOfLastRecipe = currentPage * recipesPerPage
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
    const currentRecipe = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe)
    const types = useSelector((state) => state.types)
    
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getRecipes());
        setLoading(false)
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipes());
    }

    return(
        <div >
            <h1>LoveRecipe</h1>
            <button ><Link to= '/new'>new recipe</Link></button>
            <button onClick={e=> {handleClick(e)}}>Reload foods</button>
            <div>
                <select >
                    <option value= 'asd'>ASCENDING</option>
                    <option value= 'des'>DESCENDING</option>
                </select>
                <select >
                    <option value= 'des'>LIGHTER</option>
                    <option value= 'asd'>HEAVIER</option>
                </select>
                {/* <select >
                     <option name='type' key={'a'}>tipos de dietas</option>
                     {temperaments.map((tem,i)=>(
                         <option name='types'key={i} value={tem.name}>{tem.name}</option>
                     ))}
                 </select> */}
                <select >
                    <option value= 'recipes'>todas</option>
                    <option value= 'created'>news</option>
                    <option value= 'api'>api</option>
                </select>
                {/* <SearchBar/> */}
                <Paginate
                recipesPerPage= {recipesPerPage}
                recipes={recipes.length}
                paginate= {paginate}
                />  
 
               <div className={`${styles.cards}`} >
 
                { !loading ? currentRecipe.map(recipe=>{
                    console.log('onerecipe', recipe);
                    return (
                        <div key={recipe.id}>
                           <Link to={`/${recipe.id}`}>
                           <Card title={recipe.title} image={recipe.image} temp={recipe.Temperaments} id={recipe.id}
                           />
                           </Link>
                       </div> 
                        );
                     }):<p>Loading...</p>
                 }
                 </div>
            </div>
        </div>
        
        )

















}