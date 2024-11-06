const mongoose = require('mongoose');
const {model, Schema} = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const orderSchema = Schema({
    or_id: {
        type: Number,
        unique: true
    },
    or_pd_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    or_amount: {
        type: Number,
        required: [true, "amount wajib di isi"],
        minLength: [1, "minimal amount 1"]
    },
}, { timestamps: { createdAt: 'or_created_at', updatedAt: 'or_updated_at' } });

orderSchema.plugin(AutoIncrement, {inc_field: 'or_id'});

module.exports = model('Order', orderSchema);