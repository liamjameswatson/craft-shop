const router = require("express").Router();

router.get("/usertest", (req, res) => {
  res.send("user test is successful");
});

router.post("/userposttest", (req, res) => {
  const userName = req.body.username;
  res.send("Your usrname is: " + userName);
});

module.exports = router;
