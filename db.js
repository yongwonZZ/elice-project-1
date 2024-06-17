const mongoose = require("mongoose");
require('dotenv').config()


const uri = process.env.DB_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });

        console.log("MongoDB Connected...");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
