import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, filterByType, filterCreated, getTypes, orderByName, orderByScore } from '../../actions';
import { Link } from 'react-router-dom';
import Card from '../cards/Cards';
import Paginate from '../paginate/Paginate';
import SearchBar from '../searchbar/Searchbar';
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

    function handleFilterType(e){
        dispatch(filterByType(e.target.value))
    }

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordered ${e.target.value}`)    
    }

    function handleSortScore(e){
        e.preventDefault();
        dispatch(orderByScore(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordered ${e.target.value}`)    
    }

    useEffect(() => {
        dispatch(getTypes());
    }, []);

    return(
        <div >
            
            <h1 onClick={e=> {handleClick(e)}} className={`${styles.title}`}>LoveRecipe</h1>
            <div className={styles.conteiner} >
            <SearchBar/>
            <button ><Link to= '/new'>New Recipe</Link></button>
            <button onClick={e=> {handleClick(e)}}>Reload Foods</button>
                <select onChange= {e => handleSort(e)} >
                    <option value= 'asd'>ASCENDING</option>
                    <option value= 'des'>DESCENDING</option>
                </select>
                <select onChange= {e => handleSortScore(e)}>
                    <option value= 'asd'>BEST</option>
                    <option value= 'des'>WORST</option>
                </select>
                <select onChange={(e)=>handleFilterType(e)}>
                     <option name='type' key={'a'}>TypeDiets</option>
                     {types.map((d,i)=>(
                         <option name='types'key={i} value={d.name}>{d.name}</option>
                     ))}
                 </select>
                <select onChange={(e)=>handleFilterCreated(e)}>
                    <option value= 'recipes'>Alls</option>
                    <option value= 'created'>news</option>
                    <option value= 'api'>api</option>
                </select>
            </div>
                   <Paginate
                   recipesPerPage= {recipesPerPage}
                   recipes={recipes.length}
                   paginate= {paginate}
                   />  
 
               <div className={`${styles.cards}`} >
 
                { !loading ? currentRecipe.map(recipe=>{
                    // console.log('onerecipe', recipe);
                    return (
                        <div key={recipe.id}>
                           <Link to={`/${recipe.id}`}>
                           <Card title={recipe.title} image={recipe.image} Diets={recipe.Diets} id={recipe.id}
                           />
                           </Link>
                       </div> 
                        );
                     }):<p>Loading...</p>
                 }
                 </div>
        </div>
        
        )

















}