const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
  //middleware is just a function which receive the requests from the aurguments( req, res, next)
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token,process.env.JWT_KEY );
    req.userData = {email: decodedToken.email, userId: decodedToken.userId };
    next();
  } catch (error) {
    res.status(401).json({message: "you are not authenticated"});
  }
};
