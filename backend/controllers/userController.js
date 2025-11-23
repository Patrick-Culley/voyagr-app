const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

// Register a user
// @route POST api/users/register
// public access
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    // check for empty fields
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    // Check if the user with the same email is already registered
    const userAvailable = await User.findOne( { email });
    if (userAvailable) {
        res.status(400);
        throw new Error("The user is already registered");
    };

    const passHash = await argon2.hash(password)

    const newUser = await User.create({
        username,
        email,
        password: passHash,
        last_login: new Date()
     });

    console.log(`User created: ${newUser}`);
    if (newUser) {
        res.status(201).json({
            message: "The user is successfully registered!",
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email
         });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    };
});

// Login user
// @route POST api/users/login
// public access
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log("Login Attempt:", email);
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory.");
        // res.status(400).json({message: "All fields are mandatory."})
    };

    const user = await User.findOne({ email });

     // invalid login info check
    if (!user) {
        res.status(401);
        throw new Error("Invalid email/username or password.");
    };

    // verify password, retrieves hashed password
    const validPass = await argon2.verify(user.password, password);
    console.log("Valid password:", validPass);

    if (validPass) {
        
        // token creation for secure login
        const token = jwt.sign({
            userId: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "15m"}
        );
        
        // authentication token
        // http only where JS cant access cookie
        // secure only sends cookies over HTTPS in production
        // samesite controls cross site requests
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 15 * 60 * 1000,
        });
        console.log("Login is successful");

        // update last login
        user.last_login = new Date();
        await user.save();

        res.status(200).json({
            message: "Login is successful",
            user: {
                _id: user._id,
                email: user.email,
                username: user.username,
                },
            });
    } else {
        res.status(401);
        throw new Error("Email or password is not correct.");
        // res.status(401).json({
        //     message: "Email or password is incorrect. Please try again."
        // });
    }
});

// logs out user
// POST api/users/logout
const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });
    res.json({message: "Successfully logged out user."});
});


module.exports = { registerUser, loginUser, logoutUser };