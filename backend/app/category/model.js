const mongoose = require('mongoose')
const {model, Schema} = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const categorySchema = Schema({
    ct_id: {
        type: Number,
        unique: true
    },
    ct_code: {
        type: String,
        required: [true, "category code wajib di isi"]
    },
    ct_name: {
        type: String,
        required: [true, "category nama wajib di isi"]
    },

},{ timestamps: { createdAt: 'ct_created_at', updatedAt: 'ct_updated_at' } });

categorySchema.plugin(AutoIncrement, {inc_field: 'ct_id'});

module.exports = model('Category', categorySchema);