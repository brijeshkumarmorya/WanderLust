const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const dbUrl = process.env.ATLAS_DB_URL;
async function connectDB() {
    try {
        await mongoose.connect(dbUrl, {
            tls: true,
        });
        console.log("✅ MongoDB connection successful");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err.message);
        process.exit(1); // Exit the app if DB connection fails
    }
}
connectDB();

const initDb = async () => {
    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: "6862960877f231b9fe5b34ab",
    }));
    await Listing.insertMany(initData.data);
};

initDb();
