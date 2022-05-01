
import { upload } from "@testing-library/user-event/dist/upload";
import React from "react";
import { useState,useEffect } from "react";
import './index.css';
import axios from "axios";
import { render } from "@testing-library/react";
import {Link} from "react-router-dom";
import paths from "../../Router/path";

const AddPage = ()=>{
 const[nameOfMovie,setNameOfMovie] = useState('');
 const[yearOfMakingMovie,setYearOfMakingMovie] = useState('');
 const[description,setDescription] = useState('');
 const[photo,setPhoto] = useState(null);
 const baseUrl = "http://localhost/CRUD_2/Pedram_Behnam_CRUD";
 const[url,setUrl]=useState('');
  const[imgUrl,setImgUrl] = useState('');
  const[alt,setAlt] = useState('');

 const handleSubmit = (e)=>{
  e.preventDefault(); 
 }
 
 const handleChange = (e)=>{
  var name = e.target.name;
  var value = e.target.value;

  if (name === "nameOfMovie") {
   setNameOfMovie(value);
  }else if (name === "yearOfMakingMovie") {
   setYearOfMakingMovie(value);
  }else if (name === "description") {
   setDescription(value);
  }
 }

 useEffect(()=>{
  // console.log(typeof(photo));
  console.log(photo);
 // console.log(JSON.stringify(photo));
  
 },[photo])

 const uploadPhoto = (e) =>{
   //setPhoto(URL.createObjectURL(e.target.files[0]));
   
   //setPhoto(e.dataTransfer.getData('text/html'));
   setPhoto(e.target.files[0]);
   setUrl(URL.createObjectURL(e.target.files[0]));
   
 }


 const uploadPhotoo = async () =>{
  if (photo != null) {
    let fdc = new FormData();
    fdc.append('file',photo);
    fdc.append('upload_preset' , 'xxas4khe');
    const uploadPhoto = await axios.post("https://api.cloudinary.com/v1_1/dd3ezmaxv/image/upload" , fdc).then(res =>{
      console.log(res);
      console.log(res.data.url);
      if (res.status == 200 ) {
          
        if (nameOfMovie != "" && yearOfMakingMovie != "" && description != "") {
          try {
            let fd = new FormData();
            fd.append('name',nameOfMovie);
            fd.append('image_url',res.data.url);
            fd.append('alt',res.data.original_filename);
            fd.append('year',yearOfMakingMovie);
            fd.append('desc',description);
            
            axios.post(`${baseUrl}/index.php` , fd).then(res =>{
              console.log(res);
              console.log(res.data);
              alert("succesfully added");
            })
          } catch (error) {
            console.log(error);
          }
        }else
        alert("please insert someting");
     }
    })
  }else
  alert("please choose your photo of movie");
 }

 const handleClick = async () =>{
    uploadPhotoo();
    try {
      let fd = new FormData();
      fd.append('name',nameOfMovie);
      fd.append('image_url',imgUrl);
      fd.append('alt',alt);
      fd.append('year',yearOfMakingMovie);
      fd.append('desc',description);
      
      const response = await axios.post(`${baseUrl}/index.php` , fd).then(res =>{
        console.log(res);
        console.log(res.data);
        
      })
    } catch (error) {
      console.log(error);
    }
 }

 return(
  <>
  <div>
    <p className="p-AddPage"><Link to={paths.home}>back to home</Link></p> 
    <div className="div-addPage">
    <form className="addPage-Form" onSubmit={handleSubmit}>
      <input name="nameOfMovie" placeholder="nameofMovie" size={35} type="text" onChange={handleChange} />
      <input type="file" onChange={uploadPhoto} name="image_url[]" />
      <input type="text" size={35} name="yearOfMakingMovie" placeholder="yearOfMakingMovie" onChange={handleChange} />
      <textarea name="description" className="description-input" placeholder="description" cols="30" rows="10" onChange={handleChange}></textarea>
      <button onClick={uploadPhotoo}>add Movie</button>
    </form>
    <img src={url}  className="img-Addpage" />
     
   </div>
  </div>
  
  </>
  
 )
}
export default AddPage;