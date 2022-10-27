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
    favorite: {
        type: [{ ref: "Product", type: Schema.Types.ObjectId }],
        default: []
    },
    avatarUrl: String,
},
    {
        timestamps: true
    }
)

export default model("User", UserSchema)