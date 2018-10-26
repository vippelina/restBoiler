import dotenv from 'dotenv'
dotenv.config()
import logger from './logger'

export const ENVIRONMENT = process.env.NODE_ENV
export const MONGODB_URI = ENVIRONMENT !== 'production' 
    ? process.env.MONGODB_URI_LOCAL
    : process.env.MONGODB_URI

if (!MONGODB_URI) {
    logger.error("No mongo connection string. Set MONGODB_URI environment variable.");
    process.exit(1);
}