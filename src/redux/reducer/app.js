import { SEARCH_TEXT } from "../action/action-types"

const initialState = {
  visibility : true,
  nameOfMovie: "",
  yearOfMakingMovie: ""
}


export default ( state = initialState , action) =>{
 switch (action.type) {
  case SEARCH_TEXT:{
   return{
    ...state,
    visibility: action.paylod.visibility,
    nameOfMovie: action.paylod.nameOfMovie,
    yearOfMakingMovie: action.paylod.yearOfMakingMovie,
   }
  
  }
  default:
    return state;
 }
}