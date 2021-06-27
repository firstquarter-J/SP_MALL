const express = require('express')
const app = express()
const port = 3000

const connect = require('./schemas')
connect()

// 라우터 변수화?
const goodsRouter = require('./routes/goods')
const userRouter = require('./routes/user')

// const mongoose = require('mongoose'); //  몽고디비

// app.get('/mongodb', async (req, res) => {
//     await mongoose.connect('mongodb://localhost/voyage', { // 어웨이트? 프로미슨가? // 몽고디비 주소? mongodb://localhost/voyage db 경로? 이름?
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useFindAndModify: true,
//         useCreateIndex: true // 옵션들?
//     });

//     const { Schema } = mongoose;
//     const goodsSchema = new Schema({
//       goodsId: {
//         type: Number,
//         required: true,
//         unique: true,
//       },
//       name: {
//         type: String,
//         required: true,
//         unique: true,
//       },
//       thumbnailUrl: {
//         type: String,
//       },
//       category: {
//         type: String,
//       },
//       price: {
//         type: Number,
//       }
//     })

//     let Goods = mongoose.model("Goods", goodsSchema)

    await Goods.create({
      goodsId: 1,
      name: "맛있는 저녁",
      thumbnailUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e7/2020-10-20_%EC%9C%A1%ED%9A%8C.jpeg",
      category: "food",
      price: 15000,
    })

		res.send('ok'); // /mongodb 페이지로 접속 시 화면에 ok 출력되네?
})

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