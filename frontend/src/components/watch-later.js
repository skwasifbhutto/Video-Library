import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWatchLater } from '../slicer/watchLaterSlice';
import { Link } from 'react-router-dom';

export const WatchLater = () => {
    const watchLaterItems = useSelector((state) => state.watchLater.items);
    const dispatch = useDispatch();

    return (
        <div className="container mt-4">
            <div className="row mb-4">
                <div className="col">
                    <Link to="/user-dashboard" className="btn btn-primary">Back to Dashboard</Link>
                </div>
            </div>
            <h2 className="text-white mb-4">Watch Later</h2>
            {watchLaterItems.length === 0 ? (
                <div className="alert alert-info">No videos in your watch later list</div>
            ) : (
                <div className="row">
                    {watchLaterItems.map((video) => (
                        <div key={video.id} className="col-md-4 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{video.title}</h5>
                                    <p className="card-text">{video.description}</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <a href={video.url} target="_blank" rel="noopener noreferrer" 
                                           className="btn btn-primary">
                                            Watch Video
                                        </a>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => dispatch(removeFromWatchLater(video.id))}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}; 