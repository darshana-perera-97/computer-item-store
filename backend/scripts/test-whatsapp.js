#!/usr/bin/env node

const axios = require('axios');

const BASE_URL = 'http://localhost:3060';

async function testEndpoints() {
  console.log('🧪 Testing WhatsApp Integration\n');
  
  try {
    // Test 1: Check if server is running
    console.log('1️⃣ Testing server connection...');
    const healthResponse = await axios.get(`${BASE_URL}/api/health`);
    console.log('✅ Server is running:', healthResponse.data.status);
    
    // Test 2: Check WhatsApp service health
    console.log('\n2️⃣ Testing WhatsApp service health...');
    try {
      const whatsappHealth = await axios.get(`${BASE_URL}/api/whatsapp/health`);
      console.log('✅ WhatsApp service:', whatsappHealth.data.data.status);
      console.log('🤖 Auto-start enabled:', whatsappHealth.data.data.autoStartEnabled);
    } catch (error) {
      console.log('⚠️  WhatsApp service not ready (this is normal if not started)');
    }
    
    // Test 3: Get WhatsApp status
    console.log('\n3️⃣ Testing WhatsApp status endpoint...');
    try {
      const statusResponse = await axios.get(`${BASE_URL}/api/whatsapp/status`);
      console.log('✅ Status endpoint working:', statusResponse.data.data.status);
      console.log('🤖 Auto-start:', statusResponse.data.data.autoStartEnabled ? 'Enabled' : 'Disabled');
    } catch (error) {
      console.log('⚠️  Status endpoint error:', error.response?.data?.error || error.message);
    }
    
    // Test 4: Test terminal endpoints
    console.log('\n4️⃣ Testing terminal-friendly endpoints...');
    try {
      const terminalStatus = await axios.get(`${BASE_URL}/api/whatsapp/status/terminal`);
      console.log('✅ Terminal status endpoint working');
    } catch (error) {
      console.log('⚠️  Terminal status endpoint error:', error.response?.data?.error || error.message);
    }
    
    // Test 5: Test auto-start functionality
    console.log('\n5️⃣ Testing auto-start functionality...');
    try {
      const autoStartResponse = await axios.post(`${BASE_URL}/api/whatsapp/auto-start`);
      console.log('✅ Auto-start endpoint working:', autoStartResponse.data.message);
    } catch (error) {
      console.log('⚠️  Auto-start endpoint error:', error.response?.data?.error || error.message);
    }
    
    // Test 6: Check available routes
    console.log('\n6️⃣ Testing main routes...');
    const mainResponse = await axios.get(`${BASE_URL}/`);
    console.log('✅ Main endpoint working');
    console.log('📱 Available WhatsApp endpoints:');
    Object.keys(mainResponse.data.endpoints.whatsapp).forEach(key => {
      console.log(`   - ${key}: ${mainResponse.data.endpoints.whatsapp[key]}`);
    });
    
    // Test 7: Check auto-start info
    console.log('\n7️⃣ Checking auto-start configuration...');
    if (mainResponse.data.autoStart) {
      console.log('✅ Auto-start feature:', mainResponse.data.autoStart.description);
      console.log('🤖 Control:', mainResponse.data.autoStart.control);
    }
    
    console.log('\n🎉 All tests completed!');
    console.log('\n💡 Next steps:');
    console.log('   1. WhatsApp should auto-start when server starts');
    console.log('   2. If no device connected, QR code will be generated');
    console.log('   3. Check status: GET /api/whatsapp/status/terminal');
    console.log('   4. Use CLI tool: npm run whatsapp-cli');
    console.log('   5. Control auto-start: POST /api/whatsapp/auto-start/enable or /disable');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Make sure your server is running:');
      console.log('   npm start');
    }
  }
}

// Run tests
testEndpoints(); 