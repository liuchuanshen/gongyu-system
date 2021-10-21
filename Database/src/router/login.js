const express = require('express');
const mongo = require('../db/mongo');
const router = express.Router();

const {formatData,encrypto} = require('../utils')

// /login/login
router.get('/login',async (req,res)=>{
let {username,password} = req.query;
// 加密密码
// password = encrypto(password)
//user为数据库的名字
const result = await mongo.find('login',{username,password});

if(result.total > 0){
    res.send(formatData({
        data:result.result[0]
    }))
}else{
    res.send(formatData({code:401}))
}
})



module.exports = router;