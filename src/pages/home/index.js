import React ,{Component, useState , useEffect} from "react";
import Header from "../../component/header";

import MovieList, { MemoizedSubComponent } from "../../component/moveList";
import {useStateToProps , useDispatchToProps} from "../../redux/action/actions";
import  {SEARCH_TEXT} from "../../redux/action/action-types";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Image  } from 'react-bootstrap';
import Batman from "../../photos/the Batman.jpg";
import MoonKnight from "../../photos/the moon knight.jpg";
import Spiderman from "../../photos/Spider-Man-in-2022.jpg";
import Conjuring2 from "../../photos/The-Conjuring-2013.jpg";
import Conjuring4 from "../../photos/theConjuring4.jpg";
const Home =()=>{
 

 const {visibility , nameOfMovie,yearOfMakingMovie} = useStateToProps((state) =>({
  visibility: state.app.visibility,
  nameOfMovie: state.app.nameOfMovie,
  yearOfMakingMovie: state.app.yearOfMakingMovie,
 }));

 
  
  return(
   <div className="container ">
    
    <Header />
    <div className="">
      {/*<!-- Carousel -->*/}
    <Carousel style={{height:"450px"}}>
      {/*<!-- The slideshow/carousel --> */}
      <Carousel.Item >
      <Image src={Batman} alt="Batman" className="d-block w-50  container" style={{height:"400px"}}></Image>
      </Carousel.Item>

      <Carousel.Item>
      <Image src={MoonKnight} alt="moon knight" className="d-block w-50  container" style={{height:"400px"}}></Image>
      </Carousel.Item>

      <Carousel.Item>
      <Image src={Spiderman} alt="Spiderman" className="d-block w-50  container" style={{height:"400px"}}></Image>
      </Carousel.Item>

      <Carousel.Item>
      <Image src={Conjuring2} alt="onjuring2" className="d-block w-50  container" style={{height:"400px"}}></Image>
      </Carousel.Item>

      <Carousel.Item>
      <Image src={Conjuring4} alt="onjuring4" className="d-block w-50  container" style={{height:"400px"}}></Image>
      </Carousel.Item>
    </Carousel>
    
    
    </div>

    
   
    <MovieList />
   </div>
  )
 

}

export default Home;