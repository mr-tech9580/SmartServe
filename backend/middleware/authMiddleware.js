// middleware/authMiddleware.js — verifies a JWT and protects routes

const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  try {
   const authHeader = req.headers.authorization;

//    Bearer <token> format
// "Bearer" is a keyword meaning "whoever holds (bears) this token is authorized" — it's a standard prefix convention for token-based auth, so servers can distinguish token types (Bearer vs. other schemes) just by looking at the header. We check for it and then split the string to grab just the token part.

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided, access denied' });
    }

    // Extract just the token part
    const token = authHeader.split(' ')[1];

   const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Access denied: admins only' });
  }
};

module.exports = { protect, adminOnly };
// protect only answers "is this a valid logged-in user?" adminOnly only answers "is this user specifically an admin?"