const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username:{type: String},
    password:{type:String
    mongoose.set()},

})

module.exports = mongoose.model('AdminUser',schema)