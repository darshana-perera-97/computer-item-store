const express = require('express');
const router = express.Router();
const whatsappService = require('../services/whatsappService');

// Start WhatsApp client
router.post('/start', async (req, res) => {
  try {
    const result = await whatsappService.start();
    res.json(result);
  } catch (error) {
    console.error('Error starting WhatsApp:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Stop WhatsApp client
router.post('/stop', async (req, res) => {
  try {
    const result = await whatsappService.stop();
    res.json(result);
  } catch (error) {
    console.error('Error stopping WhatsApp:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Auto-start WhatsApp client
router.post('/auto-start', async (req, res) => {
  try {
    const result = await whatsappService.autoStart();
    res.json(result);
  } catch (error) {
    console.error('Error auto-starting WhatsApp:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Enable/disable auto-start
router.post('/auto-start/:action', (req, res) => {
  try {
    const { action } = req.params;
    if (action === 'enable' || action === 'disable') {
      const enabled = action === 'enable';
      whatsappService.setAutoStart(enabled);
      res.json({
        success: true,
        message: `Auto-start ${action}d`,
        autoStartEnabled: enabled,
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(400).json({
        success: false,
        error: 'Invalid action. Use "enable" or "disable"',
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('Error setting auto-start:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Get WhatsApp status (JSON format)
router.get('/status', (req, res) => {
  try {
    const status = whatsappService.getStatus();
    res.json({
      success: true,
      data: status
    });
  } catch (error) {
    console.error('Error getting WhatsApp status:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Get WhatsApp status in terminal-friendly format
router.get('/status/terminal', (req, res) => {
  try {
    const terminalStatus = whatsappService.getTerminalStatus();
    res.set('Content-Type', 'text/plain');
    res.send(terminalStatus);
  } catch (error) {
    console.error('Error getting terminal status:', error);
    res.status(500).send(`❌ Error: ${error.message}`);
  }
});

// Get QR code (if available)
router.get('/qr', (req, res) => {
  try {
    const qrCode = whatsappService.getQRCode();
    if (qrCode) {
      res.json({
        success: true,
        data: {
          qrCode: qrCode,
          status: 'qr_ready',
          instructions: [
            '1. Open WhatsApp on your phone',
            '2. Go to Settings > Linked Devices',
            '3. Tap "Link a Device"',
            '4. Scan the QR code above',
            '5. Wait for authentication...'
          ],
          timestamp: new Date().toISOString()
        }
      });
    } else {
      res.json({
        success: false,
        message: 'No QR code available. Please start the WhatsApp client first.',
        data: {
          status: whatsappService.getStatus().status,
          timestamp: new Date().toISOString()
        }
      });
    }
  } catch (error) {
    console.error('Error getting QR code:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Get QR code in terminal format
router.get('/qr/terminal', (req, res) => {
  try {
    const qrCode = whatsappService.getQRCode();
    if (qrCode) {
      res.set('Content-Type', 'text/plain');
      let output = '\n📱 WhatsApp QR Code\n';
      output += '==================\n\n';
      output += 'Scan this QR code with your WhatsApp mobile app:\n\n';
      output += qrCode + '\n\n';
      output += '💡 Instructions:\n';
      output += '1. Open WhatsApp on your phone\n';
      output += '2. Go to Settings > Linked Devices\n';
      output += '3. Tap "Link a Device"\n';
      output += '4. Scan the QR code above\n';
      output += '5. Wait for authentication...\n\n';
      output += '🔗 Alternative: Use the QR endpoint with qrcode-terminal\n';
      output += '   npm install -g qrcode-terminal\n';
      output += '   qrcode-terminal "' + qrCode + '"\n';
      res.send(output);
    } else {
      res.set('Content-Type', 'text/plain');
      res.send('❌ No QR code available. Please start the WhatsApp client first.\n\nUse: POST /api/whatsapp/start');
    }
  } catch (error) {
    console.error('Error getting terminal QR code:', error);
    res.status(500).send(`❌ Error: ${error.message}`);
  }
});

// Send message
router.post('/send-message', async (req, res) => {
  try {
    const { to, message } = req.body;
    
    if (!to || !message) {
      return res.status(400).json({
        success: false,
        error: 'Phone number and message are required',
        timestamp: new Date().toISOString()
      });
    }

    const result = await whatsappService.sendMessage(to, message);
    res.json(result);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Check if number is registered
router.post('/check-number', async (req, res) => {
  try {
    const { number } = req.body;
    
    if (!number) {
      return res.status(400).json({
        success: false,
        error: 'Phone number is required',
        timestamp: new Date().toISOString()
      });
    }

    const isRegistered = await whatsappService.isRegistered(number);
    res.json({
      success: true,
      data: {
        number: number,
        isRegistered: isRegistered,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error checking number:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Get chats
router.get('/chats', async (req, res) => {
  try {
    const chats = await whatsappService.getChats();
    res.json({
      success: true,
      data: {
        chats: chats,
        count: chats.length,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error getting chats:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Get chats in terminal format
router.get('/chats/terminal', async (req, res) => {
  try {
    const chats = await whatsappService.getChats();
    res.set('Content-Type', 'text/plain');
    
    let output = '\n💬 WhatsApp Chats\n';
    output += '================\n\n';
    output += `Total Chats: ${chats.length}\n\n`;
    
    if (chats.length === 0) {
      output += 'No chats available.\n';
    } else {
      chats.forEach((chat, index) => {
        output += `${index + 1}. ${chat.name || 'Unknown'}\n`;
        output += `   ID: ${chat.id}\n`;
        output += `   Type: ${chat.isGroup ? 'Group' : 'Individual'}\n`;
        output += `   Unread: ${chat.unreadCount}\n`;
        if (chat.lastMessage) {
          output += `   Last: ${chat.lastMessage.body.substring(0, 50)}${chat.lastMessage.body.length > 50 ? '...' : ''}\n`;
        }
        output += '\n';
      });
    }
    
    res.send(output);
  } catch (error) {
    console.error('Error getting terminal chats:', error);
    res.status(500).send(`❌ Error: ${error.message}`);
  }
});

// Health check for WhatsApp service
router.get('/health', (req, res) => {
  try {
    const status = whatsappService.getStatus();
    const health = {
      service: 'whatsapp',
      status: status.status,
      isReady: status.isReady,
      uptime: status.uptimeSeconds,
      lastActivity: status.lastActivity,
      autoStartEnabled: status.autoStartEnabled,
      timestamp: new Date().toISOString()
    };
    
    if (status.isReady) {
      res.json({ success: true, data: health });
    } else {
      res.status(503).json({ success: false, data: health });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router; 