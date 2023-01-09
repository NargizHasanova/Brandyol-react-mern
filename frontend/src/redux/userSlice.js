import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from "../servicesAPI";

export const fetchLogin = createAsyncThunk("users/fetchLogin",
    async (params) => {
        const { data } = await Axios.post("/auth/login", params)
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
        console.log('fetchMe');
        return data // user qayidir
    }
)

export const likeProduct = createAsyncThunk("user/fetchLikes",
    async ({ userId, product }) => { // params = { userId, product }
        const { data } = await Axios.post(`/addFav/${userId}`, product)
        return data
    }
)

const initialState = {
    status: 'loading',
    isAuthorized: null,
    user: null,
    favoriteBox: [],
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthorized = null
            window.localStorage.removeItem('token')
        },
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
            state.isAuthorized = false
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
            state.isAuthorized = false
        },
        [fetchMe.pending]: (state) => {
            state.user = null
            state.status = 'loading'
        },
        [fetchMe.fulfilled]: (state, { payload }) => {
            state.status = 'loaded'
            state.user = payload
            state.isAuthorized = true
            state.favoriteBox = payload.favorites // new
        },
        [fetchMe.rejected]: (state, action) => {
            console.log(action.error);
            state.status = 'error'
            state.user = null
        },
        [likeProduct.pending]: (state) => {
            state.user = null
            state.status = 'loading'
        },
        [likeProduct.fulfilled]: (state, { payload }) => {
            state.favoriteBox = payload.favorites
        },
        [likeProduct.rejected]: (state, action) => {
            console.log(action.error);
            state.error = action.error.message
        },
    }
})

export const { logout } = userSlice.actions

export default userSlice.reducer
