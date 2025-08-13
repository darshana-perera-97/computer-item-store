// Example of how to use the configuration file
// This file demonstrates best practices for using the CONFIG object

// Example API service functions
class ApiService {
    // Get all computer items
    static async getComputerItems() {
        try {
            const response = await fetch(CONFIG.BACKEND_URL + CONFIG.API_ENDPOINTS.COMPUTER_ITEMS);
            return await response.json();
        } catch (error) {
            console.error('Error fetching computer items:', error);
            throw error;
        }
    }

    // Submit an order
    static async submitOrder(orderData) {
        try {
            const response = await fetch(CONFIG.BACKEND_URL + CONFIG.API_ENDPOINTS.ORDERS + '/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error submitting order:', error);
            throw error;
        }
    }

    // Authenticate user
    static async authenticate(credentials) {
        try {
            const response = await fetch(CONFIG.BACKEND_URL + CONFIG.API_ENDPOINTS.AUTH + '/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            });
            return await response.json();
        } catch (error) {
            console.error('Error authenticating:', error);
            throw error;
        }
    }

    // Send WhatsApp message
    static async sendWhatsAppMessage(messageData) {
        try {
            const response = await fetch(CONFIG.BACKEND_URL + CONFIG.API_ENDPOINTS.WHATSAPP + '/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messageData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error sending WhatsApp message:', error);
            throw error;
        }
    }
}

// Example utility functions using configuration
const Utils = {
    // Get full API URL for a specific endpoint
    getApiUrl: (endpoint) => {
        return CONFIG.BACKEND_URL + endpoint;
    },

    // Log application info
    logAppInfo: () => {
        console.log(`${CONFIG.APP_NAME} v${CONFIG.VERSION}`);
        console.log(`Backend URL: ${CONFIG.BACKEND_URL}`);
    },

    // Check if backend is accessible
    async checkBackendHealth() {
        try {
            const response = await fetch(CONFIG.BACKEND_URL + '/health');
            return response.ok;
        } catch (error) {
            console.error('Backend health check failed:', error);
            return false;
        }
    }
};

// Example usage:
// Utils.logAppInfo();
// const items = await ApiService.getComputerItems();
// const isHealthy = await Utils.checkBackendHealth();

// Export for use in other modules (if using ES6 modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ApiService, Utils };
}

// Make available globally for traditional script usage
window.ApiService = ApiService;
window.Utils = Utils; 