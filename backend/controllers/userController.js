const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Helper to generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

// Register a user
// @route POST api/users/register
// public access
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    // check for empty fields
    if (!username || !email || !password) {
        return res.status(400).json({message: "All fields are mandatory."})
    }

    // Check if the user with the same email is already registered
    const userAvailale = await User.findOne( { email });
    if (userAvailale) {
        return res.status(400).json({message: "The user is already registered" });
    };

    // Validate password
    const validPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).+$/;
    if (!validPassword.test(password)) {
        return res.status(400).json({ message: "The password should have at least 8 characters, 1 number and 1 upper case letter"});
    };

    /*
    function to hash password
    LATER to implement
    And save hashedPassword for new user
    */
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        last_login: new Date()
     });

    console.log(`User created: ${newUser}`);
    if (newUser) {
        res.status(201).json({
            message: "The user is successfully registered!",
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            token: generateToken(newUser._id),
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
    if (!user) {
    return res
        .status(401)
        .json({ message: "Email or password is incorrect. Please try again." });
    }

    /* compare hashedPassword with stored in db
    Add function to generate access token
    */
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
    return res
        .status(401)
        .json({ message: "Email or password is incorrect. Please try again." });
    }

    // Update last login
    user.last_login = new Date();
    await user.save();

    res.status(200).json({
        message: "Login successful",
        user: {
            _id: user._id,
            email: user.email,
            username: user.username,
        },
        token: generateToken(user._id),
    });
});
module.exports = { registerUser, loginUser };
