import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
    {
        category: {
            type: String,
            trim: true,
            maxlength: 20,
        },
    }
);

export default mongoose.model('Category', CategorySchema);
