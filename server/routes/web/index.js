module.exports = app =>{
    const express = require('express')
    const jwt = require('jsonwebtoken')
    const Music  = require('../../models/Music')
    const User  = require('../../models/User')
    const assert = require('http-assert')
    const fs = require("fs")
    const router = express.Router({
        mergeParams : true
    })

    router.get("/musics",async(req,res)=>{
        const musics = await Music.find()
        res.send(musics)
    })

    router.post("/avatar",async(req,res)=>{
        const user = await User.findById(req.body.id)
        res.send(user)
    })

    router.post('/signIn',async(req,res)=>{
        const findUser = await User.findOne({username:req.body.username})
        assert(!findUser,422,"用户名已被注册")      
        const model = await User.create(req.body)
        const token = jwt.sign({
            id: model._id
        }, app.get('secret'))
        const object = {"userToken": token,"name":model.username,"id":model._id}
         res.send(object)
    })

    router.post("/user/musicliked",async(req,res)=>{
        const finduser = await User.findById(req.body.id).populate("likemusic")
        if(finduser==null){
            res.send({"message":"fail"})
        }
        else{
            res.send({"likemusic":finduser.likemusic,"message":"success"})
        }
    })

    router.post("/music/like",async(req,res)=>{
        const finduser = await User.findById(req.body.id)
        const likeMusicArray = finduser.likemusic
        likeMusicArray.push(req.body.musicid[0])
        await User.findByIdAndUpdate(req.body.id,{likemusic:likeMusicArray})
        res.sendStatus(200)
    })

    router.post("/music/dislike",async(req,res)=>{
        const finduser = await User.findById(req.body.id)
        const likeMusicArray = finduser.likemusic
        for(var i = 0; i<likeMusicArray.length;i++){
            if(likeMusicArray[i] == req.body.musicid[0]){
                likeMusicArray.splice(i,1)
                break
            }
        }
        await User.findByIdAndUpdate(req.body.id,{likemusic:likeMusicArray})
        res.sendStatus(200)
    })

    router.post("/login",async(req,res)=>{
       const findUser = await User.findOne({username:req.body.username})
       assert(findUser,422,"用户不存在")
       const isValid = require('bcrypt').compareSync(req.body.password,findUser.password)
        assert(isValid,422,"密码错误")
        
        const token = jwt.sign({
            id: findUser._id
        }, app.get('secret'))
        const object = {"userToken": token,"name":req.body.username,"id":findUser._id}
        res.send(object)
    })

    router.get("/user/:id",async(req,res)=>{
        const model = await User.findById(req.params.id)
        res.send(model)
    })

    router.put("/user/edit/:id",async(req,res)=>{
        const findUser = await User.findOne({username:req.body.username})
        assert(!findUser,422,"用户名已存在")
        const model = await User.findByIdAndUpdate(req.params.id,{"username":req.body.username})
        res.send(model)
    })

    router.put("/user/edit/avatar/:id",async(req,res)=>{
        const model = await User.findByIdAndUpdate(req.params.id,{"avataraddress":req.body.avataraddress})
        res.send(model)
    })

    app.use('/web/api',router)

    const multer = require('multer')
    const upload = multer({dest: __dirname+ '/../../uploads/avatar'})
    app.post('/web/api/upload',upload.single('file'),async(req,res)=>{  
        const file = req.file
        file.url = `http:/test.jay-music.com/uploads/avatar/${file.filename}`
        res.send(file)   
    })

    app.delete('/web/api/deleteuploadavatar/:filename',async(req, res)=>{
        const url = __dirname+ '/../../uploads/avatar/'+ req.params.filename
        fs.unlink(url,function(){ 
        })
        res.sendStatus(200)
    })

    app.use(async(err,req,res,next)=>{
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}