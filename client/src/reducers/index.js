import {GET_RECIPES, GET_NAMERECIPES, SET_NAME, GET_TYPES, FILTER_BY_TYPE, FILTER_CREATED, ORDER_BY_NAME, ORDER_BY_SCORE, GET_DETAILS } from '../actions';


const initialState = {
   recipes: [],
   allRecipes: [],
   types: []
   };

   export default function rootReducer(state = initialState, action) {
    switch (action.type) {
      case GET_RECIPES:
         return {...state,
              recipes: action.payload,
              allRecipes: action.payload
             };
      case GET_TYPES:
               return{
                 ...state, 
                 types: action.payload                                          
             } 
      case FILTER_BY_TYPE:
            const allRecipes = state.allRecipes
            
            const typeFilter = action.payload === 'types' ? allRecipes :  allRecipes.filter(el => {const aux = el.Diets?.map(e=> e.name)
                if (aux?.includes(action.payload)) return el;});
            console.log('y esto?', typeFilter)
            
            return {...state, recipes: typeFilter
            } 
      case ORDER_BY_NAME:
              let sortedArr = action.payload === 'asd' ? state.recipes.sort(function (a, b){
                  if(a.name > b.name){
                      return 1;
                  }
                  if(b.name > a.name){
                      return -1;
                  }
                  return 0;
              }) :
              state.recipes.sort(function (a, b){
                  if(a.name > b.name){
                      return -1;
                  }
                  if(b.name > a.name){
                      return 1;
                  }
                  return 0
              })
              return{
                  ...state, recipes: sortedArr
              }            
    default:
         return state;
    }}   