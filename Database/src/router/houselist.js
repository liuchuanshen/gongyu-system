const express = require('express');
const mongo = require('../db/mongo');
const router = express.Router();

const {formatData,encrypto} = require('../utils')

const colName = 'houselist';

    // api/houselist/houselist
    // 所有房号分页信息
    router.get('/houselist',async (req,res)=>{
        let {page=1,size=50,sort='regtime',total} = req.query;
        let skip = (page-1)*size;
        let limit = size*1;
        total = (total=='0'||total=='false') ? false : true;
        const result = await mongo.find(colName,{},{skip,limit,sort,total})
        console.log('result=',result)
        res.send(formatData({data:total?result:result.result}))
    })




module.exports = router;