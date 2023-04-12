import express from 'express';
import mongoose from 'mongoose';
import router from './routes/user-routes.js';


const app = express();


app.use("/api/user", router);

mongoose.
    connect(
        'mongodb+srv://dpakenham:Obsidian1989!@blogcluster.k1qgbm2.mongodb.net/Blog?retryWrites=true&w=majority'
    ).then(() => app.listen(8000)).then(() => console.log("Connected!"))
    .catch((error) => console.log(error));


