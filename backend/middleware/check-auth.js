const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
  //middleware is just a function which receive the requests from the aurguments( req, res, next)
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "secret_this_should_be_longer");
    next();
  } catch (error) {
    res.status(401).json({message: "Auth failed"});
  }
};