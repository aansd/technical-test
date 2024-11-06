const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const productSchema = new mongoose.Schema({
  pd_id: {
    type: Number,
    unique: true
  },
  pd_code: {
    type: String,
    required: [true, 'code wajib di isi']
  },
  pd_ct_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  pd_name: {
    type: String,
    minlength: [3, 'minimal nama 3 karakter'],
    required: [true, 'nama wajib di isi']
  },
  pd_price: {
    type: Number,
    default: 0
  }
}, { timestamps: { createdAt: 'pd_created_at', updatedAt: 'pd_updated_at' } });

productSchema.plugin(AutoIncrement, { inc_field: 'pd_id' });

module.exports = mongoose.model('Product', productSchema);
