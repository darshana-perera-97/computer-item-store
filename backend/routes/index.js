const express = require('express');
const router = express.Router();

// Import specific route modules
const computerItemsRoutes = require('./computerItems');
const authRoutes = require('./auth');

// Mount routes
router.use('/computer-items', computerItemsRoutes);
router.use('/auth', authRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

module.exports = router; 