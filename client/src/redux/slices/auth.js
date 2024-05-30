import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios';


export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
    console.log("auth login")
    const {data} = await axios.get('auth/login', params);
    return data;
})
// export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
//     const {data} = await axios.get('/auth/login', params);
//     return data;
// })

const initialState = {
    data: null,
    status: 'loading',
};

const authSlise = createSlice({
    name: 'auth',
    initialState,
    extraReducers: {
        [fetchAuth.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.status= 'loaded';
            state.data = action.payload;
        },
        [fetchAuth.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },
    }
});

export const authReducer = authSlise.reducer;