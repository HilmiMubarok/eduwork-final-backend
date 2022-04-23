const Product = require('../product/model');
const CartItem = require('../cart-item/model');

// const store = async(req, res, next ) => {
//   try {

//     let payload = req.body;
//     let user = req.user;
//     let address = new DeliveryAdresss({...payload, user: user._id});

//     await address.save();
//     return res.json(address);
  
//   } catch (err) {
//     if(err && err.name === 'ValidationError') {
//       return res.json({
//         error : 1,
//         message : err.message,
//         fields : err.errors
//       });
//     }
//     next(err);
//   }
// }

//update

const update = async(req, res, next) => {
  try{
    const {items} = req.body;
    const productIds = items.map(item => item.product._id);
    const products = await Product.findById({$id: {$in: productIds}});
    let cartItems = items.map(item => {
      let relatedProduct = products.find(product => product._id.toString() === item.product._id);
      return {
        product : relatedProduct._id,
        price : relatedProduct.price,
        image_url : relatedProduct.image_url,
        name : relatedProduct.name,
        user : req.user._id,
        qty : item.qty
      }
    });

    await CartItem.deleteMany({user: req.user._id});
    await CartItem.bulkWrite(cartItems.map(item => {
      return {
        updateOne: {
          filter: {
            user : req.user._id,
            product : item.product
          },
          update: item,
          upsert : true
        }
      }
    }));

    return res.json(cartItems);

  }catch (err) {
    if(err && err.name === 'ValidationError') {
      return res.json({
        error : 1,
        message : err.message,
        fields : err.errors
      });
    }
    next(err);
  }
}

//insert
const index = async(req, res, next) => {
  try {
    let items = 
    await CartItem 
    .find({user : req.user._id})
    .populate('product');

    return res.json(items);
  }catch (err) {
    if(err && err.name === 'ValidationError') {
      return res.json({
        error : 1,
        message : err.message,
        fields : err.errors
      });
    }
    next(err);
  }
}

// //delete
// const destroy = async (req, res, next) => {
//   try{

//     let {id } =req.params;
//     let address = await DeliveryAdresss.findById(id);
//     let subjectAddress = subject('DeliveryAdresss', { ...address, user_id: address.user});
//     let policy = policyFor(req.user);
//     if(!policy.can('delete', subjectAddress)){
//       return res.json({
//         error : 1,
//         message: `You're not allowed to delete this resource`
//       });
//     }

//   address = await DeliveryAdresss.findByIdAndDelete(id);
//   return res.json(address);
//   }catch (err) {
//     if(err && err.name === 'ValidationError') {
//       return res.json({
//         error : 1,
//         message : err.message,
//         fields : err.errors
//       });
//     }
//     next(err);
//   }
// }
module.exports = {
  // store,
  index,
  update
  // destroy
}