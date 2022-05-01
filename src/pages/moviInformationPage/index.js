import React,{Component} from "react";
import axios from "axios";
import "./index.css";
import {Link} from "react-router-dom";
import paths from "../../Router/path";
class MovieInformation extends Component{
 constructor(props){
  super(props);
  this.state= {
   name1:'',
   year:'',
   desc:'',
   address:'',
   alt:'',
   baseUrl : "http://localhost/CRUD_2/Pedram_Behnam_CRUD/index.php",
   state:true,
  }
 }


 componentDidMount(){
  var regex =/^[0-9]+$/;
  console.log(window.location.pathname);
  var data = window.location.pathname.split('/');

  var value;
  data.map( index => {
    if ( regex.test(index)) {
      console.log(index);
     // console.log(1111);
     value = index; 
    }
  });
  console.log(value);
  axios.get(`${this.state.baseUrl}?id=${value}`).then( res =>{
   console.log(res.data);
   this.setState({
    name1: res.data.name,
    year: res.data.yearOfMaking,
    desc: res.data.description,
    address:res.data.addressFile,
    alt:res.data.alt,
   })
   
 })

 }


 render(){
  return(
   <div className="div-MovieInformation">
    <br />
    <img className="img-MovieInformation" src={this.state.address} alt={this.state.alt} />
    <div className="div1-MovieInformation">
     <p className="p-MovieInformation">Name: {this.state.name1}</p>
     <p className="p-MovieInformation">Year: {this.state.year}</p>
    </div>
    <div className="div2-MovieInformation">
     <p className="p1-MovieInformation">description: {this.state.desc}</p>
    </div>
    <Link to={paths.home}><p>Home</p></Link>
   </div>
  )
 }
}

export default MovieInformation;