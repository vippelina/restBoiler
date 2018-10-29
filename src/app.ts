import dotenv from 'dotenv'
dotenv.config()
import express, { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import { MONGODB_URI } from './util/secrets'
import path from 'path'
import bodyParser from 'body-parser'
import indexRoute from './routes';
// Create express server
const app = express()

//omit deprecation errors
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
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


const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log("err name", err.name, err.code);
    const isMongoBadInputError = err.name === 'ValidationError' || err.code === 11000
    const statusCode = isMongoBadInputError ? 400 : 500;
    res.status(statusCode)
    const hideErrorMessage = process.env.NODE_ENV === 'production' && statusCode === 500
    if(!hideErrorMessage) return res.send(err.message)
    res.send()
}
app.use(errorHandler);
export default app  