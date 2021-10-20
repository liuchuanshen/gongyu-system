const express = require('express');
const PORT = 2009;

const app = express();

app.use(express.static('../public'));

app.use(express.urlencoded({extended:false}),express.json(),express.raw())

// app.post('/reg',(req,res)=>{
//     console.log('req.body',req.body);
//     res.send('注册用户成功')
// })

// app.get('/login',(req,res)=>{
//     res.send(req.query)
// })

// let goodslist = [
//     {name:'huawei mate40 pro',price:5998,id:1,imgurl:'img/mate40.png'},
//     {name:'xiaomi11',price:3999,id:2,imgurl:'img/mi11.png'},
//     {name:'apple 13',price:7998,id:3,imgurl:'img/apple13.png'},
// ]

// app.get('/goodslist',(req,res)=>{
//     res.send(goodslist)
// })


// app.get('/goods/:id',(req,res)=>{
//     const {id} = req.params;

//     const current = goodslist.find(item=>item.id==id);
//     if(current){
//         res.send(current);
//     }else{
//         res.sendStatus(404);
//     }
// })


// 监听端口
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}` )
})