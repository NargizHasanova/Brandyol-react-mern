import mongoose from 'mongoose';

const PriceSchema = new mongoose.Schema(
    {
        price: {
            type: Number,
        },
        selected: {
            type: Boolean,
            default: false
        },
    }
);

export default mongoose.model('Price', PriceSchema);
