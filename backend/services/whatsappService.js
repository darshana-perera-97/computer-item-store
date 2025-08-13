const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

class WhatsAppService {
  constructor() {
    this.client = null;
    this.isReady = false;
    this.qrCode = null;
    this.phoneNumber = null;
    this.status = 'disconnected';
    this.connectionStartTime = null;
    this.lastActivity = null;
    this.autoStartEnabled = true; // Enable auto-start by default
  }

  initialize() {
    try {
      this.client = new Client({
        authStrategy: new LocalAuth({
          clientId: 'computer-store-whatsapp',
          dataPath: './whatsapp-sessions'
        }),
        puppeteer: {
          headless: true,
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu',
            '--disable-web-security',
            '--disable-features=VizDisplayCompositor'
          ]
        }
      });

      this.setupEventListeners();
      return this.client;
    } catch (error) {
      console.error('Error initializing WhatsApp client:', error);
      throw error;
    }
  }

  setupEventListeners() {
    if (!this.client) return;

    this.client.on('qr', (qr) => {
      console.log('\n📱 QR Code received!');
      console.log('Scan this QR code with your WhatsApp mobile app:\n');
      qrcode.generate(qr, { small: true });
      this.qrCode = qr;
      this.status = 'qr_ready';
      this.lastActivity = new Date();
      console.log('\n💡 Instructions:');
      console.log('1. Open WhatsApp on your phone');
      console.log('2. Go to Settings > Linked Devices');
      console.log('3. Tap "Link a Device"');
      console.log('4. Scan the QR code above');
      console.log('5. Wait for authentication...\n');
      
      // Also log the API endpoints for easy access
      console.log('🔗 API Endpoints:');
      console.log('- Status: http://localhost:3060/api/whatsapp/status/terminal');
      console.log('- QR Code: http://localhost:3060/api/whatsapp/qr/terminal');
      console.log('- CLI Tool: npm run whatsapp-cli');
      console.log('');
    });

    this.client.on('ready', () => {
      console.log('✅ WhatsApp client is ready!');
      this.isReady = true;
      this.status = 'connected';
      this.qrCode = null;
      this.lastActivity = new Date();
      
      this.client.getProfilePictureUrl(this.client.info.wid._serialized)
        .then(() => {
          this.phoneNumber = this.client.info.wid.user;
          console.log(`📞 Connected with phone number: ${this.phoneNumber}`);
          console.log(`🔗 Your WhatsApp account is now linked!`);
          console.log('\n💡 You can now:');
          console.log('- Use the WhatsApp API endpoints');
          console.log('- Send messages programmatically');
          console.log('- Check status via API');
          console.log('\n🚀 API Endpoints:');
          console.log(`- Status: http://localhost:3060/api/whatsapp/status`);
          console.log(`- Send Message: http://localhost:3060/api/whatsapp/send-message`);
          console.log(`- Check Number: http://localhost:3060/api/whatsapp/check-number`);
        })
        .catch(err => {
          console.log('Connected but could not get phone number');
        });
    });

    this.client.on('authenticated', () => {
      console.log('🔐 Authentication successful!');
      console.log('⏳ Initializing WhatsApp client...');
      this.status = 'authenticating';
      this.lastActivity = new Date();
    });

    this.client.on('auth_failure', (msg) => {
      console.error('❌ Authentication failed:', msg);
      this.status = 'auth_failed';
      this.isReady = false;
      this.lastActivity = new Date();
      console.log('💡 Please try again by restarting the client');
    });

    this.client.on('disconnected', (reason) => {
      console.log('🔌 WhatsApp client disconnected:', reason);
      this.status = 'disconnected';
      this.isReady = false;
      this.phoneNumber = null;
      this.lastActivity = new Date();
      console.log('💡 You may need to re-authenticate');
      
      // Auto-restart if enabled and not manually stopped
      if (this.autoStartEnabled && this.status !== 'stopped') {
        console.log('🔄 Auto-restarting WhatsApp client...');
        setTimeout(() => {
          this.autoStart();
        }, 5000); // Wait 5 seconds before auto-restart
      }
    });

    this.client.on('message', (message) => {
      console.log(`📨 Message from ${message.from}: ${message.body}`);
      this.lastActivity = new Date();
    });

    this.client.on('message_create', (message) => {
      if (message.fromMe) {
        console.log(`📤 Message sent to ${message.to}: ${message.body}`);
        this.lastActivity = new Date();
      }
    });
  }

  async start() {
    try {
      if (!this.client) {
        this.initialize();
      }
      
      this.connectionStartTime = new Date();
      this.status = 'starting';
      await this.client.initialize();
      console.log('🚀 WhatsApp client started successfully');
      return { 
        success: true, 
        message: 'WhatsApp client started',
        status: this.status,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('❌ Error starting WhatsApp client:', error);
      this.status = 'error';
      throw error;
    }
  }

  async stop() {
    try {
      if (this.client) {
        this.status = 'stopped'; // Mark as manually stopped
        await this.client.destroy();
        this.client = null;
        this.isReady = false;
        this.status = 'disconnected';
        this.qrCode = null;
        this.phoneNumber = null;
        this.connectionStartTime = null;
        this.lastActivity = null;
        console.log('🛑 WhatsApp client stopped');
        return { success: true, message: 'WhatsApp client stopped' };
      }
      return { success: false, message: 'No client to stop' };
    } catch (error) {
      console.error('❌ Error stopping WhatsApp client:', error);
      throw error;
    }
  }

  // Auto-start method that runs when server starts
  async autoStart() {
    try {
      console.log('🤖 Auto-starting WhatsApp client...');
      console.log('📱 This will generate a QR code if no device is connected');
      
      // Check if we already have a session
      if (this.client && this.isReady) {
        console.log('✅ WhatsApp client already connected, skipping auto-start');
        return { success: true, message: 'Already connected', status: 'connected' };
      }
      
      // Start the client
      const result = await this.start();
      
      // Wait a bit for QR code to generate if needed
      if (this.status === 'starting') {
        console.log('⏳ Waiting for authentication or QR code...');
        // The QR code will be generated automatically if no session exists
      }
      
      return result;
    } catch (error) {
      console.error('❌ Auto-start failed:', error.message);
      return { success: false, error: error.message };
    }
  }

  // Enable/disable auto-start
  setAutoStart(enabled) {
    this.autoStartEnabled = enabled;
    console.log(`🤖 Auto-start ${enabled ? 'enabled' : 'disabled'}`);
  }

  getStatus() {
    const uptime = this.connectionStartTime 
      ? Math.floor((new Date() - this.connectionStartTime) / 1000)
      : 0;

    return {
      status: this.status,
      isReady: this.isReady,
      phoneNumber: this.phoneNumber,
      hasQRCode: !!this.qrCode,
      uptimeSeconds: uptime,
      lastActivity: this.lastActivity,
      connectionStartTime: this.connectionStartTime,
      autoStartEnabled: this.autoStartEnabled,
      timestamp: new Date().toISOString()
    };
  }

  getQRCode() {
    return this.qrCode;
  }

  getTerminalStatus() {
    const status = this.getStatus();
    let output = '\n📱 WhatsApp Status Report\n';
    output += '========================\n';
    output += `Status: ${status.status}\n`;
    output += `Ready: ${status.isReady ? '✅ Yes' : '❌ No'}\n`;
    output += `Auto-start: ${status.autoStartEnabled ? '✅ Enabled' : '❌ Disabled'}\n`;
    
    if (status.phoneNumber) {
      output += `Phone: ${status.phoneNumber}\n`;
    }
    
    if (status.uptimeSeconds > 0) {
      const hours = Math.floor(status.uptimeSeconds / 3600);
      const minutes = Math.floor((status.uptimeSeconds % 3600) / 60);
      const seconds = status.uptimeSeconds % 60;
      output += `Uptime: ${hours}h ${minutes}m ${seconds}s\n`;
    }
    
    if (status.lastActivity) {
      output += `Last Activity: ${status.lastActivity.toLocaleString()}\n`;
    }
    
    if (status.hasQRCode) {
      output += `QR Code: Available (scan to link)\n`;
    }
    
    output += '\n🔗 API Endpoints:\n';
    output += `- Status: http://localhost:3060/api/whatsapp/status\n`;
    output += `- QR Code: http://localhost:3060/api/whatsapp/qr\n`;
    output += `- Send Message: http://localhost:3060/api/whatsapp/send-message\n`;
    output += `- Check Number: http://localhost:3060/api/whatsapp/check-number\n`;
    
    return output;
  }

  async sendMessage(to, message) {
    try {
      if (!this.isReady || !this.client) {
        throw new Error('WhatsApp client is not ready');
      }

      const formattedNumber = to.replace(/\+/g, '') + '@c.us';
      const result = await this.client.sendMessage(formattedNumber, message);
      this.lastActivity = new Date();
      return { 
        success: true, 
        messageId: result.id._serialized,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  async isRegistered(number) {
    try {
      if (!this.isReady || !this.client) {
        throw new Error('WhatsApp client is not ready');
      }

      const formattedNumber = number.replace(/\+/g, '') + '@c.us';
      const isRegistered = await this.client.isRegisteredUser(formattedNumber);
      this.lastActivity = new Date();
      return isRegistered;
    } catch (error) {
      console.error('Error checking if number is registered:', error);
      throw error;
    }
  }

  async getChats() {
    try {
      if (!this.isReady || !this.client) {
        throw new Error('WhatsApp client is not ready');
      }

      const chats = await this.client.getChats();
      this.lastActivity = new Date();
      return chats.map(chat => ({
        id: chat.id._serialized,
        name: chat.name,
        isGroup: chat.isGroup,
        unreadCount: chat.unreadCount,
        lastMessage: chat.lastMessage ? {
          body: chat.lastMessage.body,
          timestamp: chat.lastMessage.timestamp
        } : null
      }));
    } catch (error) {
      console.error('Error getting chats:', error);
      throw error;
    }
  }
}

const whatsappService = new WhatsAppService();

module.exports = whatsappService; 