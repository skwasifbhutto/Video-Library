import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


export function AdminLogin(){

    let navigate=useNavigate();
    const formik=useFormik({
        initialValues:{
            UserId:'',
            Password:''
        },
        onSubmit:(admin)=>{
axios.get(`http://127.0.0.1:5050/get-admin`)
.catch(error => {
    console.error("There was an error making the request:", error);
    alert("Network error. Please try again later.");
})
            .then(response=>{
                var user=response.data.find(item=>item.UserId===admin.UserId);
                if(user){
                    if(admin.Password===user.Password){
                        navigate("/admin-dash");
                    }else{
                        alert(`Invalid Password`)
                    }
                }else{
                    alert(`Invalid UserId`)
                }

            })
        }
    })

    return(
        <div className="bg-light p-4 m-4 w-25">
            <h3>Admin Login</h3>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Admin Id</dt>
                    <dd><input type="text" name="UserId" onChange={formik.handleChange} className="form-control" id="" /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="Password" onChange={formik.handleChange} className="form-control" id="" /></dd>
                    
                </dl>
                <button className="btn btn-warning w-100">Login</button>
                <Link to="/" className="mt-4">Back to Home</Link>
            </form>
        </div>
    )
}