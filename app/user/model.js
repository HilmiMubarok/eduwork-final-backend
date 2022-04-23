const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt = require('bcrypt');

let userSchema = Schema(
	{
		full_name: {
			type: String,
			required: [ true, 'Nama Harus Diisi' ],
			max: [ 255, 'Panjang harus diisi diantara 3 - 225 karakter' ],
			min: [ 3, 'Panjang harus diisi diantara 3 - 225 karakter' ]
		},
		customer_id: {
			type: Number
		},

		email: {
			type: String,
			required: [ true, ' Email harus Diisi' ],
			max: [ 255, 'Panjang harus diisi diantara 3 - 225 karakter' ]
		},

		password: {
			type: String,
			required: [ true, ' password harus Diisi' ],
			max: [ 255, 'Panjang harus diisi diantara 3 - 225 karakter' ]
		},

		role: {
			type: String,
			enum: [ 'user', 'admin' ],
			default: 'user'
		},

		token: [ String ]
	},
	{ timestamps: true }
);

userSchema.path('email').validate(function(value) {
	const EMAIL_RE = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	return EMAIL_RE.test(value);
}, (attr) => `${attr.value} harus merupakan email yang valid`);

userSchema.path('email').validate(async function(value) {
	try {
		// 1. lakukan pencarian _collection_User berdasarkan 'email'

		const count = await this.model('User').count({ email: value });

		// 2. kode ini mengindikasikan bahwa jika user ditemukan akan mengemblikan 'false' jika ditemukan mengembalikan 'true'
		//jika 'false' maka kode gagal
		//jika 'true m' maka kode berhasil

		return !count;
	} catch (err) {
		throw err;
	}
}, (attr) => `${attr.value} email sudah terdaftar`);

const HASH_ROUND = 10;
userSchema.pre('save', function(next) {
	this.password = bcrypt.hashSync(this.password, HASH_ROUND);
	next();
});

userSchema.plugin(AutoIncrement, { inc_field: 'customer_id' });

module.exports = model('User', userSchema);
