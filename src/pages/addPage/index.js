
import { upload } from "@testing-library/user-event/dist/upload";
import React from "react";
import { useState,useEffect } from "react";
import './index.css';
import axios from "axios";
import { render } from "@testing-library/react";
import {Link} from "react-router-dom";
import paths from "../../Router/path";
import {  Button  } from 'react-bootstrap';

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


//  <div>
//     <p className="p-AddPage"><Link to={paths.home}>back to home</Link></p> 
//     <div className="div-addPage">
//     <form className="addPage-Form" onSubmit={handleSubmit}>
//       <input name="nameOfMovie" placeholder="nameofMovie" size={35} type="text" onChange={handleChange} />
//       <input type="file" onChange={uploadPhoto} name="image_url[]" />
//       <input type="text" size={35} name="yearOfMakingMovie" placeholder="yearOfMakingMovie" onChange={handleChange} />
//       <textarea name="description" className="description-input" placeholder="description" cols="30" rows="10" onChange={handleChange}></textarea>
//       <button onClick={uploadPhotoo}>add Movie</button>
//     </form>
//     <img src={url}  className="img-Addpage" />
     
//    </div>
//   </div>
 return(
  <>
  <section className="h-100 h-custom" style={{backgroundColor:"#8fc4b7"}} >
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-8 col-xl-6">
        <div className="card rounded-3">
        
          <img src={url} alt="Sample photo"  className=" w-100"  style={{borderTopLeftRadius: ".3rem", borderTopRightRadius: ".3rem" }}/>
          <div className="card-body p-4 p-md-5">
            <h3 className="mb-4 pb-2  pb-md-0 mb-md-5 px-md-2" style={{marginRight:"46%"}}>Create Movie</h3>

            <form className="px-md-2" onSubmit={handleSubmit}>

              <div className="row " style={{marginRight:"0%", width:"102%"}}>
                <div className="col-md-6 mb-4" style={{ width:"44%",marginLeft:"5%"}}>
                  <div className="form-outline datepicker" style={{ width:"88%"}}>
                    <input  type="text" name="yearOfMakingMovie" placeholder="yearOfMakingMovie" className="form-control" onChange={handleChange} />
                  </div>
                </div>
                
                <div className=" col-md-6 mb-4" style={{ width:"47%"}} >
                  <input name="nameOfMovie" type="text" placeholder="nameofMovie" className="form-control"  onChange={handleChange} />
                </div>
              </div>

              <div className=" mb-4 mt-2" style={{ width:"88%"}} >
                <input className="form-control form-control-SM" onChange={uploadPhoto} name="image_url[]" type="file" />
                <div className="small text-muted mt-2">Upload your photo/movie or any other relevant file. </div>
              </div>

              <div className="mb-4" style={{width:"88%"}}>
               <textarea name="description" className="form-control" placeholder="description" cols="30" rows="3" onChange={handleChange}></textarea>
              </div>

             
              <div className="rows "style={{width:"48%"}} >
                <Button type="submit" onClick={uploadPhotoo} className="btn btn-success  mb-1 col-md" style={{marginRight: "2%"}}>Add Movie</Button>
                <Button  className="btn btn-primary  mb-1 col-md " style={{height: "93%" , width:"51%"}}><Link className="text-light text-decoration-none" to={paths.home}>back to home</Link></Button> 
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  
  </>
  
 )
}
export default AddPage;