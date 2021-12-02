const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error')

const authMiddleWare = async (req,res,next) => {
    const authHeader = req.headers.authorization;
    console.log(req.headers)
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new CustomAPIError('false token',401)
    }

    const token = authHeader.split(' ')[1]
    
    
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const {userName} = decoded;
        req.user = {userName};
    next();
}

module.exports = {
    authMiddleWare
}