import express from 'express';
import mongoose from 'mongoose';
import router from './routes/user-routes.js';
import blogRouter from './routes/blog-routes.js';

const app = express();
app.use(express.json())

app.use("/api/user", router);
app.use("/api/blog", blogRouter);

mongoose.
    connect(
        'mongodb+srv://dpakenham:Obsidian1989!@blogcluster.k1qgbm2.mongodb.net/Blog?retryWrites=true&w=majority'
    ).then(() => app.listen(8000)).then(() => console.log("Connected!"))
    .catch((error) => console.log(error));


