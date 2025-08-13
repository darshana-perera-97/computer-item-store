const express = require('express');
const router = express.Router();
const whatsappService = require('../services/whatsappService');

// Submit order and send WhatsApp message
router.post('/submit', async (req, res) => {
  try {
    const orderData = req.body;
    
    if (!orderData) {
      return res.status(400).json({
        success: false,
        error: 'Order data is required',
        timestamp: new Date().toISOString()
      });
    }

    // Format the WhatsApp message
    const message = formatOrderMessage(orderData);
    
    // Send WhatsApp message to the specified number
    const whatsappResult = await whatsappService.sendMessage('+94771461925', message);
    
    if (whatsappResult.success) {
      res.json({
        success: true,
        message: 'Order submitted successfully! WhatsApp message sent.',
        whatsappResult: whatsappResult,
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to send WhatsApp message',
        whatsappError: whatsappResult.error,
        timestamp: new Date().toISOString()
      });
    }
    
  } catch (error) {
    console.error('Error submitting order:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Format order data into a readable WhatsApp message
function formatOrderMessage(orderData) {
  const { product, customer, delivery, notes } = orderData;
  
  let message = `🛒 *NEW ORDER RECEIVED* 🛒\n\n`;
  
  // Product details
  message += `📦 *Product Details:*\n`;
  message += `   • Name: ${product.name}\n`;
  message += `   • Price: $${product.price}\n`;
  message += `   • Category: ${product.category}\n\n`;
  
  // Customer information
  message += `👤 *Customer Information:*\n`;
  message += `   • Name: ${customer.firstName} ${customer.lastName}\n`;
  message += `   • Email: ${customer.email}\n`;
  message += `   • Phone: ${customer.phone}\n\n`;
  
  // Delivery address
  message += `📍 *Delivery Address:*\n`;
  message += `   • Street: ${delivery.address}\n`;
  message += `   • City: ${delivery.city}\n`;
  message += `   • State: ${delivery.state}\n`;
  message += `   • ZIP: ${delivery.zipCode}\n`;
  message += `   • Country: ${delivery.country}\n\n`;
  
  // Additional notes
  if (notes && notes.trim()) {
    message += `📝 *Additional Notes:*\n`;
    message += `   ${notes}\n\n`;
  }
  
  // Order timestamp
  message += `⏰ *Order Time:* ${new Date().toLocaleString()}\n`;
  message += `🆔 *Order ID:* ${generateOrderId()}\n\n`;
  
  message += `✅ *Order Status:* Pending\n`;
  message += `📞 *Contact Customer:* ${customer.phone}\n`;
  
  return message;
}

// Generate a simple order ID
function generateOrderId() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `ORD-${timestamp}-${random}`.toUpperCase();
}

module.exports = router; 