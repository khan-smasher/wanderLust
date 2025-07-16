import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
dotenv.config({ path: "./.env" });

const port = process.env.PORT || 8080;

connectDB()
  .then(() => {
    // Listen for server-level errors (like port in use)
    app.on("error", (err) => {
      console.error("App error event:", err);
    });

    app.listen(port, () => {
      console.log(`⚙️  Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });
