const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const productSchema = new Schema ({
  description : {
    type: String,
    max : [1000, ' Panjang Deskripsi maksimal 1000 karakter']
  },

  name : {
    type: String,
    min : [3, 'panjang nama product minimal 3 karakter'],
    required: [ true, ' Nama product Harus Diisi']
  },

  price : {
    type: Number,
    default : 0
  },

  image_url : String,

  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },

  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag'
  }]

}, {timestamps : true});

module.exports = model('Product', productSchema);
