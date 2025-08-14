// Configuration file for the frontend application
// Store all configuration constants here for easy maintenance

const CONFIG = {
    // Backend API configuration
    // BACKEND_URL: 'http://localhost:3060', // Change this to your actual backend URL
    BACKEND_URL: 'http://69.197.187.24:3060', // Change this to your actual backend URL
    
    // API endpoints
    API_ENDPOINTS: {
        AUTH: '/api/auth',
        COMPUTER_ITEMS: '/api/computer-items',
        ORDERS: '/api/orders',
        WHATSAPP: '/api/whatsapp'
    },
    
    // Other configuration constants can be added here
    APP_NAME: 'Computer Item Store',
    VERSION: '1.0.0'
};

// Export for use in other modules (if using ES6 modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}

// Make available globally for traditional script usage
window.CONFIG = CONFIG;

// Log when configuration is loaded
console.log('Configuration loaded successfully:', {
    BACKEND_URL: CONFIG.BACKEND_URL,
    APP_NAME: CONFIG.APP_NAME,
    VERSION: CONFIG.VERSION
}); 