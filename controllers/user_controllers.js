const bcryptjs = require('bcryptjs');
const UserModel = require('../models/user_models');

const getUserId = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById({ _id: id });
  
  res.json({
    user
  })
}

const getUsers = async (req, res) => {
  const { limit, skips } = req.query
  
  const [ users, countsUsers ] = await Promise.all([
    UserModel.find({ status: true })
    .limit(limit)
    .skip(skips),

    UserModel.countDocuments({ stutus: true })
  ]);

  res.json({
    countsUsers,
    users
  })
}

const postUser = async (req, res) => {
  const { email, password, name, role } = req.body;

  const userModel = new UserModel({ email, password, name, role })
  
  const salt = bcryptjs.genSaltSync(10);
  userModel.password = bcryptjs.hashSync(password, salt)

  await userModel.save()

  res.json({
    userModel
  })
}

const putUser = async (req, res) => {
  const { id } = req.params;
  const { __id, __v, password, email, google, ...params } = req.body;

  if(password) {
    const salt = bcryptjs.genSaltSync(15);
    params.password = bcryptjs.hashSync(password, salt)
  }

  if(email) params.email = email;
  
  const newUser = await UserModel.findByIdAndUpdate(id,  params)
      
  res.json({
    newUser
  })
}

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findByIdAndUpdate(id, { status: false })

  res.json({
    user
  })
}

module.exports = {
  getUserId,
  getUsers,
  postUser,
  putUser,
  deleteUser,
}