const mongoose = require('mongoose')
const debug = require('debug')('myentreo:be:mongo')

const connectDb = async () => {
  try {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_HOST, MONGO_PORT, MONGO_MAIN_DB, MONGO_URI } = process.env
    const mongoUri = MONGO_URI
      ? MONGO_URI + `/${MONGO_MAIN_DB}?authSource=admin`
      : `mongodb://${MONGO_USER && MONGO_USER.length ? `${MONGO_USER}:${MONGO_PASSWORD}@` : ''}` +
        `${MONGO_HOST}:${MONGO_PORT}/${MONGO_MAIN_DB}?authSource=admin`
    
        await mongoose.connect(mongoUri)
        console.log('MongoDB Connected Successfully')
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message)
    process.exit(1)
  }
}

module.exports = connectDb
