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
        <div className={styles.every}>
            
            <header onClick={e=> {handleClick(e)}} className={`${styles.title}`}> LoveRecipe 
            <SearchBar className={styles.search} />
            </header>
            <div className={styles.conteiner} >
            <button className={styles.opcions} ><Link to= '/new'>New Recipe</Link></button>
            <button className={styles.opcions} onClick={e=> {handleClick(e)}}>Reload Foods</button>
                <select className={styles.opcions} defaultValue='default' onChange= {e => handleSort(e)} >
                <option value='default' disabled='disabled'>ABC ORDER</option>
                    <option value= 'asd'>ASCENDING</option>
                    <option value= 'des'>DESCENDING</option>
                </select>
                <select className={styles.opcions} defaultValue='default' onChange= {e => handleSortScore(e)}>
                <option value='default' disabled='disabled'>HEALTH ORDER</option>
                    <option value= 'des'>BEST</option>
                    <option value= 'asd'>WORST</option>
                </select>
                <select className={styles.opcions} defaultValue='default' onChange={(e)=>handleFilterType(e)}>
                     <option value='default' disabled='disabled' name='type' key={'a'} >TYPESDIETS</option>
                     {types.map((d,i)=>(
                         <option name='types'key={i} value={d.name}>{d.name}</option>
                         ))}
                 </select>
                <select className={styles.opcions} onChange={(e)=>handleFilterCreated(e)}>
                    <option value= 'recipes'>ALLS</option>
                    <option value= 'created'>NEWS</option>
                    <option value= 'api'>NOTNEWS</option>
                </select>
            </div>
                   <Paginate
                   recipesPerPage= {recipesPerPage}
                   recipes={recipes.length}
                   paginate= {paginate}
                   />  
               <div className={styles.cards} >
 
                { !loading ? currentRecipe?.map(recipe=>{
                    // console.log('onerecipe', recipe);
                    return (
                        <div key={recipe.id}>
                           <Link to={`/${recipe.id}`}>
                           <Card title={recipe.title} image={recipe.image} Diets={recipe.Types} id={recipe.id}
                                 score={recipe.healthScore} steps={recipe.steps}
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