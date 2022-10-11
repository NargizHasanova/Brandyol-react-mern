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
        },
        brand: {
            type: String,
            required: true,
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
        favorite: {
            type: Boolean,
            default: false
        },
        images: {
            type: Array,
            required: true
        }
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Post', ProductSchema);