const Order = require('./model');
const mongoose = require('mongoose');

const store = async (req, res, next) => {
    try{
        let order = new Order({
            or_pd_id: req.body.or_pd_id,
            or_amount: req.body.or_amount
        });
        await order.save();
        res.json(order);
    }catch(err){
        if(err && err.name === 'ValidationError'){
            return res.json({
                error: 500,
                message: err.message,
                fields: err.errors
            });
        }
        next(err);
    }
}

const update = async (req, res, next) => {
    try{
        let payload = req.body;
        let order =  await Order.findByIdAndUpdate(req.params.id, payload, {new: true, runValidators: true});
        return res,json(order);
    }catch(err){
        if(err && err.name === 'ValidationError'){
            return res.json({
                error: 500,
                message: err.message,
                fields: err.errors
            });
        }
        next(err);
    }
}

const destroy = async (req, res, next) => {
    try{
        let order = await Order.findByIdAndDelete(req.params.id);
        return res.json(order);
    }catch(err){
        if(err && err.name === 'ValidationError'){
            return res.json({
                error: 500,
                message: err.message,
                fields: err.errors
            });
        }
        next(err);
    }
}

const index = async (req, res, next) => {
    try{
        let order = await Order.find();
        return res.json(order);
    }catch(err){
        if(err && err.name === 'ValidationError'){
            return res.json({
                error: 500,
                message: err.message,
                fields: err.errors
            });
        }
        next(err);
    }
}

const addOrder = async (req, res, next) => {
    try{
        let order1 = new Order({
            or_id: 1,
            or_pd_id: [
               new mongoose.Types.ObjectId(), 
               new mongoose.Types.ObjectId(),
               new mongoose.Types.ObjectId()
            ],
            or_amount: 3 
        });
        let order2 = new Order({
            or_id: 2,
            or_pd_id: [
              new mongoose.Types.ObjectId(),
              new mongoose.Types.ObjectId()
            ],
            or_amount: 2
        });

        await order1.save();
        await order2.save();
        res.json([order1, order2]);
    }catch(err){
        if(err && err.name === 'ValidationError'){
            return res.json({
                error: 500,
                message: err.message,
                fields: err.errors
            });
        }
        next(err);
    }
}
module.exports = {
    store,
    index,
    update,
    destroy,
    addOrder
}