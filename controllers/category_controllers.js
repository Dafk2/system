const CategoryModel = require('../models/category_models')

// get all categories
const getCategory = async (req, res) => {
  const { limit = 5, skip = 0 } = req.query

  const [countDocuments, users] = await Promise.all([
    CategoryModel.countDocuments({ status: true }),
    
    CategoryModel.find({ status: true })
    .populate('user', 'name')
    .limit(Number(limit))
    .skip(Number(skip))
  ])

  res.status(200).json({
    countDocuments,
    users
  })
}

const getCategoryId = async (req, res) => {
  const { id } = req.params

  const category = await CategoryModel.findById(id)

  res.status(200).json({
    category
  })
}

const postCategory = async (req, res) => {
  const name = req.body.name.toUpperCase()

  const category = await CategoryModel.findOne({ name })

  if (category) {
    return res.status(400).json({
      msg: 'Category already exists'
    })
  }

  const data = { name, user: req.userAuth._id }
  const categoryModel = new CategoryModel(data)

  await categoryModel.save()

  res.status(200).json({
    categoryModel
  })
}

const putCategory = async (req, res) => {
  const { id } = req.params;
  const { uid, status, _id, user, ...data } = req.body;

  data.name = data.name.toUpperCase()
  data.user = req.userAuth._id

  const userUpdate = await CategoryModel.findByIdAndUpdate(id, data, { new: true })

  res.status(200).json({
    userUpdate
  })
}

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  const user = await CategoryModel.findByIdAndUpdate(id, { status : false })

  res.status(200).json({
    user 
  })
}

module.exports = {
  getCategory,
  getCategoryId,
  postCategory,
  putCategory,
  deleteCategory 
}