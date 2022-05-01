import axios from "axios";
import React,{Component} from "react";
import {Link} from "react-router-dom";
import paths from "../../Router/path";
import './index.css';

class UpdatePage extends Component {
  constructor(props){
    super(props);
    this.state= {
      name1:'',
      year:'',
      desc:'',
      baseUrl : "http://localhost/CRUD_2/Pedram_Behnam_CRUD/index.php",
      imageUrl:'',
      files:null,
      
    }
    this.handleChange= this.handleChange.bind(this);
    this.uploadPhoto = this.uploadPhoto.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
  axios.get(`${this.state.baseUrl}?id=${value}`).then( res =>{
    console.log(res.data);
    this.setState({
      name1: res.data.name,
      year: res.data.yearOfMaking,
      desc: res.data.description,
    })
  })
}

 handleSubmit(e){
  e.preventDefault(); 
 }


 handleChange(e){
  this.setState({[e.target.name]:e.target.value });
 }

 
 uploadPhoto(e){
  this.setState({files:e.target.files[0]});
  
 }

 handleClick(e){
  e.preventDefault();
  var regex =/^[0-9]+$/;
  var data = window.location.pathname.split('/');
  var value;
  var result =({});
  data.map( index => {
    if ( regex.test(index)) {
     value = index; 
    }
  });
  if (this.state.files != null) {
    let fdc = new FormData();
    fdc.append('file',this.state.files);
    fdc.append('upload_preset' , 'xxas4khe');
    const uploadPhoto =  axios.post("https://api.cloudinary.com/v1_1/dd3ezmaxv/image/upload" , fdc).then(res =>{
      console.log(res);
      console.log(res.data.url);
      if (res.status == 200) {
        this.setState({imageUrl: res.data.url})
        try {
          
          result = ({
            name:this.state.name1 ,
            imageUrl:res.data.url,
            alt:res.data.original_filename,
            year:this.state.year,
            desc:this.state.desc
          })

          axios.put(`${this.state.baseUrl}?id=${value}`,result).then(res=>{//ba put - test mikonim bebinim chi mishe - akhe ba post nemikham - put ye meghdar moshkele- khob peyda milkonim
            console.log(res);
            console.log(res.data);
            alert("succesfully updated");
          })
        } catch (error) {
          console.log(error);
        }
      }
    })
  }else{
    alert("please choose your photo of movie");
  }
  
 }

 render(){
  return(
   <div>
    <Link to={paths.home}>Home</Link>
    
    <form onSubmit={this.update}>
      <input type="text" name="name1" size={35} value={this.state.name1} placeholder={this.state.name1} onChange={this.handleChange} />
      <input type="file" onChange={this.uploadPhoto} name="image_url" />
      <input type="text" size={35} name="year" value={this.state.year} placeholder={this.state.year} onChange={this.handleChange} />
      <textarea name="desc" className="description-input" value={this.state.desc} placeholder={this.state.desc} cols="30" rows="10" onChange={this.handleChange}></textarea>
      <button onClick={this.handleClick}>Edit</button>
    </form>
    <img src={this.state.imageUrl}  className="img-updatePage" />
   </div>
  )
 }
}

  
export default UpdatePage;