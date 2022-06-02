import React,{Component} from "react";
import axios from "axios";
import "./index.css";
import {Link} from "react-router-dom";
import paths from "../../Router/path";
import {  Button  } from 'react-bootstrap';
import { wait } from "@testing-library/user-event/dist/utils";
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
   id:0,
  }
   this.handleClick =  this.handleClick.bind(this);
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
     this.setState({id:index});
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
async handleClick (e){
  console.log("jjj");
  
  if (window.confirm("Are you sure want to delete?")) {
    wait(
     axios.delete(`${this.state.baseUrl}?id=${this.state.id}`).then(res=>{
     console.log(res.data);
     if (res.status == 200) {
      alert("succesfully deleted");
      window.location.assign(paths.home)
     }
     
    // window.location.reload();// if you dont problem with refresh the page
    })
    );
   }
  // window.location.href(paths.home);
}

 render(){
  return(
   <div className="div-MovieInformation" style={{height:"990px"}}>
    <br />
    <img className="img-MovieInformation img-thumbnail w-25 " src={this.state.address} alt={this.state.alt} />
    <div className="div1-MovieInformation">
     <p className="p-MovieInformation w-25">Name: {this.state.name1}</p>
     <p className="p-MovieInformation">Year: {this.state.year}</p>
    </div>
    <div className="div2-MovieInformation">
     <p className="p1-MovieInformation">description: {this.state.desc}</p>
    </div>
    <Link to={paths.home}><Button className="btn btn-primary rounded-bottom rounded-top">Home</Button></Link>
    <Link to={`/update/${this.state.id}`}><Button className="bg-warning rounded-bottom rounded-top mx-2">Edit </Button></Link>
    <Button onClick={this.handleClick} className="bg-danger rounded-bottom rounded-top">Delete </Button> 
   </div>
  )
 }
}

export default MovieInformation;