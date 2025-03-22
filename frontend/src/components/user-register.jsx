import { useFormik } from "formik"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

export function UserRegister(){
    let navigate=useNavigate();

const formik=useFormik({
    initialValues:{
        UserId:'',
        UserName:'',
        Password:'',
        Email:'',
        Mobile:''
    },
    onSubmit:(user)=>{
        axios.post(`http://127.0.0.1:5050/register-user`,user);
        alert('User Registered Successfully..');
        navigate('/user-login');
    }
})

    return(
        <div className="bg-light m-3 p-3 w-25">
            <h3>Register User</h3>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>User Id</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="UserId" className="form-control" /></dd>
                    <dt>User Name</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="UserName" className="form-control" /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" onChange={formik.handleChange} name="Password" className="form-control" /></dd>
                    <dt>Email</dt>
                    <dd><input type="email" onChange={formik.handleChange} name="Email" className="form-control" /></dd>
                    <dt>Mobile</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="Mobile" className="form-control" /></dd>
                </dl>
                <button type="submit" className="">Register</button>
                <div>
                <Link to="/user-login">Existing User Login</Link>
                </div>
                <div>
                    <Link to="/admin-login">Admin Login</Link>
                </div>
            </form>
        </div>
    )
}