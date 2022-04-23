const { model, Schema } = require('mongoose');

const orderItemSchema =  Schema ({
  name : {
    type: String,
    min : [5, 'panjang nama makanan maksimal 5 karakter'],
    required: [ true, ' Name must be fillled']
  },

  price: {
    type: Number,
    required: [ true, 'Harga items harus diisi']
  },


  qty : {
    type: Number,
    min : [1, 'minimal qty adalah 1'],
    required: [ true, ' qty Harus Diisi']
  },

  order : {
    type: Schema.Types.ObjectId,
    ref: 'Order'
  },

  product : {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }
});

module.exports = model('OrderItem', orderItemSchema );