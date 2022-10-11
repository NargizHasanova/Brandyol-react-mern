import ProductModel from '../models/Product.js'

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

//GET PRODUCT BY CATEGORY
export const getProductByCategory = async (req, res) => {
    // http://localhost:4444/products?category="Jeans","Sweater"

    try {      
        const filteredProducts = await ProductModel.find({ category: req.query.category })
        return res.json(filteredProducts)
    } catch (err) {
        return res.status(500).json({
            message: 'could not get product by category',
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