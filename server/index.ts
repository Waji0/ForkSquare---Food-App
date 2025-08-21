import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoute from "./routes/userRoute";
import restaurantRoute from "./routes/restaurantRoute";
import menuRoute from "./routes/menuRoute";
import orderRoute from "./routes/orderRoute";



dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// default middleware for any mern project
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    // frontend URL 
    // origin: "http://localhost:5173",
    origin: "https://forksquare.vercel.app",    
    credentials: true
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("API is running");
});


//API
app.use("/api/v1/user", userRoute);
app.use("/api/v1/restaurant", restaurantRoute);
app.use("/api/v1/menu", menuRoute);
app.use("/api/v1/order", orderRoute);


app.listen(PORT, () => {
    connectDB();
    // console.log(`Server listen at port ${PORT}`);
});