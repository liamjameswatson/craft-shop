const router = require("express").Router();
const Basket = require("../models/Basket");
const { verifyTokenAndAuthorisation, verifyTokenAndRestrictToAdmin } = require("./verifyToken");

//CREATE

router.post("/", verifyTokenAndAuthorisation, async (req, res) => {
  const newBasket = new Basket(req.body);
  try {
    const savedBasket = await newBasket.save();
    res.status(200).json(savedBasket);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update

router.put("/:id", verifyTokenAndAuthorisation, async (req, res) => {
  updatedBasket = await Basket.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  try {
    res.status(200).json(updatedBasket, { message: "Basket has been updated" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete

router.delete("/:id", verifyTokenAndAuthorisation, async (req, res) => {
  try {
    await Basket.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Basket has been deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER BASKET
router.get("/find/:userId", verifyTokenAndAuthorisation, async (req, res) => {
  try {
    const basket = await Basket.findByOne({userId: req.params.userId});
    res.status(200).json(basket);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL BASKETS
router.get("/", verifyTokenAndRestrictToAdmin, async (req, res) => {
    try{
        const baskets = await Basket.find()
        res.status(200).json(baskets)

    }catch(err){
        res.status(500).json(err)
    }
});

module.exports = router;

