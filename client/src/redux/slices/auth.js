import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios';


export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
    console.log("auth login")
    const {data} = await axios.post('/auth/login', params);
    // console.log(data)
    return data;
})

const initialState = {
    data: null,
    status: 'loading',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
            state.status = 'loaded';
        }
    },
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

export const selectIsAuth = state => Boolean(state.auth.data);
export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions