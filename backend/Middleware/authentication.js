const jwt = require("jsonwebtoken");
const {UnauthorizedError} = require('../Utils/customeError');

const userAuthMiddleware = async (req, res, next) => {
  try {
    console.log("Cookies received:", req.cookies);
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Authentication token missing' }); // Ensure return to avoid further execution
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
