import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToViewLater } from "../slicer/video-slicer";
import { addToWatchLater } from "../slicer/watchLaterSlice";
import store from "../store/store";

export function UserDashBoard(){
    const [cookies, setCookie,removeCookie]= useCookies(['username']);
    const [videos,setVideo]=useState([{VideoId:0,Title:'',Url:'',Description:'',Likes:0,Dislikes:0,Views:0,CategoryId:0,Comments:[]}]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [allVideos, setAllVideos] = useState([]);
    const watchLaterItems = useSelector((state) => state.watchLater.items);
    let navigate=useNavigate();
    let dispatch = useDispatch();

    function handleSignout(){
        removeCookie('username');
        navigate('/user-login');
    }
    
    useEffect(()=>{
        axios.get(`http://127.0.0.1:5050/get-videos`)
        .then(response=>{
            setAllVideos(response.data);
            setVideo(response.data);
        })
    },[])

    useEffect(() => {
        let filteredVideos = [...allVideos];
        
        // Apply search filter
        if (searchTerm) {
            filteredVideos = filteredVideos.filter(video => 
                video.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                video.Description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        // Apply category filter
        if (selectedCategory && selectedCategory !== 'All') {
            filteredVideos = filteredVideos.filter(video => 
                video.CategoryId.toString() === selectedCategory
            );
        }
        
        setVideo(filteredVideos);
    }, [searchTerm, selectedCategory, allVideos]);

    function handleSearch(e) {
        e.preventDefault();
        // Search is already handled by the useEffect
    }

    function handleSearchInputChange(e) {
        setSearchTerm(e.target.value);
    }

    function handleCategoryChange(e) {
        setSelectedCategory(e.target.value);
    }

    function handleWatchLaterClick(video){
        dispatch(addToWatchLater({
            id: video.VideoId,
            title: video.Title,
            url: video.Url,
            description: video.Description
        }));
        alert('Added to Watch Later!');
    }

    return(
        <div className="bg-light p-2 m-2">
            <h3 className="d-flex justify-content-between">
                <div>
                    <span>{cookies['username']}</span> 
                    <span>DashBoard</span>
                </div>
                <div>
                    <Link to="/watch-later" className="btn btn-primary me-2">
                        Watch Later ({watchLaterItems.length})
                    </Link>
                    <button onClick={handleSignout} className="btn btn-link">Signout</button>
                </div>
            </h3>
            <div className="row">
                <div className="col-2">
                    <div className="mb-3">
                        <label className="form-label fw-bold">Search Videos</label>
                        <form onSubmit={handleSearch}>
                            <div className="input-group">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={searchTerm}
                                    onChange={handleSearchInputChange}
                                    placeholder="Search by title or description"
                                />
                                <button type="submit" className="bi bi-search btn btn-warning"></button>
                            </div>
                        </form>
                    </div>
                    <div>
                        <label className="form-label fw-bold">Select Category</label>
                        <div>
                            <select 
                                className="form-select"
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                            >
                                <option value="">All Categories</option>
                                <option value="1">Java</option>
                                <option value="2">React</option>
                                <option value="3">Cloud</option>
                                <option value="4">Styles</option>
                                <option value="5">Web development</option>
                                
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-10">
                    <section className="mt-4 d-flex flex-wrap">
                        {videos.length === 0 ? (
                            <div className="alert alert-info w-100">No videos found matching your criteria</div>
                        ) : (
                            videos.map(video=>
                                <div key={video.VideoId} className="card m-2 p-2" style={{width:'250px'}}>
                                    <div className="card-title" style={{height:'50px'}}>
                                        <h5>{video.Title}</h5>
                                    </div>
                                    <div className="card-body">
                                        <iframe src={video.Url} className="w-100" height="200" title={video.Title}></iframe>
                                    </div>
                                    <div className="card-footer">
                                        <span className="bi bi-eye-fill">{video.Views}</span>
                                        <span className="mx-3 bi bi-hand-thumbs-up">{video.Likes}</span>
                                        <span className="bi bi-hand-thumbs-down">{video.Dislikes}</span>
                                        <button 
                                            onClick={() => handleWatchLaterClick(video)} 
                                            className="bi bi-clock btn btn-outline-primary"
                                            disabled={watchLaterItems.some(item => item.id === video.VideoId)}
                                        >
                                            {watchLaterItems.some(item => item.id === video.VideoId) ? 'Added' : 'Watch Later'}
                                        </button>
                                    </div>
                                </div>
                            )
                        )}
                    </section>
                </div>
            </div>
        </div>
    )
}