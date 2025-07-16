import express from "express";
import bodyParser from "body-parser";


const app = express();
app.use(express.json());
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true}));



// set base route to /api/v1/users
// app.use("/api/v1/users", userRouter);



// ✅ Global error handler — must come after routes
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    // 👇 Print error in console
    // console.error(`[${new Date().toISOString()}] ${err.stack}`);

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

export { app };
