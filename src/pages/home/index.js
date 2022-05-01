import React ,{Component, useState , useEffect} from "react";
import Header from "../../component/header";
import {Link} from "react-router-dom";
import MovieList, { MemoizedSubComponent } from "../../component/moveList";
import {useStateToProps , useDispatchToProps} from "../../redux/action/actions";
import  {SEARCH_TEXT} from "../../redux/action/action-types";

const Home =()=>{
 

 const {visibility , nameOfMovie,yearOfMakingMovie} = useStateToProps((state) =>({
  visibility: state.app.visibility,
  nameOfMovie: state.app.nameOfMovie,
  yearOfMakingMovie: state.app.yearOfMakingMovie,
 }));

 
  
  return(
   <div>
    
    <Header />
    <p>year: {yearOfMakingMovie}</p>
    <br />
    <p>name: {nameOfMovie}</p>
    <p><Link to='/create' className="AddButton">Add Movie</Link></p>
    <MovieList />
   </div>
  )
 

}

export default Home;