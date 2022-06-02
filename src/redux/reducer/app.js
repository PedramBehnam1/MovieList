import { SEARCH_TEXT } from "../action/action-types"

const initialState = {
  visibility : true,
  nameOfMovie: "",
  yearOfMakingMovie: "",
  status: true,
}


export default ( state = initialState , action) =>{
 switch (action.type) {
  case SEARCH_TEXT:{
   return{
    ...state,
    visibility: action.paylod.visibility,
    nameOfMovie: action.paylod.nameOfMovie,
    yearOfMakingMovie: action.paylod.yearOfMakingMovie,
    status: action.paylod.status,
   }
  
  }
  default:
    return state;
 }
}