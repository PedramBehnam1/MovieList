import axios from "axios";
import React,{Component} from "react";
import {Link} from "react-router-dom";
import paths from "../../Router/path";
import './index.css';
import {  Button  } from 'react-bootstrap';

class UpdatePage extends Component {
  constructor(props){
    super(props);
    this.state= {
      name1:'',
      year:'',
      desc:'',
      baseUrl : "http://localhost/CRUD_2/Pedram_Behnam_CRUD/index.php",
      imageUrl:'',
      alt:'',
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
      imageUrl: res.data.addressFile,
      alt: res.data.alt,
    })
    console.log(this.state.alt);
  })
  
}

 handleSubmit(e){
  e.preventDefault(); 
 }


 handleChange(e){
  this.setState({[e.target.name]:e.target.value });
 }

 
 uploadPhoto(e){
  this.setState({files:e.target.files[0]},function () {
    var test = window.URL.createObjectURL(this.state.files);
    this.setState({imageUrl:test});
    console.log(this.state.imageUrl);
  });
  
  
  
 }
 changeUrl(e){
  
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
        if (this.state.name1 != "" && this.state.year != "" && this.state.desc != "") {
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
        }else{
          alert("please insert someting");
        }
      }else
      alert("please choose your photo of movie");
    })
  }else{
    if (this.state.name1 != "" && this.state.year != "" && this.state.desc != "") {
      try {
            
        result = ({
          name:this.state.name1 ,
          imageUrl:this.state.imageUrl,
          alt:this.state.alt,
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
    }else{
      alert("please insert someting");
    }
  }
  
 }

//  <div>
//  <Link to={paths.home}>Home</Link>
 
//  <form onSubmit={this.update}>
//    <input type="text" name="name1" size={35} value={this.state.name1} placeholder={this.state.name1} onChange={this.handleChange} />
//    <input type="file" onChange={this.uploadPhoto} name="image_url" />
//    <input type="text" size={35} name="year" value={this.state.year} placeholder={this.state.year} onChange={this.handleChange} />
//    <textarea name="desc" className="description-input" value={this.state.desc} placeholder={this.state.desc} cols="30" rows="10" onChange={this.handleChange}></textarea>
//    <button onClick={this.handleClick}>Edit</button>
//  </form>
//  <img src={this.state.imageUrl}  className="img-updatePage" />
// </div>

 render(){
  return(
    <>
    
      <section className="h-100 h-custom" style={{backgroundColor:"#8fc4b7"}} >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-6">
              <div className="card rounded-3 card_div">
              
                <img src={this.state.imageUrl} alt={this.state.alt}  className="img-thumbnail w-100"  style={{borderTopLeftRadius: ".3rem", borderTopRightRadius: ".3rem" , imageRendering:"pixelated",height:"300px" }}/>
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2  pb-md-0 mb-md-5 px-md-2" style={{marginRight:"46%"}}>update Movie</h3>

                  <form className="px-md-2" onSubmit={this.handleSubmit}>

                    <div className="row " style={{marginRight:"0%", width:"102%"}}>
                      <div className="col-md-6 mb-4" style={{ width:"44%",marginLeft:"5%"}}>
                        <div className="form-outline datepicker" style={{ width:"88%"}}>
                          <input name="name1" className="form-control" type="text" value={this.state.name1} placeholder="name" onChange={this.handleChange}/>
                        </div>
                      </div>
                      
                      <div className=" col-md-6 mb-4" style={{ width:"47%"}} >
                      <input  type="text" name="year" placeholder="year..." value={this.state.year} className="form-control" onChange={this.handleChange} />
                      </div>
                    </div>

                    <div className=" mb-4 mt-2" style={{ width:"88%"}} >
                      <input className="form-control form-control-SM" onChange={this.uploadPhoto} name="image_url" type="file" />
                      <div className="small text-muted mt-2">Upload your photo/movie or any other relevant file. </div>
                    </div>

                    <div className="mb-4" style={{width:"88%"}}>
                    <textarea name="desc" className="form-control" value={this.state.desc} placeholder="description..." cols="30" rows="3" onChange={this.handleChange}></textarea>
                    </div>

                  
                    <div className="rows lastDiv"style={{width:"48%"}} >
                      <Button type="submit" onClick={this.handleClick} className="submitButton btn btn-success  mb-1 col-md" style={{marginRight: "2%"}}>Update</Button>
                      <Button  className="HomeButton btn btn-primary  mb-1 col-md " style={{height: "93%" , width:"34%"}}><Link className="text-light text-decoration-none" to={paths.home}>Home</Link></Button> 
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
}

  
export default UpdatePage;