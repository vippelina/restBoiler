import {model, Schema} from 'mongoose';

const AccountSchema: Schema = new Schema({
    email: String
})

export default model('Account', AccountSchema)