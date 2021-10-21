const express = require('express');
const mongo = require('../db/mongo');
const router = express.Router();

const {formatData,encrypto} = require('../utils')

const colNameList = 'list';
const colNamePsw = 'password';
const colNameUser = 'user';

    // api/houselist/list
    // 所有租户分页信息
    router.get('/list',async (req,res)=>{
        let {page=1,size=50,sort='regtime',total,name} = req.query;

        if(name === '' || name === undefined ){
            name={}
        }else{
            name = {'xm':name}
        }
        console.log('name=',name)

        let skip = (page-1)*size;
        let limit = size*1;
        total = (total=='0'||total=='false') ? false : true;
        const result = await mongo.find(colNameList,name,{skip,limit,sort,total})
        console.log('result=',result)
        res.send(formatData({data:total?result:result.result}))
    })


     // api/houselist/password
    // 所有租户分页信息
    router.get('/password',async (req,res)=>{
        let {page=1,size=50,sort='regtime',total} = req.query;
        let skip = (page-1)*size;
        let limit = size*1;
        total = (total=='0'||total=='false') ? false : true;
        const result = await mongo.find(colNamePsw,{},{skip,limit,sort,total})
        console.log('result=',result)
        res.send(formatData({data:total?result:result.result}))
    })

    //新建租客数据写进mongoDB
    router.get('/create',async (req,res)=>{
        let {id,fh,rzsj,zysj,xm,sfzhm,sjhm,hx,jfqk} = req.query;
        try{
            await mongo.create(colNameList,{id,fh,rzsj,zysj,xm,sfzhm,sjhm,hx,jfqk});
            res.send(formatData())
        }catch(err){
            res.send(formatData({code:400}))
        }
    })

    // api/houselist/update
    //把编辑好的数据更新到mongoDB
    router.get('/update',async (req,res)=>{
        let {_id,id,fh,rzsj,zysj,xm,sfzhm,sjhm,hx,jfqk} = req.query;
        // console.log('id=',id)
        // console.log(_id,id,fh,rzsj,zysj,xm,sfzhm,sjhm,hx,jfqk)

        try{
            await mongo.update(colNameList,{'id':id},{_id,id,fh,rzsj,zysj,xm,sfzhm,sjhm,hx,jfqk});
            res.send(formatData())
        }catch(err){
            res.send(formatData({code:400}))
        }
    })



module.exports = router;