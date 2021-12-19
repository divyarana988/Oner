const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

//create a product -- admin work
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(200).json({
        success: true,
        product
    })
})


//get all products
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 5;
    const productCount = await Product.countDocuments();

    //add here search().filter().pagination()
    const apiFeature = new ApiFeatures(Product.find(), req.query)
     
    const products = await apiFeature.query;

    res.status(200).json({
      success: true,
      products
    });
})

//update  product  -- admin work
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {

    let product = Product.findById(req.params.id);

    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
})

//delete a product --admin work
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(500).json({
        success: false,
        message: "Product not found",
      });
    }

    await product.remove();
    res.status(200).json({
        success: true,
        message: "Product delete successfully"
    })
})


//get products deatils
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        product,
       //add here productCount
    });
})