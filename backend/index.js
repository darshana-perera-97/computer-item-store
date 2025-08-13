const express = require('express');
const cors = require('cors');
const path = require('path');
const whatsappService = require('./services/whatsappService');

const app = express();
const PORT = process.env.PORT || 3060;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files (if you want to serve frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', require('./routes'));

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Computer Item Store API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: `http://localhost:${PORT}/api/health`,
      whatsapp: {
        status: `http://localhost:${PORT}/api/whatsapp/status`,
        statusTerminal: `http://localhost:${PORT}/api/whatsapp/status/terminal`,
        qr: `http://localhost:${PORT}/api/whatsapp/qr`,
        qrTerminal: `http://localhost:${PORT}/api/whatsapp/qr/terminal`,
        start: `http://localhost:${PORT}/api/whatsapp/start`,
        stop: `http://localhost:${PORT}/api/whatsapp/stop`,
        autoStart: `http://localhost:${PORT}/api/whatsapp/auto-start`,
        autoStartEnable: `http://localhost:${PORT}/api/whatsapp/auto-start/enable`,
        autoStartDisable: `http://localhost:${PORT}/api/whatsapp/auto-start/disable`,
        sendMessage: `http://localhost:${PORT}/api/whatsapp/send-message`,
        checkNumber: `http://localhost:${PORT}/api/whatsapp/check-number`,
        chats: `http://localhost:${PORT}/api/whatsapp/chats`,
        chatsTerminal: `http://localhost:${PORT}/api/whatsapp/chats/terminal`,
        health: `http://localhost:${PORT}/api/whatsapp/health`
      },
      computerItems: `http://localhost:${PORT}/api/computer-items`,
      auth: `http://localhost:${PORT}/api/auth`,
      orders: `http://localhost:${PORT}/api/orders/submit`
    },
    whatsappSetup: {
      script: 'npm run whatsapp-auth',
      description: 'Run this command to link your WhatsApp account via QR code'
    },
    autoStart: {
      enabled: true,
      description: 'WhatsApp client automatically starts when server starts',
      control: 'Use /api/whatsapp/auto-start/enable or /disable to control'
    }
  });
});

// WhatsApp quick start route
app.get('/whatsapp-setup', (req, res) => {
  res.set('Content-Type', 'text/plain');
  let output = '\n📱 WhatsApp Setup Guide\n';
  output += '======================\n\n';
  output += '🚀 Quick Start:\n';
  output += '1. Start the WhatsApp client:\n';
  output += '   POST http://localhost:3060/api/whatsapp/start\n\n';
  output += '2. Get QR code to scan:\n';
  output += '   GET http://localhost:3060/api/whatsapp/qr/terminal\n\n';
  output += '3. Check status:\n';
  output += '   GET http://localhost:3060/api/whatsapp/status/terminal\n\n';
  output += '4. Alternative: Use the npm script:\n';
  output += '   npm run whatsapp-auth\n\n';
  output += '🤖 Auto-Start Feature:\n';
  output += '- WhatsApp client starts automatically when server starts\n';
  output += '- Generates QR code if no device is connected\n';
  output += '- Control with: POST /api/whatsapp/auto-start/enable or /disable\n\n';
  output += '🔗 All Endpoints:\n';
  output += '- Status: /api/whatsapp/status\n';
  output += '- QR Code: /api/whatsapp/qr\n';
  output += '- Send Message: /api/whatsapp/send-message\n';
  output += '- Check Number: /api/whatsapp/check-number\n';
  output += '- Chats: /api/whatsapp/chats\n';
  output += '- Health: /api/whatsapp/health\n';
  output += '- Auto-start: /api/whatsapp/auto-start\n\n';
  output += '💡 Terminal-friendly endpoints end with /terminal\n';
  res.send(output);
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    timestamp: new Date().toISOString(),
    availableRoutes: [
      '/',
      '/whatsapp-setup',
      '/api/health',
      '/api/whatsapp/*',
      '/api/computer-items/*',
      '/api/auth/*'
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message,
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
  console.log(`📱 WhatsApp setup guide: http://localhost:${PORT}/whatsapp-setup`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  
  // Auto-start WhatsApp client when server starts
  console.log(`\n🤖 Auto-starting WhatsApp client...`);
  console.log(`📱 This will generate a QR code if no device is connected`);
  console.log(`⏳ Please wait a moment...\n`);
  
  try {
    // Wait a bit for server to fully start
    setTimeout(async () => {
      try {
        const result = await whatsappService.autoStart();
        if (result.success) {
          console.log(`✅ WhatsApp auto-start completed: ${result.message}`);
          if (result.status === 'connected') {
            console.log(`📞 WhatsApp is already connected and ready!`);
          } else {
            console.log(`📱 QR code should be generated above - scan it with your phone`);
          }
        } else {
          console.log(`⚠️  WhatsApp auto-start failed: ${result.error}`);
          console.log(`💡 You can manually start it later with: POST /api/whatsapp/start`);
        }
      } catch (error) {
        console.log(`❌ WhatsApp auto-start error: ${error.message}`);
        console.log(`💡 You can manually start it later`);
      }
      
      console.log(`\n💡 Manual WhatsApp control:`);
      console.log(`   1. Start client: POST http://localhost:${PORT}/api/whatsapp/start`);
      console.log(`   2. Auto-start: POST http://localhost:${PORT}/api/whatsapp/auto-start`);
      console.log(`   3. Get QR code: GET http://localhost:${PORT}/api/whatsapp/qr/terminal`);
      console.log(`   4. Check status: GET http://localhost:${PORT}/api/whatsapp/status/terminal`);
      console.log(`   5. Use CLI tool: npm run whatsapp-cli`);
      console.log(`\n🤖 Auto-start control:`);
      console.log(`   - Enable: POST http://localhost:${PORT}/api/whatsapp/auto-start/enable`);
      console.log(`   - Disable: POST http://localhost:${PORT}/api/whatsapp/auto-start/disable`);
    }, 2000); // Wait 2 seconds for server to fully start
    
  } catch (error) {
    console.log(`❌ Failed to auto-start WhatsApp: ${error.message}`);
    console.log(`💡 You can manually start it later`);
  }
});

module.exports = app; 