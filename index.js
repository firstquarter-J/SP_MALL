const express = require('express')
const app = express()
const port = 3000

const connect = require('./schemas')
connect()

app.use(express.urlencoded({ extended: false })) // 동기? 비동기? 순서가 중요하네? goodsRouter 보다 아래 있으니 에러!
app.use(express.json())
app.use(express.static('public')) // static 미들웨어 이용 public 폴더

// 라우터 변수화?
// const goodsRouter = require('./routes/goods')
// const userRouter = require('./routes/user')
// app.use('/goods', goodsRouter)
// app.use('/user', userRouter)

const goodsRouter = require("./routers/goods"); // 위에랑 뭐가 다른건데???
app.use("/api", [goodsRouter]);


app.use((req, res, next) => {
  // console.log(req);
  next();
});

// ejs 사용한다?
app.set('views', __dirname + '/views'); // 경로 명시?
app.set('view engine', 'ejs');

app.get('/test', (req, res) => {
  let name = req.query.name; // 쿼리 네임 지정? 쿼리 셀렉터 같은건가?
  res.render('test', {name}); // 렌더? 그린다? test 란 파일?
})

app.get('/home', (req, res) => {
  res.render('index')
})

app.get('/detail', (req, res) => {
  res.render('detail')
})

app.get('/cart', (req, res) => {
  res.render('cart')
})

app.get('/order', (req, res) => {
  res.render('order')
})

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

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})