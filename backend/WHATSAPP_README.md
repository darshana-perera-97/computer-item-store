# WhatsApp Integration Guide

This backend includes a comprehensive WhatsApp integration using `whatsapp-web.js` that allows you to link your WhatsApp account and send/receive messages programmatically.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Start the Server
```bash
npm start
```

The server will start on `http://localhost:3060`

### 3. Link Your WhatsApp Account

You have **3 ways** to link your WhatsApp account:

#### Option A: Using the CLI Tool (Recommended)
```bash
npm run whatsapp-cli
```
This opens an interactive menu where you can:
- Start the WhatsApp client
- Get QR code to scan
- Check status
- Send messages
- And more...

#### Option B: Using the NPM Script
```bash
npm run whatsapp-auth
```
This runs the standalone authentication script that shows QR code in terminal.

#### Option C: Using HTTP Endpoints
```bash
# 1. Start WhatsApp client
curl -X POST http://localhost:3060/api/whatsapp/start

# 2. Get QR code (terminal-friendly)
curl http://localhost:3060/api/whatsapp/qr/terminal

# 3. Check status
curl http://localhost:3060/api/whatsapp/status/terminal
```

## 📱 How to Link WhatsApp

1. **Start the client** using any of the methods above
2. **Get the QR code** - it will be displayed in your terminal
3. **Open WhatsApp on your phone**
4. **Go to Settings > Linked Devices**
5. **Tap "Link a Device"**
6. **Scan the QR code** displayed in your terminal
7. **Wait for authentication** - you'll see "WhatsApp client is ready!" when successful

## 🔗 Available Endpoints

### Core Endpoints
- `POST /api/whatsapp/start` - Start WhatsApp client
- `POST /api/whatsapp/stop` - Stop WhatsApp client
- `GET /api/whatsapp/status` - Get status (JSON)
- `GET /api/whatsapp/status/terminal` - Get status (terminal-friendly)
- `GET /api/whatsapp/qr` - Get QR code (JSON)
- `GET /api/whatsapp/qr/terminal` - Get QR code (terminal-friendly)

### Messaging Endpoints
- `POST /api/whatsapp/send-message` - Send a message
- `POST /api/whatsapp/check-number` - Check if number is registered
- `GET /api/whatsapp/chats` - Get all chats (JSON)
- `GET /api/whatsapp/chats/terminal` - Get all chats (terminal-friendly)

### Health & Monitoring
- `GET /api/whatsapp/health` - WhatsApp service health check
- `GET /api/health` - Overall API health check

## 💻 Terminal-Friendly Endpoints

Endpoints ending with `/terminal` return plain text formatted for terminal display:

```bash
# Get status in terminal format
curl http://localhost:3060/api/whatsapp/status/terminal

# Get QR code in terminal format
curl http://localhost:3060/api/whatsapp/qr/terminal

# Get chats in terminal format
curl http://localhost:3060/api/whatsapp/chats/terminal
```

## 📨 Sending Messages

### Using cURL
```bash
curl -X POST http://localhost:3060/api/whatsapp/send-message \
  -H "Content-Type: application/json" \
  -d '{
    "to": "+1234567890",
    "message": "Hello from Computer Store API!"
  }'
```

### Using the CLI Tool
```bash
npm run whatsapp-cli
# Then select option 4 (Send message)
```

## 🔍 Checking Numbers

### Using cURL
```bash
curl -X POST http://localhost:3060/api/whatsapp/check-number \
  -H "Content-Type: application/json" \
  -d '{"number": "+1234567890"}'
```

## 📊 Monitoring Status

### Check Current Status
```bash
curl http://localhost:3060/api/whatsapp/status/terminal
```

### Health Check
```bash
curl http://localhost:3060/api/whatsapp/health
```

## 🛠️ Troubleshooting

### Common Issues

1. **"No QR code available"**
   - Make sure you've started the WhatsApp client first
   - Use `POST /api/whatsapp/start` before getting QR code

2. **"WhatsApp client is not ready"**
   - Wait for authentication to complete
   - Check status with `GET /api/whatsapp/status`

3. **Authentication failed**
   - Restart the client with `POST /api/whatsapp/stop` then `POST /api/whatsapp/start`
   - Make sure your phone has internet connection

4. **Server not running**
   - Start the backend server with `npm start`
   - Check if port 3060 is available

### Debug Mode

For debugging, you can modify the WhatsApp service to show browser:
```javascript
// In services/whatsappService.js, change:
headless: false, // Set to false to see the browser
```

## 📁 File Structure

```
backend/
├── scripts/
│   ├── whatsapp-auth.js      # Standalone auth script
│   └── whatsapp-cli.js       # Interactive CLI tool
├── services/
│   └── whatsappService.js    # Core WhatsApp service
├── routes/
│   └── whatsapp.js           # HTTP endpoints
└── index.js                   # Main server file
```

## 🔐 Security Notes

- WhatsApp sessions are stored locally in `./whatsapp-sessions/`
- Never share your session files
- The service runs in headless mode by default
- All API endpoints are public - add authentication if needed for production

## 🚀 Production Considerations

- Add authentication middleware to protect endpoints
- Use environment variables for configuration
- Implement rate limiting
- Add logging and monitoring
- Use HTTPS in production
- Consider using a process manager like PM2

## 📚 Additional Resources

- [WhatsApp Web JS Documentation](https://docs.whatsapp.com/)
- [Express.js Documentation](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/)

## 🆘 Getting Help

If you encounter issues:

1. Check the server logs for error messages
2. Verify the server is running on port 3060
3. Ensure all dependencies are installed
4. Check if the port is not blocked by firewall
5. Try restarting the WhatsApp client

## 📝 Example Workflow

```bash
# 1. Start server
npm start

# 2. In another terminal, start WhatsApp client
curl -X POST http://localhost:3060/api/whatsapp/start

# 3. Get QR code
curl http://localhost:3060/api/whatsapp/qr/terminal

# 4. Scan QR code with your phone

# 5. Check status
curl http://localhost:3060/api/whatsapp/status/terminal

# 6. Send a test message
curl -X POST http://localhost:3060/api/whatsapp/send-message \
  -H "Content-Type: application/json" \
  -d '{"to": "+1234567890", "message": "Test message"}'
```

Happy WhatsApp integration! 🎉 