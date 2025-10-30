const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDb = require("./config/dbConnection");

connectDb();
const app = express();
const port = process.env.PORT || 5555;
app.use(express.json());

// allow React frontend to access routes
app.use(cors({ origin: "*" }));

// Routes:
app.use("/api/users", require("./routes/userRoutes"));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

//app.use(cors({ origin: "http://localhost:3000" }));

// Export app for testing
module.exports = app;