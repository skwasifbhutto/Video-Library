import { createSlice } from '@reduxjs/toolkit';

const watchLaterSlice = createSlice({
    name: 'watchLater',
    initialState: {
        items: JSON.parse(localStorage.getItem('watchLater')) || []
    },
    reducers: {
        addToWatchLater: (state, action) => {
            if (!state.items.find(item => item.id === action.payload.id)) {
                state.items.push(action.payload);
                localStorage.setItem('watchLater', JSON.stringify(state.items));
            }
        },
        removeFromWatchLater: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            localStorage.setItem('watchLater', JSON.stringify(state.items));
        },
        clearWatchLater: (state) => {
            state.items = [];
            localStorage.removeItem('watchLater');
        }
    }
});

export const { addToWatchLater, removeFromWatchLater, clearWatchLater } = watchLaterSlice.actions;
export default watchLaterSlice.reducer; 