import express from "express";
import mongoose from 'mongoose';
import checkAuth from "./middleware/checkAuth.js";
import multer from "multer";
import cors from 'cors';
import fs from 'fs';
import { getMe, login, register } from "./controllers/UserController.js";
import { loginValidation, registerValidation } from "./validations.js";
import { getAllProducts, getProductByCategory, getSingleProduct } from "./controllers/ProductController.js";
import handleValidationErrors from "./middleware/handleValidationErrors.js";

mongoose
    .connect('mongodb+srv://nargiz:123@brandyol.fip5eju.mongodb.net/products?retryWrites=true&w=majority')
    .then(() => console.log("DB ok"))
    .catch(err => console.log('DB error', err))
const app = express()

app.use(express.json())
app.use(cors());
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads');
        }
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
})

const upload = multer({ storage })
app.post("/upload", checkAuth, upload.single("file"), (req, res) => {
    res.status(200).json({
        url: `uploads/${req.file.originalname}`
    });
});

// AUTH
app.get("/auth/me", checkAuth, getMe)
app.post("/auth/login", loginValidation, handleValidationErrors, login)
app.post("/auth/register", registerValidation, handleValidationErrors, register)

// PRODUCTS
// app.get("/products", getAllProducts)
// app.get("/products/:id", getSingleProduct)
app.get("/products", getProductByCategory)

app.listen(process.env.PORT || 4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log("SERVER OK");
})
