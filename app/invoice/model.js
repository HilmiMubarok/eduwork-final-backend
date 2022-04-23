const mongoose = require('mongoose');
const {Schema, model} = mongoose;



const invoiceSchema = Schema ({
  sub_total : {
    type : Number,
    required: [true, 'sub_total harus diisi']
  },

 delivery_fee: {
    type : Number,
    default : 0
  },

  delivery_address : {
    provinsi : {type: String, required: [true, 'provinsi harus diisi']},
    kabupaten : {type: String, required: [true, 'kabupaten harus diisi']},
    kecamatan : {type: String, required: [true, 'kecamatan harus diisi']},
    kelurahan: {type: String, required: [true, 'kelurahan harus diisi']},
    detail : {type: String}
  }, 

  total : {
    type : Number,
    required: [true, 'total harus diisi']
  },

  payment_status : {
    type : String,
    enum : ['waiting_payment', 'paid'],
    default : 'waiting_payment'
  },

  user : {
    type : Schema.Types.ObjectId,
    ref : 'User'
  },

  order : {
    type : Schema.Types.ObjectId, 
    ref : 'Order'}
  
}, {timestamps: true});

module.exports = model('Invoice', invoiceSchema);