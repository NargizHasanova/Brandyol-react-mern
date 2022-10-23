import mongoose from 'mongoose';

const HotsalesSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            trim: true,
            maxlength: 20,
        },
        desc: {
            type: String,
            trim: true,
            maxlength: 40,
        },
        img: {
            type: String,
            // default: "https://media.gq.com/photos/622902db43716a8f1697bc58/master/pass/cheap-clothes.jpg",
        },
    }
);

export default mongoose.model('Hotsales', HotsalesSchema);
