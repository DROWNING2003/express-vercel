const EXPRESS=require('express')
const app=EXPRESS()
const Login=require("./router/login")

//中间件配置
//适应Post请求
app.use(EXPRESS.json())
//适应get请求
app.use(EXPRESS.urlencoded({extended:false}))

//静态文件托管
// app.use('/static',EXPRESS.static("static"))

//路由中间件
app.use("/",Login)

app.listen(3001,()=>{
    console.log('服务器启动成功')
})