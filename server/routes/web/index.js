module.exports = app =>{
    const express = require('express')
    const jwt = require('jsonwebtoken')
    const Music  = require('../../models/Music')
    const User  = require('../../models/User')
    const assert = require('http-assert')
    const router = express.Router({
        mergeParams : true
    })

    router.get("/musics",async(req,res)=>{
        const musics = await Music.find()
        res.send(musics)
    })

    router.post('/signIn',async(req,res)=>{
        const findUser = await User.findOne({username:req.body.username})
        assert(!findUser,422,"用户名已被注册")      
        const model = await User.create(req.body)
        const username = req.body.username
        const currentUser = await User.find({username})
        const token = jwt.sign({
            id: currentUser._id
        }, app.get('secret'))
        const object = {"userToken": token,"name":username}
         res.send(object)
    })

    router.post("/login",async(req,res)=>{
       const input = req.body
       const username = input.username
       const password =input.password
       const findUser = await User.findOne({username})
       assert(findUser,422,"用户不存在")
       const isValid = require('bcrypt').compareSync(password,findUser.password)
        assert(isValid,422,"密码错误")
        
        const token = jwt.sign({
            id: findUser._id
        }, app.get('secret'))
        const object = {"userToken": token,"name":username}
        res.send(object)
    })

    app.use('/web/api',router)

    app.use(async(err,req,res,next)=>{
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}