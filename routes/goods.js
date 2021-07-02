var express = require('express');
var router = express.Router();

const Cart = require("../schemas/cart");

router.get('/list', function(req, res, next) {
  res.send('Router 상품 목록 페이지')
});

router.get('/detail', function(req, res, next) {
  res.send('Router 상품 상세 페이지')
});

// Cart
// router.post("/goods/:goodsId/cart", async (req, res) => {
//   const { goodsId } = req.params; // 이 파람스에서 가져온다는게 무슨 말?
//   const { quantity } = req.body;

//   isCart = await Cart.find({ goodsId });
//   console.log(isCart, quantity);
//   if (isCart.length) {
//     await Cart.updateOne({ goodsId }, { $set: { quantity } });
//   } else {
//     await Cart.create({ goodsId: goodsId, quantity: quantity });
//   }
//   res.send({ result: "success" });
// });
  
module.exports = router;