const jwt = require('jsonwebtoken');
const UserModel = require('../models/user_models');

const validateJwt = async (req, res, next) => {
  const token = req.header('auth_token');

  if(!token) {
    return res.status(401).json({
      msg: 'You must send a valid token in the request'
    })
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    
    req.uid = uid

    const user = await UserModel.findById(uid);
    
    if(!user) {
      return res.status(400).json({
        msg: 'User no found - TOKEN'
      })
    }
    
    if(!user.status) {
      return res.status(401).json({
        msg: 'User status = false'
      })
    }

    req.userAuth = user;

    next()
  } 
  
  catch (err) {
    console.log(err)  
    res.status(401).json({
      msg: 'Invalid token'
    })
  }
}

module.exports = {
  validateJwt
}