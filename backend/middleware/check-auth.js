const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try{
    // take the second string value after Bearer token
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "secret_id_sample_should_be_like_ea38456fhg");
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    next();
  }
  catch(err){
    res.status(401).json({ message: "Auth failed!" });
  }
};
