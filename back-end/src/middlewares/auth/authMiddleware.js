// Authentication Middleware - validates JWT tokens
// Placeholder for when you implement JWT authentication
const authMiddleware = (req, res, next) => {
  try {
    // TODO: Implement JWT verification
    // For now, this is a placeholder that allows all requests
    // const token = req.headers.authorization?.split(' ')[1];
    // if (!token) return res.status(401).json({ message: 'No token provided' });
    // const decoded = jwt.verify(token, config.JWT_SECRET);
    // req.user = decoded;
    
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
  }
};

export default authMiddleware;
