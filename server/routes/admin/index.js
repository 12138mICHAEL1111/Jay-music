module.exports = app=>{
    const express = require('express')
    const router = express.Router()
    const Music = require('../../models/Music')
    router.post('/musics',async(req,res)=>{
        const model = await Music.create(req.body)
        res.send(model)
    })
    app.use('/admin/api',router)
}