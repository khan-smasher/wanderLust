import dotenv from "dotenv";
import connectDB from "./src/db/index.js";
import seedListingsData from "./data-initialization/index.js";

dotenv.config();

connectDB()
  .then(async () => {
    await seedListingsData();
    process.exit(0);
  })
  .catch((err) => {
    console.error("Failed to seed DB:", err);
    process.exit(1);
  });
