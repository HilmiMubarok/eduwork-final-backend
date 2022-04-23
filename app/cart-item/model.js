const { model, Schema } = require('mongoose');

const cartItemSchema =  Schema ({
  name : {
    type: String,
    min : [5, 'panjang nama makanan maksimal 5 karakter'],
    required: [ true, ' Name must be fillled']
  },

  qty : {
    type: Number,
    min : [1, 'minimal qty adalah 1'],
    required: [ true, ' qty Harus Diisi']
  },

  price: {
    type: Number,
    default : 0
  },

  image_url :  String,

  user : {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  product : {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }
});

module.exports = model('CartItem', cartItemSchema );