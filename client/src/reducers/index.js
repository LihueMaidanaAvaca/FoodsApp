import {GET_RECIPES, GET_NAMERECIPES, SET_NAME, GET_TYPES, FILTER_BY_TYPE, FILTER_CREATED, ORDER_BY_NAME, ORDER_BY_SCORE, GET_DETAILS } from '../actions';


const initialState = {
   recipes: [],
   types: [] 
   };

   export default function rootReducer(state = initialState, action) {
    switch (action.type) {
      case GET_RECIPES:
         return {...state,
              recipes: action.payload,
              
             };
      case GET_TYPES:
               return{
                 ...state, 
                 types: action.payload                                          
             }       
    default:
         return state;
    }}   