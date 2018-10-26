import { Router, Request, Response, NextFunction } from 'express';
import {Model, Document} from 'mongoose'
export default class CrudRoute {
    public router: Router
    public model: Model<Document>
    constructor(model: Model<Document>) {
        this.router = Router()
        this.model = model
        this.list = this.list.bind(this);
        this.setupRoutes()  
    }

    public list(req: Request, res: Response, next: NextFunction) {
        return this.model.find()
        .then(docs => {
            res.send(docs);
        })
        .catch((err: Error) => {
            console.log("got err", err);
        })
    }

    public setupRoutes() {
        this.router.get('/', this.list);
    }
}