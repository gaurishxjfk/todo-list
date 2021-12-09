const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error')

const authMiddleWare = async (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        console.error('false token',401)
    }

        const decoded = jwt.verify(authHeader,process.env.JWT_SECRET);
        const {userName} = decoded;
        req.user = {userName};
    next();
}

module.exports = {
    authMiddleWare
}