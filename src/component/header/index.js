import React from "react";
import "./index.css";
import { useState,useEffect} from "react";
import {useStateToProps , useDispatchToProps} from "../../redux/action/actions";
import  {SEARCH_TEXT} from "../../redux/action/action-types";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Image  } from 'react-bootstrap';
import SearchIcon from '../../icons/search.png'; 
import MediaQuery from 'react-responsive';

// import { BrowserView, MobileOnlyView,  TabletView,isBrowser, isMobile } from 'react-device-detect';
const Header = ()=>{
  const {visibility , nameOfMovie,yearOfMakingMovie} = useStateToProps((state) =>({
    visibility: state.app.visibility,
    nameOfMovie: state.app.nameOfMovie,
    yearOfMakingMovie: state.app.yearOfMakingMovie,
  }));

  const[inputValue,setInputValue] = useState('');
  const[textItem,setTextItem] = useState({
    visibility:true,
    nameOfMovie: "",
    yearOfMakingMovie: "",
  });

  const updateText = useDispatchToProps(SEARCH_TEXT);

  const handleChange = (e)=>{
    setInputValue(e.target.value);
    
  }

  useEffect(()=>{
    console.log(5555);
    try {
      console.log(textItem.visibility);
      updateText(textItem);
      console.log(visibility);
      console.log(nameOfMovie);
      console.log(yearOfMakingMovie);
    } catch (error) {
      console.log(error);
    }
    
   
  },[textItem]);


  const handleClick = ()=>{
    let regex =/^[0-9]+$/;
    let regex1 =/^[A-Za-z0-9]+$/;
    let regex2 = /^(\w+\s?)*\s*$/
    console.log(inputValue);
    console.log(inputValue.length);
    if (inputValue.length > 3) {
      if (inputValue.length === 4) {
        if (regex.test(inputValue)) {
          setTextItem({
            visibility:false,
            nameOfMovie:'',
            yearOfMakingMovie:inputValue,
          });
        }
      }else{
        if(regex1.test(inputValue)){
          setTextItem({
            visibility:false,
            nameOfMovie:inputValue,
            yearOfMakingMovie:'',
          });
        }else if (!inputValue.replace(/\s/g, '').length) {
          console.log(33333);
          setTextItem({
            visibility:true,
            nameOfMovie:'',
            yearOfMakingMovie:'',
          });
        }else if (regex2.test(inputValue)) {
          console.log(333331);
          setTextItem({
            visibility:false,
            nameOfMovie:inputValue,
            yearOfMakingMovie:'',
          });
          
        }
      
      }
    }else if (inputValue.length > 0) {
      if(regex1.test(inputValue)){
        setTextItem({
          visibility:false,
          nameOfMovie:inputValue,
          yearOfMakingMovie:'',
        });
      }else if (!inputValue.replace(/\s/g, '').length) {
        console.log(33333);
        setTextItem({
          visibility:true,
          nameOfMovie:'',
          yearOfMakingMovie:'',
        });
      }else if (regex2.test(inputValue)) {
        console.log(333331);
        setTextItem({
          visibility:false,
          nameOfMovie:inputValue,
          yearOfMakingMovie:'',
        });
        
      }
    }else{
      setTextItem({
        visibility:true,
        nameOfMovie:'',
        yearOfMakingMovie:'',
      });
    }
    
    

  }
  // <div className="form-div"> header
  //    <input type="text" placeholder="name or year of making movie" size={24}  className="searchInput" onChange={handleChange}/>
  //    <button className="searchButton" onClick={handleClick}>Search</button>
  //   </div>
 
 
  // const isTabletOrMobile = useMediaQuery({ query: '(min-width: 1224px)' })
  return(
   <div className="d-flex flex-column  h-50">
    <h3 className="h3-header">Home page</h3>
    <MediaQuery minWidth={800}>
      <Form className="h-50 ">
        <Form.Group className="d-flex flex-row w-50 justify-content-center container">
          <Form.Control type="text" placeholder="name or year of making movie" className="me-2" style={{width:"61%"}} onChange={handleChange}></Form.Control>
          <Button onClick={handleClick} title="search" data-bs-toggle="tooltip" className="btn btn-dark rounded-circle" > <Image src={SearchIcon} className="h-75 " style={{width:"35px"}}  alt="search icon"></Image></Button>
        </Form.Group>
      </Form>
    </MediaQuery>

    <MediaQuery maxWidth={770}>
      <Form className="h-50 ">
        <Form.Group className="d-flex flex-row  justify-content-center container " style={{width:"90%"}}>
          <Form.Control type="text" placeholder="name or year of making movie" className="me-2" style={{width:"75%"}} onChange={handleChange}></Form.Control>
          <Button onClick={handleClick} title="search" data-bs-toggle="tooltip" className="btn btn-dark rounded-circle" > <Image src={SearchIcon} className="h-75 " style={{width:"35px"}}  alt="search icon"></Image></Button>
        </Form.Group>
      </Form>
    </MediaQuery>

    
   

   </div>
 )

}

export default Header;