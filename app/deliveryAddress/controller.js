const { subject } = require('@casl/ability');
const { policyFor } = require('../../utils');
const DeliveryAdresss = require('./model');

const store = async (req, res, next ) => {
  try {

    let payload = req.body;
    let user = req.user;
    let address = new DeliveryAdresss({...payload, user: user._id});

    await address.save();
    return res.json(address);
  
  } catch (err) {
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

//update

const update = async (req, res, next) => {
  try{
    let {_id, ...payload} = req.body;
    let {id } =req.params;
    let address = await DeliveryAdresss.findById(id);
    let subjectAddress = subject('DeliveryAdresss', { ...address, user_id: address.user});

    let policy = policyFor(req.user);
    if(!policy.can('update', subjectAddress)){
      return res.json({
        error : 1,
        message: `You're not allowed to modify this resource`
      });
    }



    address = await DeliveryAdresss.findByIdAndUpdate(id, payload, {new: true});
    return res.json(address);

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
const index = async (req, res, next) => {
  try {
    let {skip=0, limit= 10} = req.query;
    let count = await DeliveryAdresss.find({user: req.user._id}).countDocuments();
    let address = 
      await DeliveryAdress
      .find({user: req.user._id})
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .sort('-createdAt');

      return res.json({data: address, count});
 
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

//delete
const destroy = async (req, res, next) => {
  try{

    let {id } =req.params;
    let address = await DeliveryAdresss.findById(id);
    let subjectAddress = subject('DeliveryAdresss', { ...address, user_id: address.user});
    let policy = policyFor(req.user);
    if(!policy.can('delete', subjectAddress)){
      return res.json({
        error : 1,
        message: `You're not allowed to delete this resource`
      });
    }

  address = await DeliveryAdresss.findByIdAndDelete(id);
  return res.json(address);
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
module.exports = {
  store,
  index,
  update,
  destroy
}