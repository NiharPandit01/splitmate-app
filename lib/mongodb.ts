import mongoose from "mongoose";

const MONGODB_URI = "mongodb://127.0.0.1:27017/splitmatedb";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.log("MongoDB connection failed", error);
    }
};

export default connectDB;