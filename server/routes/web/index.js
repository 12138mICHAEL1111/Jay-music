module.exports = app =>{
    const express = require('express')
    const Music  = require('../../models/Music')
    const router = express.Router({
        mergeParams : true
    })

    router.get("/musics",async(req,res)=>{
        const musics = await Music.find()
        res.send(musics)
    })

    app.use('/web/api',router)
}