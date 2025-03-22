import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export function AdminDashboard(){

    const [videos,setVideo]=useState([{VideoId:0,Title:'',Url:'',Description:'',Likes:0,Dislikes:0,Views:0,CategoryId:0,Comments:[]}])
    useEffect(()=>{
        axios.get(`http://127.0.0.1:5050/get-videos`)
        .then(response=>{
            setVideo(response.data);
        })
    },[])

    return(
        <div className="bg-light p-3 m-3">
            <h3>Admin Dashboard</h3>
            <Link to="/add-video" className="btn btn-primary bi bi-camera-video">Add Video</Link>
            <div>
                <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Priview</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        videos.map(video=>
                            <tr key={video.VideoId}>
                                <td>{video.Title}</td>
                                <td>
                                    <iframe src={video.Url} width="300px" height="200px"></iframe>
                                </td>
                                <td>
                                    <Link to={`/edit-video/${video.VideoId}`} className="bi bi-pen-fill me-2 btn btn-warning" />
                                    <Link to={`/delete-video/${video.VideoId}`} className="bi bi-trash-fill btn btn-danger" />
 
                                </td>
                            </tr>
                        )
                    }
                </tbody>
                </table>
            </div>
        </div>
    )
}