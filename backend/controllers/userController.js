const asyncHandler = require("express-async-handler");

/* TEMP array to store users
 CHANGE to mongoDB model schema */
const users = [];

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
    

    /* Check if the user with the same email is already registered,
    find in array for test. 
    Change to mongoDB later:
    const userAvailale = await users.findOne( { email }); */
    const userAvailale = users.find(user => user.email === email);
    if (userAvailale) {
        res.status(400);
        throw new Error("The user is already registered");
    };

    /* 
    function to hash password
    LATER to implement
    And save hashedPassword for new user
    for mongoDB:
    const user = await User.create({ username, email, password: hashedPassword });
    */

    const newUser = { username, email, password};
    users.push(newUser);

    console.log("User created:", newUser);
    if (newUser) {
        res.status(201).json({ message: "The user is sucessfully registered", email: newUser.email });
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
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory.");
    };

    /* for db use findOne()
    */
    const user = users.find(user => user.email === email);

    /* compare hashedPassword with stored in db
    Add function to generate access token
    */
    
    if (user && user.password === password) {
        console.log("Login is succesfull");
        res.status(200).json({ message: "access token is here"});
    } else {
        res.status(401);
        throw new Error("Email or password is not correct.");
    };
});

module.exports = { registerUser, loginUser };