import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from "../servicesAPI";

export const fetchLogin = createAsyncThunk("users/fetchLogin",
    async (params) => {
        const { data } = await Axios.post("/auth/login", params)
        console.log(data);
        return data
    }
)

export const fetchRegister = createAsyncThunk("users/fetchRegister",
    async (params) => {
        const { data } = await Axios.post("/auth/register", params)
        return data
    }
)

export const fetchMe = createAsyncThunk("users/fetchMe",
    async () => {
        const { data } = await Axios.get("/auth/me")
        return data
    }
)

const initialState = {
    status: 'loading',
    isAuthorized: false,
    user: null
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthorized = false
            window.localStorage.removeItem('token')
        }
    },
    extraReducers: {
        [fetchLogin.pending]: (state) => {
            state.user = null
            state.status = 'loading'
        },
        [fetchLogin.fulfilled]: (state, { payload }) => {
            state.status = 'loaded'
            state.user = payload
            state.isAuthorized = true
        },
        [fetchLogin.rejected]: (state, { payload }) => {
            state.status = 'error'
            state.user = null
        },
        [fetchRegister.pending]: (state) => {
            state.user = null
            state.status = 'loading'
        },
        [fetchRegister.fulfilled]: (state, { payload }) => {
            state.status = 'loaded'
            state.user = payload
            state.isAuthorized = true
        },
        [fetchRegister.rejected]: (state, { payload }) => {
            state.status = 'error'
            state.user = null
        },
        [fetchMe.pending]: (state) => {
            state.user = null
            state.status = 'loading'
        },
        [fetchMe.fulfilled]: (state, { payload }) => {
            state.status = 'loaded'
            state.user = payload
            state.isAuthorized = true
        },
        [fetchMe.rejected]: (state, action) => {
            console.log(action.error);
            state.status = 'error'
            state.user = null
        }
    }
})

export const { logout } = userSlice.actions

export default userSlice.reducer
