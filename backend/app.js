import express from 'express';
import mongoose from 'mongoose';
import router from './routes/user-routes.js';
import blogRouter from './routes/blog-routes.js';
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


app.use("/api/user", router);
app.use("/api/blog", blogRouter);

mongoose.
    connect(
        process.env.MONGODB_URI
    ).then(() => app.listen(8000)).then(() => console.log("Connected!"))
    .catch((error) => console.log(error));


