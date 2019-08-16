
const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=> {
    try{
        const token = req.headers.authorization.split(" ")[1];

        if(!token.length>0){
            return res.status(401).json({
                error: true,
                message: 'Oga you never pass token in header'
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userToken = decoded;
        next();
    }
    catch(error){
        return res.status(401).json({
            error: true,
            message: 'Invalid token passed'
        });
    }
}