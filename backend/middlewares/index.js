const {getToken} = require('../utils');
const jwt = require('jsonwebtoken');
const config = require('../app/config');
const User = require('../app/user/model');


function decodeToken() {
    return async function (req, res, next) {
        try{
            let token = getToken(req);
            if(!token){
                return next();
            }
            req.user = jwt.verify(token, config.secretKey);
            let user = await User.findOne({token: {$in: [token]}});

            if(!user){
               return res.json({
                    error: 500,
                    message: 'Token Expired'
                });
            }
        }catch(err){
            if(err && err.name === "JsonWebTokenError"){
                return res.json({
                    error: 404,
                    message: err.message
                });
            }
            next(err);
        }
        return next();
    }
}

module.exports = {
    decodeToken
}