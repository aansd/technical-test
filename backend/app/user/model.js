const mongoose = require('mongoose');
const {model, Schema} = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt = require('bcrypt');

let userSchema = Schema({
    us_id: {
        type: Number,
        unique: true
    },
    us_name: {
        type: String,
        required: [true, "nama user wajib di isi"]
    },
    us_password: {
        type: String,
        required: [true, "password wajib di isi"]
    },
    us_email: {
        type: String,
        required: [true, "email wajib di isi"]
    },
    us_phone_number: {
        type: Number,
        required: [true, "No telpon wajib di isi"]
    },
    us_address: {
        type: String,
        required: [true, "alamat wajib di isi"]
    },

    token:[String]

}, { timestamps: { createdAt: 'us_created_at', updatedAt: 'us_updated_at' } });

userSchema.path('us_email').validate(function(value){
    const EMAIL_RE = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return EMAIL_RE.test(value);
}, attr => `${attr.value} harus merupakan email yang valid!`);

userSchema.path('us_email').validate(async function(value){
    try{
        const count =  await this.model('User').countDocuments({email: value});
        return !count;
    }catch(err){
        throw err
    }
}, attr => `${attr.value} email sudah terdaftar`);

const HASH_ROUND = 10;
userSchema.pre('save', function(next){
    this.us_password = bcrypt.hashSync(this.us_password, HASH_ROUND);
    next();
});

userSchema.plugin(AutoIncrement, {inc_field: 'us_id'});

module.exports = model('User', userSchema);
