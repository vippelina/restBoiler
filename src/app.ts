import express, { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import { MONGODB_URI } from './util/secrets'
import path from 'path'
import bodyParser from 'body-parser'
import indexRoute from './routes';
// Create express server
const app = express()

mongoose.set('useFindAndModify', false);
//Connect to mongo
mongoose.connect(MONGODB_URI, {useNewUrlParser: true}).then(() => {
    //  
})
.catch((err: Error) => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit(0);
})

app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    express.static(path.join(__dirname, "../public"))
);
app.use('/', indexRoute);

export default app  