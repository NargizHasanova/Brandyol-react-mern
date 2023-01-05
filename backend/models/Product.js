import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
            maxlength: 20,
        },
        brand: {
            type: String,
            required: true,
            trim: true,
            maxlength: 20,
        },
        gender: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
        },
        price: {
            type: Number,
        },
        selected: {
            type: Boolean,
            default: false
        },
        size: String,
        color: String,
        count: {
            type: Number,
            default: 1
        },
        // user: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'User',
        //     required: true,
        // },
        images: {
            type: Array,
            required: true
        }
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Product', ProductSchema);