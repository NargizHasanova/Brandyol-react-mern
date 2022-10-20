import mongoose from 'mongoose';

const GenderSchema = new mongoose.Schema(
    {
        gender: {
            type: String,
            trim: true,
            maxlength: 20,
        },
        selected: {
            type: Boolean,
            default: false
        },
    }
);

export default mongoose.model('Gender', GenderSchema);
