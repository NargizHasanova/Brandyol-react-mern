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
    isAuthorized: false,
    user: null,
    favoriteBox: [],
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthorized = false
            window.localStorage.removeItem('token')
        },
        handleFavs: (state, { payload }) => {
            console.log(payload);
            if (payload.hasLiked === true) {
                state.favoriteBox = state.favoriteBox.filter((item) => item._id !== payload.product._id)
                console.log('if');
            } else {
                console.log('else yeni elave olubur');
                console.log(payload.product);

                state.favoriteBox = [...state.favoriteBox, payload.product]
            }
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
            console.log("mubarekdi");
            // state.favoriteBox = payload.favorites
        },
        [likeProduct.rejected]: (state, action) => {
            console.log(action.error);
            state.error = action.error.message
        },
    }
})

export const { logout, handleFavs } = userSlice.actions

export default userSlice.reducer
