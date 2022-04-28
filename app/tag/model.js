const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const tagSchema = new Schema ({

  name : {
    type: String,
    min : [3, 'panjang nama tag minimal 3 karakter'],
    max: [20, 'panjang nama tag max 20 karakter'],
    required: [ true, ' Nama tag Harus Diisi']
  }

});

module.exports = model('Tag', tagSchema);
