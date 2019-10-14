
const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=> {
    try{
        const token = req.cookies.auth;

        if(token.length<0){
            return res.status(401).json({
                error: true,
                message: 'oga no token detected in cookie'
            })
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decode)=>{
            if(err){
                return res.status(401).json({
                    error: true,
                    message: 'Invalid token passed'
                });
            }
            console.log('response from jwt decode', decode);
            req.token = decode.userID;
            next();
        });
    }
    catch(error){
        return res.status(401).json({
            error: true,
            message: 'Invalid token passed'
        });
    }
}