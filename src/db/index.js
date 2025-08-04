import mongoose from "mongoose";



const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.CLD_DB_URL}`);
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
        console.log(` Using DB: ${connectionInstance.connection.name}`);

        
    } catch (error) {
        console.log("MONGODB connection FAILED:", error);
        process.exit(1)
    }
}

export default connectDB;