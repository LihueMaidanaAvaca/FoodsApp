import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import {postNewRecipe, getTypes} from '../../actions';
import { useDispatch, useSelector } from "react-redux";


function validate(input){
    let errors={};
    if(!input.title){
        errors.title = 'Name is require';
    }
    if(!input.summary){
        errors.summary = 'Put 1 to 100';
    }
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
    
    // function handleCheck(e){
    //     if(e.target.checked){
    //         setInput({
    //             ...input,
    //             status: e.target.value
    //         })
    //     }
    // }

    function handleSelect(e){
        setInput({
            ...input,
            types: [...input.types,e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        postNewRecipe(input)
        alert("BON APETITE")
        setInput({
            title: "",
            summary: "",
            score: 0,
            healthScore: 0,
            image:"",
            steps: "",
            types: []
        })
        history.push('/home')
    }

    function handleDelete(el){
        setInput({
            ...input,
            types: input.types.filter(tem=> tem !== el)
        })
    }

    useEffect(() => {
        dispatch(getTypes());
    }, []);

    return(
        <div>
            <Link to= '/home' ><button>Home</button></Link>
            <h1>NewRecipe!</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label>Title:</label>
                    <input type= "text" value= {input.title} name= "title"onChange={(e)=>handleChange(e)}
                    />
                    {errors.title && (
                    <p className='error'>{errors.title}</p>
                    )}
                </div>
                <div>
                    <label>Summary:</label>
                    <input type= "text" value= {input.summary} name= "summary" onChange={(e)=>handleChange(e)}/>
                </div>
                <div>
                    <label>Score:</label>
                    <input type= "number"  value= {(input.score)} name= "score" onChange={(e)=>handleChange(e)}/>
                </div>
                <div>
                    <label>healthScore:</label>
                    <input type= "number" value= {input.healthScore} name= "healthScore" onChange={(e)=>handleChange(e)}/>
                </div>
                <div>
                    <label>Steps:</label>
                    <input type= "text" value= {input.steps} name= "steps" onChange={(e)=>handleChange(e)}/>
                </div>
                <div>
                    <label>Image:</label>
                    <input type= "url" value= {input.image} name= "image" onChange={(e)=>handleChange(e)}/>
                </div>
                <select onChange={(e)=>handleSelect(e)}>
                <option name='type' key={'a'}>Diets</option>
                    {types.map((type,i)=>(
                        <option name='types'key={i} value={type.name}>{type.name}</option>
                    ))}
                </select>
                <ul><li>{input.types.map(el=> el +", ")}</li></ul>
                
                <button type='submit' >Save!</button>
            </form>
            {input.types.map((el,i)=>
                <div className='divTem'key={i}>
                    <p>{el}</p>
                    {console.log('este es el imput', input)}
                    <button className="botonX" onClick={()=> handleDelete(el)}>x</button>
                    </div>
                    )}
        </div>
    )




}

