module.exports= app=>{
    const express = require('express')
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../../models/AdminUser')
    const assert = require('http-assert')
    const router = express.Router({
        mergeParams : true
    })
    const fs = require('fs')
    const path = require('path')
    //提交表单
    router.post('/',async(req,res)=>{
        const model = await  req.Model.create(req.body)
        res.send(model)
    })
    //修改
    router.put('/:id',async(req,res)=>{
        const model = await  req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })
    //请求主页面
    router.get("/",async(req,res)=>{
        const items = await req.Model.find()
        res.send(items)
    }) 
    //请求特定一个
    router.get('/:id',async(req,res)=>{
        const model = await req.Model.findById(req.params.id)
        res.send(model) 
    })
    //删除
    router.delete('/:id',async(req,res)=>{
        const jsonObj = await req.Model.findById(req.params.id)
        const address = ""+jsonObj.musicAddress
        var url = path.basename(address)
        url = __dirname+ '/../../uploads/'+ url   
        fs.unlink(url,function(){ 
        })
        const model = await  req.Model.findByIdAndRemove(req.params.id)   
        res.send(model)
    })
    //中间件
    const authMiddleWare = require('../../middleware/auth')
    const resource = require('../../middleware/resource')
    //通用接口
    app.use('/admin/api/rest/:resource',authMiddleWare(),resource(),router)
    //上传
    const multer = require('multer')
    const upload = multer({dest: __dirname+ '/../../uploads'})
    app.post('/admin/api/upload',upload.single('file'),async(req,res)=>{  
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)   
    })
    //上传界面删除音乐
    app.delete('/admin/api/deleteuploadmusic/:filename',async(req, res)=>{
        const url = __dirname+ '/../../uploads/'+ req.params.filename
        fs.unlink(url,function(){ 
        })
        res.sendStatus(200)
    })
    //登录校验
    app.post('/admin/api/login',async(req,res)=>{
       const input = req.body
       const username = input.username
       const password =input.password
       const findUser = await AdminUser.findOne({username})
       assert(findUser,422,"用户不存在")
       const isValid = require('bcrypt').compareSync(password,findUser.password)
        assert(isValid,422,"密码错误")
        
        const token = jwt.sign({
            id: findUser._id
        }, app.get('secret'))
        const object = {"token": token,"username":username}
        res.send(object)
    })
    //错误处理
    app.use(async(err,req,res,next)=>{
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}