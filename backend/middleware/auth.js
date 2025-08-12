// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Access token required'
    });
  }
  
  try {
    // In a real app, you would verify the JWT token here
    // For now, we'll just check if a token exists
    if (token.startsWith('mock-jwt-token-')) {
      // Mock token validation - extract user ID from token
      const timestamp = token.replace('mock-jwt-token-', '');
      req.user = {
        id: 1, // Mock user ID
        timestamp: parseInt(timestamp)
      };
      next();
    } else {
      return res.status(403).json({
        success: false,
        error: 'Invalid token'
      });
    }
  } catch (error) {
    return res.status(403).json({
      success: false,
      error: 'Invalid token'
    });
  }
};

// Role-based access control middleware
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }
    
    // In a real app, you'd check the user's role from the database
    // For now, we'll assume admin role for demonstration
    const userRole = 'admin'; // This would come from req.user.role
    
    if (roles.includes(userRole)) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        error: 'Insufficient permissions'
      });
    }
  };
};

module.exports = {
  authenticateToken,
  requireRole
}; 