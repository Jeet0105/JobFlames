import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/JobSeeker.route.js";
import companyRouter from "./routes/company.route.js";
import subscriptionRouter from './routes/subscription.route.js';
import applicationRouter from "./routes/Application.router.js";
import zoomRouter from "./routes/zoom.router.js";
import interviewerRouter from "./routes/interviewer.router.js";
import cors from 'cors';
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(cookieParser());


app.use("/api/v1/user", userRouter);
app.use("/api/v1/company",companyRouter);
app.use("/api/v1/subscription",subscriptionRouter);
app.use("/api/v1/application",applicationRouter);
app.use("/api/v1/zoom",zoomRouter);
app.use("/api/v1/interviewer",interviewerRouter);


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});