const express = require('express')
const app = express()
const port = 3000

// 라우터 변수화?
const goodsRouter = require('./routes/goods')
const userRouter = require('./routes/user')

// 미들웨어
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static('public')) // static 미들웨어 이용 public 폴더

app.use('/goods', goodsRouter)
app.use('/user', userRouter)

app.use((req, res, next) => {
  console.log(req);
  next();
});

app.get('/', (req, res) => {
  res.send('<!DOCTYPE html>\
  <html lang="en">\
  <head>\
      <meta charset="UTF-8">\
      <meta http-equiv="X-UA-Compatible" content="IE=edge">\
      <meta name="viewport" content="width=device-width, initial-scale=1.0">\
      <title>Document</title>\
  </head>\
  <body>\
      Hi. I am with html<br>\
      <a href="/hi">Say Hi!</a>\
  </body>\
  </html>')
})

// app.get('/goods/list', (req, res) => {
//     res.send('상품 목록 페이지')
//   })
  
//   app.get('/goods/detail', (req, res) => {
//     res.send('상품 상세 페이지')
//   })
  
//   app.get('/user/login', (req, res) => {
//     res.send('로그인 페이지')
//   })
  
//   app.get('/user/register', (req, res) => {
//     res.send('회원가입 페이지')
//   })

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})