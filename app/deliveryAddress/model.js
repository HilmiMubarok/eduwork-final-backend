const { model, Schema } = require('mongoose');

const deliveryAdressSchema =  Schema ({
  name : {
    type: String,
    max : [255, 'panjang nama alamat maksimal 255 karakter'],
    required: [ true, ' Nama Alamat Harus Diisi']
  },

  kelurahan : {
    type: String,
    max : [255, 'panjang nama kelurahan maksimal 255 karakter'],
    required: [ true, ' Nama Kelurahan Harus Diisi']
  },

  kecamatan : {
    type: String,
    max : [255, 'panjang nama kecamatan maksimal 255 karakter'],
    required: [ true, ' Nama kecamatan Harus Diisi']
  },

  kabupaten : {
    type: String,
    max : [255, 'panjang nama kabupaten maksimal 255 karakter'],
    required: [ true, ' Nama Kabupaten Harus Diisi']
  },

  provinsi : {
    type: String,
    max : [255, 'panjang nama provinsi maksimal 255 karakter'],
    required: [ true, ' Detail Al Harus Diisi']
  },

  detail : {
    type: String,
    max : [255, 'panjang detail alamat maksimal  255 karakter'],
    required: [ true, ' Nama Kelurahan Harus Diisi']
  },

  user : {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
  
}, {timestamps : true});

module.exports = model('DeliveryAddress', deliveryAdressSchema);