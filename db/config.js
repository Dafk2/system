const dotenv = require('dotenv').config()
const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false
    })  

    console.log('successful connection to the database')      
  } 
  
  catch (err) {
    console.log(err)
    throw new Error('connection error')
  }
}

module.exports = dbConnect;