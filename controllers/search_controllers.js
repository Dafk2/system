const { ObjectId } = require('mongoose').Types
const UserModels = require('../models/user_models')
const ProductModels = require('../models/product_models')
const CategoryModels = require('../models/category_models')

// collections in which I can search that I have created
const allowedCollections = [
  'users',
  'products',
  'categories',
]

const searchUsers = async (desc = '', res) => {
  const isMongoId = ObjectId.isValid(desc);

  if(isMongoId) {
    const user = await UserModels.findById(desc);

    return res.json({
      result: user ? [ user ] : [] 
    })
  }

  let regex = new RegExp(desc, 'i')

  const result = await UserModels.find({
    $or: [ { name: regex }, { email: regex } ],
    $and: [ { status: true } ]
  })

  return res.json({
    result: result
  })
}

const searchProducts = async (desc = '', res) => {
  const isMongoId = ObjectId.isValid(desc)

  if(isMongoId) {
    const product = await ProductModels.findById(desc)

    return res.json({
      result: product ? [ product ] : []
    })
  }

  regex = new RegExp(desc, 'i')
  const product = await ProductModels.find({ status: true, name: regex })

  return res.json({
    result: product
  })
}

const searchCategory = async (desc = '', res) => {
  const isMongoId = ObjectId.isValid(desc)

  if(isMongoId) {
    const category = await CategoryModels.findById(desc)

    return res.json({
      result: category ? [ category ] : []
    })
  }

  let regex = new RegExp(desc, 'i')
  const category = await CategoryModels.find({ status: true, name: regex })

  return res.json({
    result: category
  })
}

const searchCollections = (req, res) => {
  const { collection, desc } = req.params;

  if(!allowedCollections.includes(collection)) {
    return res.status(400).json({
      msg: `the collections created are (${allowedCollections})`
    })
  }

  switch (collection) {
    case 'users':
      return searchUsers(desc, res)  
      break;
    
    case 'products':
      return searchProducts(desc, res)  
      break;
    
    case 'categories':
      return searchCategory(desc, res)  
      break;
  
    default:
      break;
  }
}

module.exports = {
  searchCollections
}