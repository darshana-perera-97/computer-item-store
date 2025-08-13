#!/usr/bin/env node

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

console.log('🚀 WhatsApp Web JS Authentication Script');
console.log('=====================================\n');

// Create WhatsApp client
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: false, // Set to false to see the browser
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu'
    ]
  }
});

// Event listeners
client.on('qr', (qr) => {
  console.log('\n📱 QR Code received!');
  console.log('Scan this QR code with your WhatsApp mobile app:\n');
  qrcode.generate(qr, { small: true });
  console.log('\n💡 Instructions:');
  console.log('1. Open WhatsApp on your phone');
  console.log('2. Go to Settings > Linked Devices');
  console.log('3. Tap "Link a Device"');
  console.log('4. Scan the QR code above');
  console.log('5. Wait for authentication...\n');
});

client.on('ready', () => {
  console.log('✅ WhatsApp client is ready!');
  console.log('📞 Connected with phone number:', client.info.wid.user);
  console.log('🔗 Your WhatsApp account is now linked!');
  console.log('\n💡 You can now:');
  console.log('- Close this terminal (Ctrl+C)');
  console.log('- Use the WhatsApp API endpoints');
  console.log('- Send messages programmatically');
  console.log('\n🚀 To use the API, make a POST request to:');
  console.log('http://localhost:3060/api/whatsapp/start');
  console.log('\n📊 Check status at:');
  console.log('http://localhost:3060/api/whatsapp/status');
});

client.on('authenticated', () => {
  console.log('🔐 Authentication successful!');
  console.log('⏳ Initializing WhatsApp client...');
});

client.on('auth_failure', (msg) => {
  console.error('❌ Authentication failed:', msg);
  console.log('💡 Please try again by restarting this script');
});

client.on('disconnected', (reason) => {
  console.log('🔌 WhatsApp client disconnected:', reason);
  console.log('💡 You may need to re-authenticate');
});

client.on('message', (message) => {
  console.log('📨 Message received:', message.body);
});

// Handle process termination
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down WhatsApp client...');
  try {
    await client.destroy();
    console.log('✅ WhatsApp client stopped successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error stopping client:', error);
    process.exit(1);
  }
});

// Start the client
console.log('🔄 Starting WhatsApp client...');
client.initialize()
  .then(() => {
    console.log('🚀 Client initialization started');
  })
  .catch((error) => {
    console.error('❌ Error starting client:', error);
    process.exit(1);
  }); 