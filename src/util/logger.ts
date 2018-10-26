import winston from 'winston'
import {ENVIRONMENT} from './secrets'

// inspiration
// https://github.com/Microsoft/TypeScript-Node-Starter/blob/master/src/util/logger.ts
const logger = winston.createLogger({
    transports: [
        new (winston.transports.Console)({
            level: process.env.NODE_ENV === 'production' ? "error" : "debug"
        }),
        new (winston.transports.File)({filename: "debug.log", level: "debug"})
    ]
})

export default logger