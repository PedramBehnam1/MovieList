import React, { Component ,useContext,useEffect,useState} from "react";
import axios from "axios";
import Movie from "../movie";
import { MovieContext } from "../getMovies";
import { connect } from "react-redux";
import { type } from "@testing-library/user-event/dist/type";
import {useStateToProps , useDispatchToProps} from "../../redux/action/actions";
import "./index.css"
import {Link} from "react-router-dom";
import {Image  } from 'react-bootstrap';
import AddButton from "../../icons/add-button-4468194-4012612.png"

class MovieList extends React.Component { 
  constructor(props){
    super(props);
    this.state= {
      movieList :[],
      baseUrl : "http://localhost/CRUD_2/Pedram_Behnam_CRUD",
      state: true,
      file:[],
      movie: {},
    }

    this.bool = false;
    this.bool1 = false;
  
    this.getMovieByName= this.getMovieByName.bind(this);
  }

  
  
  
  componentDidMount(){
    
    console.log(10);
      try {
       axios.get(`${this.state.baseUrl}/index.php`).then(res =>{
  
        console.log(res.data);
        if (res.data != "rows: 0") { 
          this.setState({movieList : res.data}); 
          console.log(res.data);
        }else{
          this.setState({state:false},function () {
            console.log(this.state.state) ; 
          });
          
        }
        
          
        })
      } catch (error) {
        
        console.log(error);
      }
  }


getMovieByName(){
  var result = {};
  if(this.bool === false) {
    axios.get(`${this.state.baseUrl}/index.php?nameOfMovie=1&visibility=${this.props.visibility}&name=${this.props.name}&year=""`).then(res=>{
     result = res.data[0];
     this.setState({movie:result});
     this.bool = true;
     })
     return result;
  }
}

getMovieByYear(){
  var result = {}
  if (this.bool === false) {
    axios.get(`${this.state.baseUrl}/index.php?yearOfMovie=1&visibility=${this.props.visibility}&name=""&year=${this.props.year}`).then(res=>{
    result = res.data[0];
    this.setState({movie:result});
    this.bool = true;
    })
    return result;
  }
}

 

  render(){ 

   



    if(this.props.visibility === false){
      var i = {};
      if (this.props.name !== "") {
      i = this.getMovieByName(this.bool);
       console.log(111);
       console.log(this.state.movie); 
       if (this.state.movie === "r") {
         return(
           <p>we dont have any movie by this name!</p>
         )
       }else{
       return(
        <div> 
         <p>ff</p>
         <Movie movie= {this.state.movie} /> 
        </div>
       )
       }
      }else if (this.props.year != "") {
        i = this.getMovieByYear(this.bool);

       return(
        <>
         {<Movie movie= {this.state.movie} />}
         
        </>
       )
      }
    
   }else{
      return(
        <>
        <div className="div-movieList row container-fluid d-flex justify-content-around">
          {this.state.state ? this.state.movieList.map((movie , index)=>(
            
              <Movie movie= {movie} index={index}  key={movie.id}/>
            
            
          )) 
          : <p className="text-white" style={{marginLeft:"9%"}}>add some movie...</p>}

          <Link to='/create' className="mt-auto mb-1 text-white image-link"><Image   src={AddButton} style={{width:"5%", height:"5%",marginLeft:"9%"} }></Image></Link>
        </div>
        </>
      )
    }
  }
  
   
}
const mapStateToProps = (state)=>{
  return{
    visibility:state.app.visibility,
    name:state.app.nameOfMovie,
    year:state.app.yearOfMakingMovie,
  }
}

export const MemoizedSubComponent = React.memo(connect(mapStateToProps)(MovieList)); 

export default connect(mapStateToProps)(MovieList);