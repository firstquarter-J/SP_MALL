const express = require("express");
const Goods = require("../schemas/Goods");

const router = express.Router();

// 다 가져옴
router.get("/goods", async (req, res, next) => {
  try {
    const { category } = req.query; // 4-2 재수강 요망
    const goods = await Goods.find({ category }).sort("-goodsId");
    res.json({ goods: goods });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 하나만 가져옴
router.get("/goods/:goodsId", async (req, res) => {
  const { goodsId } = req.params;
  goods = await Goods.findOne({ goodsId: goodsId });
  res.json({ detail: goods });
});

// 생성
router.post('/goods', async (req, res) => {
  const { goodsId, name, thumbnailUrl, category, price } = req.body;

  isExist = await Goods.find({ goodsId });
  if (isExist.length == 0) {
    await Goods.create({ goodsId, name, thumbnailUrl, category, price });
  }
  res.send({ result: "success" });
});

const Cart = require("../schemas/cart"); // 카트 모듈을 쓰기 위함? 위로 올려서 구분지어 보기 좋기 전에 내가 좀 보자

// 카트에 저장
router.post("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params; // 파람스가 뭔데 가져와요...
  const { quantity } = req.body; // 그래서 이렇게 온다는게 무슨 말이에요 튜터님...

  isCart = await Cart.find({ goodsId });
  console.log(isCart, quantity);
  if (isCart.length) {
    await Cart.updateOne({ goodsId }, { $set: { quantity } });
  } else {
    await Cart.create({ goodsId: goodsId, quantity: quantity });
  }
  res.send({ result: "success" });
});


// 삭제 
router.delete("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params

  const isGoodsInCart = await Cart.find({ goodsId })
  if (isGoodsInCart.length > 0) {
    await Cart.deleteOne({ goodsId }) // 경우에 따라 대체로 다를 수 있는데 delete는 바디를 쓰지 않는다?
  }
  res.send({ result: "success" })
})


// 카트 업데이트
router.patch("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params
  const { quantity } = req.body

  const isGoodsInCart = await Cart.find({ goodsId })
  if (isGoodsInCart.length > 0) {
    await Cart.updateOne({ goodsId }, { $set: { quantity } })
  }
  res.send({ result: "success "})
})


// 장바구니
router.get("/cart", async (req, res) => {
  const cart = await Cart.find({});
  const goodsId = cart.map(cart => cart.goodsId);

  goodsInCart = await Goods.find()
    .where("goodsId")
    .in(goodsId);

  concatCart = cart.map(c => {
    for (let i = 0; i < goodsInCart.length; i++) {
      if (goodsInCart[i].goodsId == c.goodsId) {
        return { quantity: c.quantity, goods: goodsInCart[i] };
      }
    }
  });

  res.json({
    cart: concatCart
  });
});

module.exports = router;