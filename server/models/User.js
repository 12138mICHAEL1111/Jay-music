const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username:{type: String},
    avataraddress:{type:String},
    likemusic:[{type: mongoose.SchemaTypes.ObjectId, ref: 'Music'}],
    password:{
        type:String,
        set(val){
            return require('bcrypt').hashSync(val,10)
    }
},

})

module.exports = mongoose.model('User',schema)