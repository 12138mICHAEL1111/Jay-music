module.exports= app=>{
    const express = require('express')
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
    app.use('/admin/api/rest/:resource',async(req,res,next)=>{
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../../models/${modelName}`)
        next()
    },router)

    const multer = require('multer')
    const upload = multer({dest: __dirname+ '/../../uploads'})
    app.post('/admin/api/upload',upload.single('file'),async(req,res)=>{  
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)   
    })
    app.delete('/admin/api/deleteuploadmusic/:filename',async(req, res)=>{
        const url = __dirname+ '/../../uploads/'+ req.params.filename
        fs.unlink(url,function(){ 
        })
        res.sendStatus(200)
    })
    app.post('/admin/api/login',async(req,res)=>{
       const {username,password} = req.body
       const AdminUser = require('../../models/AdminUser')
       const findUser = await AdminUser.findOne({username})
       if(!findUser){
           return res.status(422).send({
               message: "用户不存在"
           })
       }
    })
}