import mongoose from 'mongoose';

const BrandSchema = new mongoose.Schema(
    {
        brand: {
            type: String,
            trim: true,
            maxlength: 20,
        },
    }
);

export default mongoose.model('Brand', BrandSchema);
