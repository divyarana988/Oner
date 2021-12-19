const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

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
        token
    })
});

//login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));
    }

    //then find user in database
    const user = User.findOne({ email }).select("+password");

    //if user is not found
    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    console.log("reached");
    //check if password entered is correct and matches with saved in database.
    const isPasswordMatched = await User.comparePassword(password);

    console.log(isPasswordMatched);


    //if password does not match
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const token = User.ge
     res.status(200).json({
         success: true,
       token,
     });
});


//log out
exports.logOut = catchAsyncErrors(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: "logged out"
    });
})

