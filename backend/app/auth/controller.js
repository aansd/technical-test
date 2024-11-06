const User = require('../user/model');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');
const {getToken} = require('../../utils');


const register = async (req, res, next) => {
    try{
         const payload = req.body;
         let user = new User(payload);
         await user.save();
         return res.json({
            success: true,
            message: "Register successflly!",
            user: user,
            "token": "Jwt-token" 
         });
    }catch(err){
        if(err && err.name === 'ValidationError'){
            return res.json({
                error: 500  ,
                message: err.message,
                fields: err.errors
            });
        }
        next(err);
    }
}

const localStrategy = async (us_email, us_password, done) => {
    try{
        let user = 
        await User
        .findOne({us_email: us_email})
        .select('-__V -us_created_at -us_updated_at -token');
        if(!user) return done();
        if(bcrypt.compareSync(us_password, user.us_password)){
            ( {us_password, ...userWithoutPassword} = user.toJSON());
            return done(null, userWithoutPassword);
        }
    }catch(err){
        done(err, null);
    }
   done();
}

const login = async (req, res, next) => {
    passport.authenticate('local', async function(err, user) {
        if(err) return next(err);

        if(!user) return res.json({error: 500, message: 'Email or password incorect'});

        let signed = jwt.sign(user, config.secretKey);

        await User.findByIdAndUpdate(user._id, {$push: {token: signed}});

        res.json({
            success: true,
            message: 'Login Successfully',
            user,
            token: signed
        })
    })(req, res, next);
}

const logout = async (req, res, next) => {
    let token = getToken(req);
    if(!token) {
        return res.json({
            error: 500,
            message: 'Token tidak di temukan'
        });
    }

    let user = await User.findOneAndUpdate(
        {token: {$in: [token]}},
        {$pull: {token: token}},
        {useFindAndModify: false}
    );

    if(!user){
        return res.json({
            error: 404,
            message: "Pengguna  tidak di temukan"
        });
    }
    return res.json({
        success: 200,
        message: 'logout berhasil'
    });
}

const index = (req, res, next) => {
    if (!req.user) {
        return res.json({
            error: 404,
            message: `You're not logged in or the token has expired`
        });
    }
    res.json({
        success: true,
        message: 'Access granted',
        user: req.user
    });
}

const addUser = async (req, res, next) => {
    try{
        let user1 = new User({
            us_id: 1,
            us_name: "johan",
            us_email: "johan@mail.com",
            us_password: "12345",
            us_phone_number: 8123456789,
            us_address: "jalan kembangkitan"
        });

        let user2 = new User({
            us_id: 2,
            us_name: "fani",
            us_email: "fani@mail.com",
            us_password: "12345",
            us_phone_number: 8123456789,
            us_address: "jalan abadi"
        });
        await user1.save();
        await user2.save();

        res.json([user1, user2]);
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
    register,
    localStrategy,
    login,
    logout,
    index,
    addUser
}