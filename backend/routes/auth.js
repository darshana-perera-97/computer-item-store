const express = require('express');
const router = express.Router();

// Mock user data (in a real app, this would come from a database)
let users = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@computerstore.com',
    password: 'hashedpassword123', // In real app, this would be properly hashed
    role: 'admin',
    createdAt: new Date().toISOString()
  }
];

// POST user registration
router.post('/register', (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide username, email, and password'
      });
    }
    
    // Check if user already exists
    const existingUser = users.find(user => 
      user.username === username || user.email === email
    );
    
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'Username or email already exists'
      });
    }
    
    // Create new user
    const newUser = {
      id: users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1,
      username,
      email,
      password, // In real app, hash this password
      role: 'user',
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    
    // Don't send password in response
    const { password: _, ...userWithoutPassword } = newUser;
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: userWithoutPassword
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to register user'
    });
  }
});

// POST user login
router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Basic validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide username and password'
      });
    }
    
    // Find user
    const user = users.find(u => 
      (u.username === username || u.email === username) && u.password === password
    );
    
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }
    
    // Don't send password in response
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      success: true,
      message: 'Login successful',
      data: userWithoutPassword,
      token: 'mock-jwt-token-' + Date.now() // In real app, generate proper JWT
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to login'
    });
  }
});

// GET user profile (protected route)
router.get('/profile', (req, res) => {
  try {
    // In a real app, you'd verify the JWT token here
    const token = req.headers.authorization;
    
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Access token required'
      });
    }
    
    // Mock token verification - in real app, verify JWT
    const userId = 1; // Extract from token
    const user = users.find(u => u.id === userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    // Don't send password in response
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      success: true,
      data: userWithoutPassword
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch profile'
    });
  }
});

// PUT update user profile
router.put('/profile', (req, res) => {
  try {
    const { username, email } = req.body;
    
    // In a real app, you'd verify the JWT token here
    const token = req.headers.authorization;
    
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Access token required'
      });
    }
    
    const userId = 1; // Extract from token
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    // Update user
    const updatedUser = {
      ...users[userIndex],
      ...(username && { username }),
      ...(email && { email }),
      updatedAt: new Date().toISOString()
    };
    
    users[userIndex] = updatedUser;
    
    // Don't send password in response
    const { password: _, ...userWithoutPassword } = updatedUser;
    
    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: userWithoutPassword
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update profile'
    });
  }
});

module.exports = router; 