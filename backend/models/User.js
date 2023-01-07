import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    favorites: {
        type: Array,
        default: []
    }, // String = post id's
    // add to fav klik zamani already favdisa silirik arraydan,deyise elave edirik arraye
    avatarUrl: String,
},
    {
        timestamps: true
    }
)

export default model("User", UserSchema)