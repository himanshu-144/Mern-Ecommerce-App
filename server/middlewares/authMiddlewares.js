var jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
     const authHeader = req.headers['authorization'];
    if (authHeader) {
      jwt.verify(authHeader, process.env.JWT_SECRET, (err) => {
        if (err) {
          return res.status(403);
        }
        next();
      });
    } else {
      return res.status(401);
    }
  };

  module.exports  = verifyToken