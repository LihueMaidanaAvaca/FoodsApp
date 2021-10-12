import axios from 'axios';
// import { bindActionCreators } from 'redux';
export const GET_RECIPES = 'GET_RECIPES'
export const GET_NAMERECIPES = 'GET_NAMERECIPES'
export const SET_NAME = 'SET_NAME'
export const GET_TYPES = 'GET_TYPES'
export const FILTER_BY_TYPE = 'FILTER_BY_TYPE'
export const FILTER_CREATED = 'FILTER_CREATED'
export const ORDER_BY_NAME = 'ORDER_BY_NAME'
export const ORDER_BY_SCORE = 'ORDER_BY_SCORE'
export const GET_DETAILS = 'GET_DETAILS'



export function getRecipes() {
    return async function(dispatch){
        try{
            
            var json = await axios("http://localhost:3001/recipes");
            console.log('action', json.data)
            return dispatch({
                type: GET_RECIPES,
                payload: json.data
            })
        } catch{console.log('error en la api')}
    }
}

export function getNameRecipes(name){
    
    return async function(dispatch){
        try{
            var json = await axios("http://localhost:3001/recipes?name="+name);
            return dispatch ({
                type : GET_NAMERECIPES,
                payload: json.data
            })
        }catch (error){
            console.log(error)
        }
    }
}

export function setFilterName(name){
    return ({
        type : SET_NAME,
        payload: name
    })

}

export function getTypes(){
    return async function (dispatch) {
        try{

            var info = await axios("http://localhost:3001/types", {
                
            });
            return dispatch({ 
                type: GET_TYPES,
                payload: info.data
            })
        }catch{console.log('error api type')}
    }
}

export async function postNewRecipe(payload){
    
    const response = await axios.post("http://localhost:3001/recipe", payload);
    return response;

}

export function filterByType(payload){
    return {
        type: FILTER_BY_TYPE,
        payload
    }
}

export function filterCreated(payload){
    return{
        type: FILTER_CREATED,
        payload
    }
}

export function orderByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload
    }
}

export function orderByScore(payload){
    return{
        type: ORDER_BY_SCORE,
        payload
    }
}

export function getDetail(id){
    return async function(dispatch){
        try{
            var json = await axios.get("http://localhost:3001/recipes/"+id);
            return dispatch({
                type: GET_DETAILS,
                payload: json.data
            })
        } catch(error){
            console.log(error)
        }
    }
 }