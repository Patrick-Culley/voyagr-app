const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const path = require("path");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");

connectDb();
const app = express();
const port = process.env.PORT || 5555;
app.use(express.json());

// allow React frontend to access routes
// app.use(cors({ origin: "*" }));
app.use(cors({ origin: "http://localhost:3000" }));

// Routes:
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/experiences", require("./routes/experienceRoutes"));
app.use("/api/trips", require("./routes/tripRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes")); 
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

//app.use(cors({ origin: "http://localhost:3000" }));

// Export app for testing
module.exports = app;