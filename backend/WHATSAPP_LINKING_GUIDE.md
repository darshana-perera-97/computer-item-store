# 📱 WhatsApp Account Linking Guide

This guide shows you **3 different ways** to link your WhatsApp account to the backend using terminal URLs and commands.

## 🚀 Method 1: Interactive CLI Tool (Recommended)

The easiest way to link your WhatsApp account:

```bash
npm run whatsapp-cli
```

This opens an interactive menu where you can:
1. Start WhatsApp client
2. Get QR code to scan
3. Check connection status
4. Send test messages
5. And more...

## 🔗 Method 2: HTTP Endpoints via Terminal

Use cURL commands to link your WhatsApp account:

### Step 1: Start the WhatsApp Client
```bash
curl -X POST http://localhost:3060/api/whatsapp/start
```

### Step 2: Get QR Code (Terminal-Friendly)
```bash
curl http://localhost:3060/api/whatsapp/qr/terminal
```

### Step 3: Check Status
```bash
curl http://localhost:3060/api/whatsapp/status/terminal
```

### Step 4: Verify Connection
```bash
curl http://localhost:3060/api/whatsapp/health
```

## 📱 Method 3: Standalone Authentication Script

Run the original authentication script:

```bash
npm run whatsapp-auth
```

This script:
- Opens a browser window
- Shows QR code in terminal
- Handles authentication automatically

## 📋 Complete Linking Workflow

### 1. Start Your Backend Server
```bash
cd backend
npm start
```

### 2. Link WhatsApp Account (Choose One Method)

#### Option A: CLI Tool
```bash
npm run whatsapp-cli
# Follow the interactive menu
```

#### Option B: HTTP Endpoints
```bash
# Start client
curl -X POST http://localhost:3060/api/whatsapp/start

# Get QR code
curl http://localhost:3060/api/whatsapp/qr/terminal

# Scan QR code with your phone
# Wait for authentication

# Check status
curl http://localhost:3060/api/whatsapp/status/terminal
```

#### Option C: Auth Script
```bash
npm run whatsapp-auth
# Scan QR code when displayed
```

### 3. Verify Connection
```bash
curl http://localhost:3060/api/whatsapp/status/terminal
```

You should see:
```
📱 WhatsApp Status Report
========================
Status: connected
Ready: ✅ Yes
Phone: [your phone number]
```

### 4. Test Sending Message
```bash
curl -X POST http://localhost:3060/api/whatsapp/send-message \
  -H "Content-Type: application/json" \
  -d '{
    "to": "+1234567890",
    "message": "Hello from Computer Store API!"
  }'
```

## 🔍 Troubleshooting

### Common Issues & Solutions

1. **"No QR code available"**
   ```bash
   # Make sure client is started first
   curl -X POST http://localhost:3060/api/whatsapp/start
   # Then get QR code
   curl http://localhost:3060/api/whatsapp/qr/terminal
   ```

2. **"WhatsApp client is not ready"**
   ```bash
   # Check current status
   curl http://localhost:3060/api/whatsapp/status/terminal
   # Wait for authentication to complete
   ```

3. **Authentication failed**
   ```bash
   # Stop and restart client
   curl -X POST http://localhost:3060/api/whatsapp/stop
   curl -X POST http://localhost:3060/api/whatsapp/start
   # Get new QR code
   curl http://localhost:3060/api/whatsapp/qr/terminal
   ```

4. **Server not running**
   ```bash
   # Start backend server
   npm start
   # Check if port 3060 is available
   ```

## 📊 Monitoring & Status

### Check Real-time Status
```bash
# Get detailed status
curl http://localhost:3060/api/whatsapp/status/terminal

# Get health check
curl http://localhost:3060/api/whatsapp/health

# Get all chats
curl http://localhost:3060/api/whatsapp/chats/terminal
```

### Status Values Explained
- `disconnected` - Client not connected
- `starting` - Client is starting up
- `qr_ready` - QR code available for scanning
- `authenticating` - Authentication in progress
- `connected` - Successfully connected to WhatsApp
- `auth_failed` - Authentication failed
- `error` - Error occurred

## 🛠️ Development & Debugging

### Enable Browser Visibility
For debugging, modify `services/whatsappService.js`:
```javascript
puppeteer: {
  headless: false, // Set to false to see the browser
  // ... other options
}
```

### Test All Endpoints
```bash
npm run test-whatsapp
```

### View Setup Guide
Visit: `http://localhost:3060/whatsapp-setup`

## 📱 Phone Setup Instructions

When you get the QR code:

1. **Open WhatsApp** on your phone
2. **Go to Settings** (three dots menu)
3. **Tap "Linked Devices"**
4. **Tap "Link a Device"**
5. **Scan the QR code** displayed in your terminal
6. **Wait for authentication** - you'll see "WhatsApp client is ready!" when successful

## 🔐 Security Notes

- WhatsApp sessions are stored locally in `./whatsapp-sessions/`
- Never share your session files
- The service runs in headless mode by default
- All API endpoints are public - add authentication for production

## 📝 Quick Reference Commands

```bash
# Start server
npm start

# Link WhatsApp (CLI)
npm run whatsapp-cli

# Link WhatsApp (HTTP)
curl -X POST http://localhost:3060/api/whatsapp/start
curl http://localhost:3060/api/whatsapp/qr/terminal

# Check status
curl http://localhost:3060/api/whatsapp/status/terminal

# Send message
curl -X POST http://localhost:3060/api/whatsapp/send-message \
  -H "Content-Type: application/json" \
  -d '{"to": "+1234567890", "message": "Test"}'

# Test everything
npm run test-whatsapp
```

## 🎯 Success Indicators

You'll know it's working when:

✅ You see "WhatsApp client is ready!" in terminal  
✅ Status shows "connected"  
✅ Phone number is displayed  
✅ You can send messages successfully  
✅ Health check returns "healthy"  

## 🆘 Need Help?

1. Check server logs for error messages
2. Verify server is running on port 3060
3. Ensure all dependencies are installed
4. Try the troubleshooting steps above
5. Use the test script: `npm run test-whatsapp`

Happy WhatsApp linking! 🎉 