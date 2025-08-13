const express = require('express');
const router = express.Router();

// Import specific route modules
const computerItemsRoutes = require('./computerItems');
const authRoutes = require('./auth');
const whatsappRoutes = require('./whatsapp');
const ordersRoutes = require('./orders');

// Mount routes
router.use('/computer-items', computerItemsRoutes);
router.use('/auth', authRoutes);
router.use('/whatsapp', whatsappRoutes);
router.use('/orders', ordersRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

module.exports = router; 