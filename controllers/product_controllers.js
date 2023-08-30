const ProductModels = require('../models/product_models')

const productGet = async (req, res) => {
  const { limit = 5, skip = 0 } = req.query;
  let status = { status : true }
  
  const countProducts = await ProductModels.countDocuments(status)
  const products = await ProductModels.find(status)
  .populate('user', 'name')
  .limit(Number(limit))
  .skip(Number(skip))

  res.json({
    countProducts,
    products
  })
}

const getProductId = async (req, res) => {
  const { id } = req.params;
  const product = await ProductModels.findById(id).populate('user', 'name')

  res.json({
    product
  })
}

const productPost = async  (req, res) => {
  try {
    const { name, description, price, category } = req.body
   
    const data = {
      name: name.toUpperCase(),
      description: description.toUpperCase(),
      price,
      user: req.userAuth._id,
      category
    }
  
    const product = new ProductModels(data)
    await product.save()

    res.json({
      product
    })
  } 
  
  catch (err) {
    console.log(err)     
    res.status(500).json({
      msg:'Internal server error'
    })
  }
}

const productPut = async (req, res) => {
  try {
    const { id } = req.params;
    const { uid, _id, user, status, category, price, avalible, ...data } = req.body;
    
    data.user = req.userAuth._id;
    data.name = data.name.toUpperCase()

    const userUpdate = await ProductModels.findByIdAndUpdate(id, data, { new: true })

    res.json({
      userUpdate
    })
  } 
  
  catch (err) {
    console.log(err)  
    res.status(500)
  }
}

const productDelete = async (req, res) => {
  const { id } = req.params;

  const productDelete = await ProductModels.findByIdAndUpdate(id, { status : false }, { new: true })

  res.json({
    productDelete
  })
}

module.exports = {
  productGet,
  getProductId,  
  productPost,
  productPut,
  productDelete
}

