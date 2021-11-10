import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import {postNewRecipe, getTypes} from '../../actions';
import { useDispatch, useSelector } from "react-redux";
import styles from "./NewRecipe.module.css"


function validate(input){
    let errors={};
    if(!input.title ){errors.title = 'Name is require'}
    if(!input.summary){errors.summary = 'Write 20 to 100 characters'}
    if(!input.score || input.score < 0 || input.score > 100){errors.score = 'Put 1 to 100'}
    if(!input.healthScore || input.healthScore < 0 || input.healthScore > 100){errors.healthScore = 'Put 1 to 100'}
    if(!input.steps){errors.steps = 'Write 20 to 100 characters'}
    if(!input.image ){errors.image = 'Use an url'}
    if(!input.types.length ){errors.types = 'at least touch one'}
    return errors;
}

export default function NewRecipe(){
    const dispatch = useDispatch()
    const history = useHistory()
    const types = useSelector((state) => state.types)
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        title: "",
        summary: "",
        score: 0,
        healthScore: 0,
        image:"",
        steps: "",
        types: []
    })
    
    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }
    
    function handleCheck(e){
        if(e.target.checked){
            setInput({
                ...input,
                types: e.target.value
            })
        }
        setErrors(validate({
            ...input,
            types: e.target.value
        }))
    }

    function handleSelect(e){
        setInput({
            ...input,
            types: [...input.types,e.target.value]
        })
        setErrors(validate({
            ...input,
            types: [...input.types,e.target.value]
        }))
    }

    function handleSubmit(e){
        e.preventDefault();
        if(Object.values(errors).length > 0) alert ("Please finish the form")
        else{

            postNewRecipe(input)
            alert("BON APETITE")
            setInput({
                title: "",
                summary: "",
                score: 1,
                healthScore: 1,
                image:"",
                steps: "",
                types: []
            })
            history.push('/home')
        }
    }

    // function handleDelete(el){
    //     setInput({
    //         ...input,
    //         types: input.types.filter(tem=> tem !== el)
    //     })
    // }

    useEffect(() => {
        dispatch(getTypes());
    }, []);

    return(
        <div className={styles.every}>
            <Link to= '/home' ><button>Home</button></Link>
            <h1 className={styles.title}>NewRecipe!</h1>
            <form className={styles.form} onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label className={styles.label}>Title:</label>
                    <input type= "text" value= {input.title} name= "title"onChange={(e)=>handleChange(e)}
                    />
                    {errors.title && (
                    <p className={styles.error}>{errors.title}</p>
                    )}
                </div>
                <div>
                    <label className={styles.label}>Summary:</label>
                    <textarea className={styles.largetext} type= "text"  value= {input.summary} name= "summary" onChange={(e)=>handleChange(e)}/>
                    {errors.summary && (
                    <p className={styles.error}>{errors.summary}</p>
                    )}
                </div>
                <div>
                    <label className={styles.label}>Score:</label>
                    <input type= "number" min="1" max="100" size={3} value= {(input.score)} name= "score" onChange={(e)=>handleChange(e)}/>
                    {errors.score && (
                    <p className={styles.error}>{errors.score}</p>
                    )}
                </div>
                <div>
                    <label className={styles.label}>healthScore:</label>
                    <input type= "number"  min="1" max="100" size={3}  value= {input.healthScore} name= "healthScore" onChange={(e)=>handleChange(e)}/>
                    {errors.healthScore && (
                    <p className={styles.error}>{errors.healthScore}</p>
                    )}
                </div>
                <div>
                    <label className={styles.label}>Steps:</label>
                    <textarea  type= "text" value= {input.steps} name= "steps"  size={32} onChange={(e)=>handleChange(e)}/>
                    {errors.steps && (
                    <p className={styles.error}>{errors.steps}</p>
                    )}
                </div>
                <div>
                    <label className={styles.label}>Image:</label>
                    <input type= "url" value= {input.image} name= "image" onChange={(e)=>handleChange(e)}/>
                    {errors.image && (
                    <p className={styles.error}>{errors.image}</p>
                    )}
                </div>
                <div className={styles.checks}>
                    <label className={styles.label}>Diet:</label>
                    <label><input type= "checkbox" value= "vegan" name= "vegan" onChange={(e)=>handleSelect(e)}/>Vegan</label>
                    <label><input type= "checkbox" value= "gluten free" name= "gluten free" onChange={(e)=>handleSelect(e)}/>Gluten Free</label>
                    <label><input type= "checkbox" value= "lacto ovo vegetarian" name= "lacto ovo vegetarian" onChange={(e)=>handleSelect(e)}/>Lacto Ovo Vegetarian</label>
                    <label><input type= "checkbox" value= "dairy free" name= "dairy free" onChange={(e)=>handleSelect(e)}/>Dairy Free</label>
                    <label><input type= "checkbox" value= "paleolithic" name= "paleolithic" onChange={(e)=>handleSelect(e)}/>Paleolithic</label>
                    <label><input type= "checkbox" value= "pescatarian" name= "pescatarian" onChange={(e)=>handleSelect(e)}/>Pescatarian</label>
                    <label><input type= "checkbox" value= "fodmap friendly" name= "fodmap friendly" onChange={(e)=>handleSelect(e)}/>Fodmap Friendly</label>
                    <label><input type= "checkbox" value= "whole 30" name= "whole 30" onChange={(e)=>handleSelect(e)}/>Whole 30</label>
                    <label><input type= "checkbox" value= "primal" name= "primal" onChange={(e)=>handleSelect(e)}/>Primal</label>
                    <label><input type= "checkbox" value= "ketogenic" name= "ketogenic" onChange={(e)=>handleSelect(e)}/>Ketogenic</label>
                    
                    {errors.types && (
                    <p className={styles.error}>{errors.types}</p>
                    )}
                </div>
                
            <button  className={styles.label}type='submit' >Save!</button>
            
                
            </form>
           
        </div>
    )




}

