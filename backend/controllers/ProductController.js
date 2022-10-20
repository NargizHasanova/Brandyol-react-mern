import ProductModel from '../models/Product.js'
import CategoryModel from '../models/Category.js'
import BrandModel from '../models/Brand.js'
import GenderModel from '../models/Gender.js'

//GET ALL PRODUCTS
export const getAllProducts = async (req, res) => {
    try {
        let products = await ProductModel.find()
        return res.json(products)
    } catch (err) {
        return res.status(500).json({
            message: 'could not get all products',
            error: err.message,
        })
    }
}

//GET ALL CATEGORIES
export const getAllCategories = async (req, res) => {
    try {
        let categories = await CategoryModel.find()
        return res.json(categories)
    } catch (err) {
        return res.status(500).json({
            message: 'could not get categories',
            error: err.message,
        })
    }
}

//GET ALL BRANDS
export const getAllBrands = async (req, res) => {
    try {
        let brands = await BrandModel.find()
        return res.json(brands)
    } catch (err) {
        return res.status(500).json({
            message: 'could not get brands',
            error: err.message,
        })
    }
}

//GET ALL GENDERS
export const getAllGenders = async (req, res) => {
    try {
        let genders = await GenderModel.find()
        return res.json(genders)
    } catch (err) {
        return res.status(500).json({
            message: 'could not get genders',
            error: err.message,
        })
    }
}

// NEW
export const searchByQueryType = async (req, res) => {
    // http://localhost:4444/search?cat=Jeans&brand=Mavi,Bershka
    try {
        const category = req.query.cat
        const brand = req.query.brand ? { $in: req.query.brand.split(",") } : null
        const gender = req.query.gender ? { $in: req.query.gender.split(",") } : null
        // const price = req.query.price ? { $in: req.query.price.split(",") } : null

        let filterRes
        // if (brand && gender && price) {
        //     filterRes = await ProductModel.find({ category: category, brand: brand, gender: gender, price: price })
        // }
         if (brand && gender) {
            filterRes = await ProductModel.find({ category: category, brand: brand, gender: gender })
        }
        else if (brand) {
            filterRes = await ProductModel.find({ category: category, brand: brand })
        }
        else if (gender) {
            filterRes = await ProductModel.find({ category: category, gender: gender })
        }
        else {
            filterRes = await ProductModel.find({ category: category })
        }

        return res.json(filterRes)

    } catch (err) {
        return res.status(500).json({
            message: 'try again',
            error: err.message,
        })
    }
}

// GET SINGLE PRODUCT
export const getSingleProduct = async (req, res) => {
    try {
        const postId = req.params.id
        ProductModel.findOneAndUpdate(
            { _id: postId },
            { returnDocument: 'after' },  // verni document tolko posle obnovleniy
            (err, doc) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Product is not found :(',
                    });
                }
                if (!doc) {
                    return res.status(404).json({
                        message: 'Product is not found',
                    });
                }
                return res.json(doc)
            }
        )
    } catch (err) {
        res.status(500).json({
            message: 'Failed to get products',
        });
    }
}