const jwt = require("jsonwebtoken");
const {UnauthorizedError} = require('../Utils/customeError');

const userAuthMiddleware = async (req, res, next) => {  
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new UnauthorizedError("Authentication token missing");
    }

    jwt.verify(token, process.env.JWT_KEY, (err, user) => { 
      if (err) {
        return res.status(403).json({ message: 'Invalid token' }); // Return here as well
      }
      req.userId = user.id;
      next(); 
    });
    
  } catch (error) {
    console.error('Error in userAuthMiddleware:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { userAuthMiddleware };
