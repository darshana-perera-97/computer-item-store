#!/usr/bin/env node

const axios = require('axios');
const readline = require('readline');

const BASE_URL = 'http://localhost:3060/api/whatsapp';

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

async function makeRequest(method, endpoint, data = null) {
  try {
    const config = {
      method,
      url: `${BASE_URL}${endpoint}`,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (data) {
      config.data = data;
    }

    const response = await axios(config);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || error.response.data.message || 'Request failed');
    } else if (error.request) {
      throw new Error('No response received. Is the server running?');
    } else {
      throw new Error(error.message);
    }
  }
}

async function startWhatsApp() {
  try {
    logInfo('Starting WhatsApp client...');
    const result = await makeRequest('POST', '/start');
    logSuccess('WhatsApp client started successfully!');
    logInfo('Now get the QR code to scan...');
    return true;
  } catch (error) {
    logError(`Failed to start WhatsApp: ${error.message}`);
    return false;
  }
}

async function autoStartWhatsApp() {
  try {
    logInfo('Auto-starting WhatsApp client...');
    const result = await makeRequest('POST', '/auto-start');
    if (result.success) {
      logSuccess('WhatsApp auto-start completed!');
      logInfo(`Status: ${result.message}`);
      if (result.status === 'connected') {
        logSuccess('WhatsApp is already connected and ready!');
      } else {
        logInfo('QR code should be generated - scan it with your phone');
      }
    } else {
      logWarning(`Auto-start completed with warning: ${result.error}`);
    }
    return true;
  } catch (error) {
    logError(`Failed to auto-start WhatsApp: ${error.message}`);
    return false;
  }
}

async function getQRCode() {
  try {
    logInfo('Getting QR code...');
    const result = await makeRequest('GET', '/qr/terminal');
    console.log(result);
    return true;
  } catch (error) {
    logError(`Failed to get QR code: ${error.message}`);
    return false;
  }
}

async function getStatus() {
  try {
    logInfo('Getting WhatsApp status...');
    const result = await makeRequest('GET', '/status/terminal');
    console.log(result);
    return true;
  } catch (error) {
    logError(`Failed to get status: ${error.message}`);
    return false;
  }
}

async function sendMessage() {
  try {
    const to = await question('Enter phone number (with country code, e.g., +1234567890): ');
    const message = await question('Enter message: ');
    
    logInfo('Sending message...');
    const result = await makeRequest('POST', '/send-message', { to, message });
    logSuccess('Message sent successfully!');
    logInfo(`Message ID: ${result.data.messageId}`);
    return true;
  } catch (error) {
    logError(`Failed to send message: ${error.message}`);
    return false;
  }
}

async function checkNumber() {
  try {
    const number = await question('Enter phone number to check (with country code): ');
    
    logInfo('Checking number...');
    const result = await makeRequest('POST', '/check-number', { number });
    const isRegistered = result.data.isRegistered;
    
    if (isRegistered) {
      logSuccess(`✅ ${number} is registered on WhatsApp`);
    } else {
      logWarning(`❌ ${number} is not registered on WhatsApp`);
    }
    return true;
  } catch (error) {
    logError(`Failed to check number: ${error.message}`);
    return false;
  }
}

async function getChats() {
  try {
    logInfo('Getting chats...');
    const result = await makeRequest('GET', '/chats/terminal');
    console.log(result);
    return true;
  } catch (error) {
    logError(`Failed to get chats: ${error.message}`);
    return false;
  }
}

async function stopWhatsApp() {
  try {
    logInfo('Stopping WhatsApp client...');
    const result = await makeRequest('POST', '/stop');
    logSuccess('WhatsApp client stopped successfully!');
    return true;
  } catch (error) {
    logError(`Failed to stop WhatsApp: ${error.message}`);
    return false;
  }
}

async function toggleAutoStart() {
  try {
    const currentStatus = await makeRequest('GET', '/status');
    const isEnabled = currentStatus.data.autoStartEnabled;
    
    if (isEnabled) {
      logInfo('Disabling auto-start...');
      const result = await makeRequest('POST', '/auto-start/disable');
      logSuccess('Auto-start disabled successfully!');
    } else {
      logInfo('Enabling auto-start...');
      const result = await makeRequest('POST', '/auto-start/enable');
      logSuccess('Auto-start enabled successfully!');
    }
    return true;
  } catch (error) {
    logError(`Failed to toggle auto-start: ${error.message}`);
    return false;
  }
}

function question(query) {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

function showMenu() {
  console.log('\n📱 WhatsApp CLI Menu');
  console.log('====================');
  console.log('1. Start WhatsApp client');
  console.log('2. Auto-start WhatsApp client');
  console.log('3. Get QR code');
  console.log('4. Check status');
  console.log('5. Send message');
  console.log('6. Check if number is registered');
  console.log('7. Get chats');
  console.log('8. Stop WhatsApp client');
  console.log('9. Toggle auto-start');
  console.log('10. Exit');
  console.log('');
}

async function main() {
  log('🚀 WhatsApp CLI Tool', 'bright');
  log('===================\n', 'bright');
  
  logInfo('Make sure your backend server is running on http://localhost:3060');
  logInfo('You can also visit http://localhost:3060/whatsapp-setup for setup guide\n');

  while (true) {
    showMenu();
    
    try {
      const choice = await question('Select an option (1-10): ');
      
      switch (choice.trim()) {
        case '1':
          await startWhatsApp();
          break;
        case '2':
          await autoStartWhatsApp();
          break;
        case '3':
          await getQRCode();
          break;
        case '4':
          await getStatus();
          break;
        case '5':
          await sendMessage();
          break;
        case '6':
          await checkNumber();
          break;
        case '7':
          await getChats();
          break;
        case '8':
          await stopWhatsApp();
          break;
        case '9':
          await toggleAutoStart();
          break;
        case '10':
          logInfo('Goodbye! 👋');
          rl.close();
          process.exit(0);
        default:
          logWarning('Invalid option. Please select 1-10.');
      }
    } catch (error) {
      logError(`An error occurred: ${error.message}`);
    }
    
    await question('\nPress Enter to continue...');
  }
}

// Handle process termination
process.on('SIGINT', () => {
  logInfo('\nShutting down... 👋');
  rl.close();
  process.exit(0);
});

// Check if server is running before starting
async function checkServer() {
  try {
    await axios.get('http://localhost:3060/api/health');
    logSuccess('Server is running! 🚀');
    return true;
  } catch (error) {
    logError('Server is not running! Please start your backend server first.');
    logInfo('Run: npm start (in backend directory)');
    return false;
  }
}

// Start the CLI
checkServer().then((isRunning) => {
  if (isRunning) {
    main();
  } else {
    process.exit(1);
  }
}); 