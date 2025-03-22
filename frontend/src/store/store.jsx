import { configureStore } from "@reduxjs/toolkit";
import videoSlicer from '../slicer/video-slicer';
import watchLaterReducer from '../slicer/watchLaterSlice';

export default configureStore({
    reducer: { 
        store: videoSlicer,
        watchLater: watchLaterReducer
    }
})