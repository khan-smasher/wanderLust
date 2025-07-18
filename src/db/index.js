import mongoose from "mongoose";
import { DB_NAME } from "../constants/index.js";


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
        console.log(` Using DB: ${connectionInstance.connection.name}`);

        
    } catch (error) {
        console.log("MONGODB connection FAILED:", error);
        process.exit(1)
    }
}

export default connectDB;