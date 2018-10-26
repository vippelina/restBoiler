import {Router} from 'express'
import CrudRoute from './CrudRoute'
import {
    Account,
} from '../models'
const route: Router = Router()

route.use('/account', new CrudRoute(Account).router)

export default route