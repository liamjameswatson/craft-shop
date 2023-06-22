const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err)
        res.status(403).json({ message: "Invalid Token. Please log in." });
      req.user = user;
      console.log(req.headers);
      next();
    });
  } else {
    return res
      .status(401)
      .json({ message: "You are not authenticated. Please log in." });
  }
};

const verifyTokenAndAuthorisation = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.role === "admin") {
      next();
    } else {
      res.status(403).json("Access denied");
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAuthorisation };
