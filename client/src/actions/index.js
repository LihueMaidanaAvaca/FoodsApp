import axios from 'axios';
// import { bindActionCreators } from 'redux';
export const GET_RECIPES = 'GET_RECIPES'

export function getRecipes() {
    return async function(dispatch){
        var json = await axios("http://localhost:3001/recipes");
        console.log('action', json.data)
        return dispatch({
            type: GET_RECIPES,
            payload: json.data
        })
    }
}