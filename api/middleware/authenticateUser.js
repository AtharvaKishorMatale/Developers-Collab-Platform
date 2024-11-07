// middleware/authenticateUser.js
import jwt from 'jsonwebtoken';

const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided. Authorization denied.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user information to req.user
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid.' });
  }
};

export default authenticateUser;
