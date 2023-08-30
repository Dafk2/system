const UserModel = require('../models/user_models');
const CategoryModel = require('../models/category_models');
const Role = require('../models/role');
const ProducModel = require('../models/product_models')

const validationEmail = async (email = '') => {
  const user = await UserModel.findOne({ email });

  if(user) {
    throw new Error(`The email ${email} already exists`)
  }
}

const validationName = async (name = '') => {
  name = name.toUpperCase()
  const product = await ProducModel.findOne({ name })
  
  if(product) {
    throw new Error(`The product with name (${name}) already exists`)  
  }
}

const validationId = async (id) => {
  const user = await UserModel.findById(id)

  if(!user) {
    throw new Error(`The user with the id ${id} not exist`)
  };
}

const idCategoryValidator = async (id) => {
  const category = await CategoryModel.findById(id) 

  if(!category) {
    throw new Error(`Not exits category with id (${id}) in the db`)
  }
}

const idProductValidator = async (id) => {
  const product = await ProducModel.findById(id) 

  if(!product) {
    throw new Error(`Not exits product with id (${id}) in the db`)
  }
}

const validationRole = async (role = 'USER_ROLE') => {
  const roles = await Role.findOne({ role })

  if(!roles) {
    throw new Error(`Not exits role (${role}) in the db`)
  }
}

module.exports =  {
  validationEmail,
  validationId,
  validationRole,
  idCategoryValidator,
  validationName,
  idProductValidator
}