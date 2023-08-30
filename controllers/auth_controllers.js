const bcryptjs = require('bcryptjs');
const UserModel = require('../models/user_models');

// functions helpers
const { generateJwt } = require('../helpers/generate_jwt');
const { googleVerify } = require('../helpers/google_verify');

const authPost = async (req, res) => {
  try {
    const { email, password } = req.body
    
    const user = await UserModel.findOne({ email });
    
    if(!user) {
      return res.status(400).json({
        msg: 'Incorrect User/password - email'
      })
    }

    if(!user.status) {
      return res.status(400).json({
        msg: 'Incorrect User/ Password - Email - Status = false'  
      })
    }
    
    const isPassword = bcryptjs.compareSync(password, user.password)
    
    if(!isPassword) {
      return res.status(400).json({
        msg: 'Incorrect User / - Password '  
      })
    }

    const token = await generateJwt(user._id)

    res.status(400).json({
      token
    })
  } 
  
  catch (err) {
    console.log(err)
    res.status(500).json({
      msg: 'Internal server error'
    })
  }
}

const googleSingIng = async (req, res) => {
  try {
    const { id_token } = req.body

    const { email, name, img } = googleVerify(id_token);
    const user = UserModel.findOne({ email })
    
    if(!user) {
      const data = {
        email,
        name,
        img,
        google: true,
        password: 'password test'
      }

      const user = new UserModel(data)
      await user.save()
    }
  
    if(!user.status) {
      return res.status(400).json({
        msg: 'The user has been blocked'
      })
    }
    
    const token = await generateJwt(user.id)
  
    res.json({
      msg: 'auth google',
      token,
      user
    })  
  } 
  
  catch (err) {
    console.log(err)
    res.status(500).json({
      msg: "El token de google no es valido"
    })
  }
}

const renewToken = async (req, res) => {
  const user = req.userAuth;

  const token = await generateJwt(user._id)

  res.json({
    user,
    token
  })
}

module.exports = {
  authPost,
  renewToken,
  googleSingIng
}