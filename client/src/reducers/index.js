import {GET_RECIPES, GET_NAMERECIPES, SET_NAME, GET_TYPES, FILTER_BY_TYPE, FILTER_CREATED, ORDER_BY_NAME, ORDER_BY_SCORE, GET_DETAILS } from '../actions';


const initialState = {
   recipes: [],
   allRecipes: [],
   types: [],
   detail: []
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
            
            const typeFilter = action.payload === 'types' ? allRecipes :  allRecipes.filter(el => {const aux = el.Types?.map(e=> e.name)
                if (aux?.includes(action.payload)) return el;});
            
            
            return {...state, recipes: typeFilter
            } 
      case ORDER_BY_NAME:
              let sortedArr = action.payload === 'asd' ? state.recipes.sort(function (a, b){
                  if(a.title > b.title){
                      return 1;
                  }
                  if(b.title > a.title){
                      return -1;
                  }
                  return 0;
                }) :
                state.recipes.sort(function (a, b){
                  if(a.title > b.title){
                    return -1;
                  }
                  if(b.title > a.title){
                    return 1;
                  }
                  return 0
                })
                return{
                  ...state, recipes: sortedArr
              }  
      case ORDER_BY_SCORE:
              let sortedSArr = action.payload === 'asd' ? state.recipes.sort(function (a, b){
                  if(a.healthScore > b.healthScore){
                      return 1;
                  }
                  if(b.healthScore > a.healthScore){
                      return -1;
                  }
                  return 0;
                }) :
                state.recipes.sort(function (a, b){
                  if(a.healthScore > b.healthScore){
                    return -1;
                  }
                  if(b.healthScore > a.healthScore){
                    return 1;
                  }
                  return 0
                })
                console.log('ahora el tema esta aca', sortedSArr)
                return{
                  ...state, recipes: sortedSArr
              }
      case GET_NAMERECIPES:
            return{
                ...state,
                recipes: action.payload
            }
      case FILTER_CREATED:
            const allRecipes2 = state.allRecipes 
            const createdFilter = action.payload === 'created' ? allRecipes2.filter(el => el.created) : allRecipes2.filter(el => !el.created)   
            return {
                ...state, recipes: action.payload === 'allDogs' ? state.allRecipes : createdFilter
            } 
      case GET_DETAILS:
                return{
                    ...state,
                    detail: action.payload
                }                         
    default:
         return state;
    }}   