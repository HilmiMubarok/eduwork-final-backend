const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const categorySchema = new Schema ({

  name : {
    type: String,
    min : [3, 'panjang nama category minimal 3 karakter'],
    max: [20, 'panjang nama makanan max 20 karakter'],
    required: [ true, ' Nama Kategori Harus Diisi']
  }

});

module.exports = model('Category', categorySchema);
