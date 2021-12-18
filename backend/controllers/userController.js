const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");


//register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name, email, password, avatar: {
            public_id: "this is a sample id",
            url: "profilePicUrl"
        },
    });

    const token = user.getJWTToken();

    res.status(201).json({
        success: true,
        user,
    });
});


exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));
    }
    const user = User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = user.comparePassword();

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }
});

