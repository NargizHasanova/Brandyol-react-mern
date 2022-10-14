import ProductModel from '../models/Product.js'
import CategoryModel from '../models/Category.js'
import BrandModel from '../models/Brand.js'

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

//GET PRODUCT BY CATEGORY
// export const getFilteredProducts = async (req, res) => {
//     // http://localhost:4444/products?cat=Jeans&brand=Mavi

//     try {
//         const filteredProducts = await ProductModel.find({ category: req.query.cat, brand: req.query.brand })
//         return res.json(filteredProducts)
//     } catch (err) {
//         return res.status(500).json({
//             message: 'could not get product by category',
//             error: err.message,
//         })
//     }
// }
// NEW
export const searchByQueryType = async (req, res) => {
    // http://localhost:4444/search?cat=Jeans&brand=Mavi,Bershka
    try {
        const category = req.query.cat
        // const brand = req.query.brand || null // "Mavi,Bershka"
        const brand = { $in: req.query.brand.split(",") }

        const filterRes = await ProductModel.find({ category: category, brand: brand })

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