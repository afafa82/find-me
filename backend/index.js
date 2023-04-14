require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
var cors = require("cors");

// Express Configuration
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.Promise = global.Promise;
mongoose
    .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
    })
    .then(() => {
        console.log("Successfully connected to the database mongoDB Atlas Server");
    })
    .catch((err) => {
        console.log("Could not connect to the database. Exiting now...", err);
        process.exit();
    });

// Routers
const AccommodationRouter = require("./routes/AccommodationRoutes");
const CompanyRouter = require("./routes/CompanyRoutes");
const DealRouter = require("./routes/DealRoutes");
const GuideRouter = require("./routes/GuideRoutes");
const JobRouter = require("./routes/JobRoutes");
const UserRouter = require("./routes/UserRoutes");
const GeneralRouter = require("./routes/GeneralRoutes");
const StatRouter = require("./routes/StatRoutes");
app.use("/api", AccommodationRouter);
app.use("/api", JobRouter);
app.use("/api", CompanyRouter);
app.use("/api", DealRouter);
app.use("/api", GuideRouter);
app.use("/api", UserRouter);
app.use("/api", GeneralRouter);
app.use("/api", StatRouter);

// Server Configuration
app.listen(process.env.port || 5000);
console.log("Web Server is listening at port " + (process.env.port || 5000));
