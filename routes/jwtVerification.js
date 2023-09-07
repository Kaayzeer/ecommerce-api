const jwt = require('jsonwebtoken')

const jwtVerification = (req, res, next) => {
    const { token } = req.headers;
    
    if (token) {
        
    const splittedToken = token.split(" ")[1]
      
      jwt.verify(splittedToken, process.env.JWT_SECRET_KEY, (err, user) => { 
        
        if (err) res.status(403).json("Invalid token!");
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json("Not authenticated");
    }
  };
  
  const verifyAuthAndToken = (req, res, next) => {
    jwtVerification(req, res, () => {
        
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("Not allowed!");
      }
    });
  };

module.exports = { jwtVerification, verifyAuthAndToken }