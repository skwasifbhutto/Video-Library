import { Link } from "react-router-dom"

export function VideoHome(){
    return(
        <div className="d-flex justify-content-center mt-4 align-items-center" style={{height:'100vh'}}>
            <Link className="btn btn-light" to="/admin-login">Admin Login</Link>
            <Link className="btn btn-warning ms-2" to="/user-login">User Login</Link>
        </div>
    )
}