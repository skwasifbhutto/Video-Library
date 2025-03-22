import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { useFormik } from "formik";

export function AdminAddVideo(){

    const[categories, setCategories]=useState([{CategoryId:0,CategoryName:''}]);

    let navigate=useNavigate();

    const formik=useFormik({
        initialValues: {
            VideoId:0,
            Title: '',
            Url:'',
            Description:'',
            Likes:0,
            Dislikes:0,
            Views:0,
            CategoryId:0,
            Comments:['']
        },
        onSubmit: (values) => {
            axios.post('http://127.0.0.1:5050/add-video',values)
            .then(()=>{
                alert('Video Added Successfully..');
            })
            navigate('/admin-dash');
        }
    })

function LoadCategories(){
    axios.get(`http://127.0.0.1:5050/get-categories`)
        .then(response=>{
            response.data.unshift({
                CategoryId:'0',
                CategoryName:'Select a Category'
        })
            setCategories(response.data);
        })
}

    useEffect(()=>{
       LoadCategories(); 
       
    },{});
    
    return(
        <div className="w-25 bg-light m-3 p-3">
            <h3>Add New Video</h3>
            <form onSubmit={formik.handleSubmit} style={{height:'400px'}} className="overflow-auto">
                <dl>
                    <dt>Video Id</dt>
                    <dd><input type="number" onChange={formik.handleChange} className="form-control" name="VideoId" /></dd>
                    <dt>Title</dt>
                    <dd><input type="text" onChange={formik.handleChange} className="form-control" name="Title" /></dd>
                    <dt>Url</dt>
                    <dd><input type="text" onChange={formik.handleChange} className="form-control" name="Url" /></dd>
                    <dt>Description</dt>
                    <dd><textarea rows="2" onChange={formik.handleChange} cols="40" className="form-control" name="Description"></textarea></dd>
                    <dt>Likes</dt>
                    <dd><input type="number" onChange={formik.handleChange} className="form-control" name="Likes" /></dd>
                    <dt>Dislikes</dt>
                    <dd><input type="number" onChange={formik.handleChange} className="form-control" name="Dislikes" /></dd>
                    <dt>Views</dt>
                    <dd><input type="number" onChange={formik.handleChange} className="form-control" name="Views" /></dd>
                    <dt>Category</dt>
                    <dd>
                        <select className="form-select" onChange={formik.handleChange}>
                            {
                                categories.map(category=>
                                    <option key={category.CategoryId} value={category.CategoryId}> {category.CategoryName}</option>
                                )
                            }
                        </select>
                    </dd>
                </dl>
                <button className="btn btn-success">Add Video</button>
                <Link to='/admin-dash' className="btn btn-danger ms-2">Cancel</Link>
            </form>
        </div>
    )
}