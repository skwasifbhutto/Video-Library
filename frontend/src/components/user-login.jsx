import { useFormik } from "formik";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { useCookies } from "react-cookie";

export function UserLogin(){

const [users,setUsers] = useState([{UserId:'',UserName:'',Password:'',Email:'',Mobile:''}]);

const [cookies, setCookie, removeCookie]= useCookies(['username']);

let navigate=useNavigate();

const formik=useFormik({
    initialValues:{
        UserId:'',
        Password:''
    },
    onSubmit:(user)=>{
        axios.get(`http://127.0.0.1:5050/get-users`)
        .then(response=>{
            var result=response.data.find(item=>item.UserId===user.UserId);
            if(result){
                if(result.Password===user.Password){
                    setCookie('username',result.UserName)
                    navigate('/user-dashboard')
                } else{
                    alert('Invalid Password');
                }
            } else{
                alert('Invalid User Id');
            }
        })
       
    }
})

    return(
        <div className="bg-light p-4 m-4 w-25">
            <h3>User Login</h3>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>User Id</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="UserId" className="form-control" id="" /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" onChange={formik.handleChange} name="Password" className="form-control" id="" /></dd>
                    
                </dl>
                <button type="submit" className="btn btn-warning w-100">Login</button>
               <div>
               <Link to="/user-register" className="">New User Register</Link>
               </div>
            </form>
        </div>
    )
}