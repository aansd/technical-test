const path = require('path');
const fs = require('fs');
const config = require('../config');
const Product = require('./model');
const Category = require('../category/model');
const mongoose = require('mongoose');
const store = async (req, res, next) => {
    try{
        let payload = req.body;
        if(payload.category){
            let category = await Category.findById(payload.ct_name);
            if(category) {
                payload = {...payload, ct_id:category._id};
            }else{
                delete payload.ct_name;
            }
        }
         let product = new Product(payload);
            await product.save();
            return res.json(product);     
    } catch(err){
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
        let {id} = req.params;
        if(payload.category){
            let category = await Category.findOne({name: {$regex: payload, category, $options: 'i'}});
            if(category){
                payload = {...payload, category: category._id};
            }else{
                delete payload.category;
            }
        }

            let product = await Product.findByIdAndUpdate(id, payload, {
                new: true,
                runValidators: true
            });
            return res.json(product);
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
    try {
        let { skip = 0, limit = 10, q = '', category = '' } = req.query;
        let criteria = {};

        // Menambahkan filter pencarian berdasarkan nama produk
        if (q.length) {
            criteria.name = { $regex: q, $options: 'i' };
        }

        // Menambahkan filter berdasarkan ID kategori jika diberikan
        if (category.length) {
            criteria.pd_ct_id = category;
        }

        // Menghitung total dokumen produk berdasarkan kriteria yang diterapkan
        let count = await Product.find(criteria).countDocuments();

        // Mendapatkan produk sesuai kriteria, skip, dan limit
        let product = await Product
            .find(criteria)
            .skip(parseInt(skip))
            .limit(parseInt(limit))
            .populate("pd_ct_id"); // Populate field kategori (pastikan sesuai nama di skema)

        return res.json({
            data: product,
            count
        });
    } catch (err) {
        next(err);
    }
};

const destroy = async (req, res, next) => {
    try{
        let product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        return res.json({
            success: true,
            message: "Product delete successfully!",
            product: product
        });
    }catch(err){
        next(err);
    }
}

const addProduct = async (req, res, next) => {
    try{
        let product1 = new Product({
            pd_id: 1,
            pd_code: "P20",
            pd_ct_id: new mongoose.Types.ObjectId(),
            pd_name: "bangku",
            pd_price: 30000,
        });
        let product2 = new Product({
            pd_id: 1,
            pd_code: "P30",
            pd_ct_id: new mongoose.Types.ObjectId(),
            pd_name: "kursi",
            pd_price: 50000,
        });
        await product1.save();
        await product2.save();
        res.json([product1, product2])
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
    update,
    index,
    destroy,
    addProduct
    
}