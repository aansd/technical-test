const categories = require('./model');

const store = async (req, res, next) => {
    try{
        let payload = req.body;
        let category = new categories(payload);
        await category.save();
        return res.json(category);
    }catch(err){
        if(err && err.name === 'ValidationError'){
            return res.json({
                error: 1,
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
        let category = await categories.findByIdAndUpdate(req.params.id, payload, {new: true, runValidators: true});
        return res.json(category);
    }catch(err){
        if(err && err.name === 'ValidationError'){
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }
        next(err);
    }
}

const destroy = async (req, res, next) => {
    try{
        category = await categories.findByIdAndDelete(req.params.id);
        return res.json(category);
    }catch(err){
        if(err && err.name === 'ValidationError'){
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }
        next(err);
    }
}

const index = async (req, res, next) => {
    try{
        let category = await categories.find();
        return res.json(category);
    }catch(err){
        if(err && err.name === 'ValidationError'){
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }
        next(err);
    }
}

const addCategory = async (req, res, next) => {
    try{
        let category1 = new categories({
            ct_id: 1,
            ct_code: "C200",
            ct_name: "Perkakas"
        });
        
        let category2 = new categories({
            ct_id: 2,
            ct_code: "C300",
            ct_name: "semen"
        });

        await category1.save();
        await category2.save();
        res.json([category1, category2]);
    }catch(err){
        if(err && err.name === 'ValidationError'){
            return res.json({
                error: 1,
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
    destroy,
    index,
    addCategory
}