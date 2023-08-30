const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config()

const UserModels = require('../models/user_models')

const generateJwt = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(payload, process.env.SECRETORPRIVATEKEY, 
      { expiresIn: '1d' },
      
      (err, token) => {
        if(err) {
          reject('Failed to generate token')
        }

        resolve(token)
      }
    )
  })
}

const socketValidateTokent = async (token) => {
  try {
    if (token < 10) {
      return null
    }
  
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
    const user = await UserModels.findById(uid)

    if(user) {
      if(user.status) {
        return user
      }
      
      return null
    }

    return null
  } 
  
  catch (error) {
    
  }
}

module.exports = {
  generateJwt,
  socketValidateTokent
}