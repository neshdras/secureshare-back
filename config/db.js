const mongoose = require('mongoose')

const dbURI = process.env.MONGODB_URI

//
mongoose.connect(dbURI)
    .then(() => console.log("Successfully connected to MongoDB!"))
    .catch(err => console.log("Error connecting to MongoDB :", err))


//Exports de mongoose
module.exports = mongoose.connection