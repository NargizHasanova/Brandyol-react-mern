import mongoose from 'mongoose';

const PriceSchema = new mongoose.Schema(
    {
        minPrice: {
            type: String,
        },
        maxPrice: {
            type: String,
        },
        selected: {
            type: Boolean,
            default: false
        },
    }
);

export default mongoose.model('Price', PriceSchema);
