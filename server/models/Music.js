const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name:{type: String},
    album:{type:String},
    musicAddress:{type:String}
})

module.exports = mongoose.model('Music',schema)