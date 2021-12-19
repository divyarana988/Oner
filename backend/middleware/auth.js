const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies;
    
    if (!token) {
        return next(new ErrorHandler("Please login to access this resource", 401));
    }

    const decordedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decordedData.id);
    next();
    
});

exports.authorizedRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 401));
        }
        next();
    };
};