import { configureStore } from "@reduxjs/toolkit"
import clothesReducer from "./clothesSlice"
import usersReducer from "./userSlice"

export const store = configureStore({
    reducer: {
        clothes: clothesReducer,
        users: usersReducer
    }
})

