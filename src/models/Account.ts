import {model, Schema} from 'mongoose';

const AccountSchema: Schema = new Schema({
    email: {
        type: String,
        trim: true,
        validate: function(email: string) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
        }
    }
})

export default model('Account', AccountSchema)