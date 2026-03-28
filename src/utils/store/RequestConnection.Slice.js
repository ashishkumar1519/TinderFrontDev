import { createSlice } from "@reduxjs/toolkit";

const requestConnectionSlice = createSlice({
        name: 'requestConnection',
        initialState: null,
        reducers: {
            addRequestConnection: (state, action) => {
                return action.payload;
            },
            removeRequestConnection: (state, action) => {
                state = state.filter(request => request._id !== action.payload);
                return state;
            }
        }
}); 

export const { addRequestConnection, removeRequestConnection } = requestConnectionSlice.actions;
export default requestConnectionSlice.reducer;