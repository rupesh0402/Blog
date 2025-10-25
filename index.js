import express from 'express';
import { configDotenv } from 'dotenv';
import mongoose from "./DBConnection.js";
import appRouter from './app.js';
import path from 'path';
import userRouter from './src/routes/user.js';

configDotenv();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./src/views'));

app.use(express.static(path.resolve('./public')));

//app.use('/', appRouter);

app.get('/', (req, res) => {
    res.render("home");
});

app.use('/user', userRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT || 3000}`);
});

