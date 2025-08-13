# Frontend Configuration System

This directory contains the configuration system for the frontend application.

## Files

### `config.js`
The main configuration file that stores all configuration constants including:
- Backend URL
- API endpoints
- Application information
- Other configuration constants

### `api-example.js`
An example file demonstrating how to use the configuration for API calls and utility functions.

### `main.js`
The main application JavaScript file (already updated to use the configuration).

## Usage

### 1. Including the Configuration

The configuration file is automatically loaded in `index.html` before `main.js`:

```html
<script src="js/config.js"></script>
<script src="js/main.js"></script>
```

### 2. Accessing Configuration Values

Once loaded, you can access configuration values through the global `CONFIG` object:

```javascript
// Get backend URL
const backendUrl = CONFIG.BACKEND_URL;

// Get API endpoints
const authEndpoint = CONFIG.API_ENDPOINTS.AUTH;
const ordersEndpoint = CONFIG.API_ENDPOINTS.ORDERS;

// Get application info
const appName = CONFIG.APP_NAME;
const version = CONFIG.VERSION;
```

### 3. Making API Calls

Use the configuration for consistent API calls:

```javascript
// Instead of hardcoding URLs
fetch('http://localhost:3000/api/orders/submit', {...})

// Use configuration
fetch(CONFIG.BACKEND_URL + CONFIG.API_ENDPOINTS.ORDERS + '/submit', {...})
```

### 4. Using the ApiService Class

The `api-example.js` file provides a convenient `ApiService` class:

```javascript
// Get computer items
const items = await ApiService.getComputerItems();

// Submit an order
const result = await ApiService.submitOrder(orderData);

// Authenticate user
const auth = await ApiService.authenticate(credentials);
```

## Configuration Structure

```javascript
const CONFIG = {
    BACKEND_URL: 'http://localhost:3000',
    API_ENDPOINTS: {
        AUTH: '/api/auth',
        COMPUTER_ITEMS: '/api/computer-items',
        ORDERS: '/api/orders',
        WHATSAPP: '/api/whatsapp'
    },
    APP_NAME: 'Computer Item Store',
    VERSION: '1.0.0'
};
```

## Benefits

1. **Centralized Configuration**: All configuration values are in one place
2. **Easy Maintenance**: Change backend URL or endpoints in one file
3. **Environment Switching**: Easy to switch between development, staging, and production
4. **Consistency**: All API calls use the same base configuration
5. **Reusability**: Configuration can be used across multiple JavaScript files

## Environment-Specific Configuration

For different environments, you can modify the `config.js` file:

```javascript
// Development
BACKEND_URL: 'http://localhost:3000'

// Staging
BACKEND_URL: 'https://staging-api.yourapp.com'

// Production
BACKEND_URL: 'https://api.yourapp.com'
```

## Adding New Configuration

To add new configuration values:

1. Add them to the `CONFIG` object in `config.js`
2. Document them in this README
3. Use them consistently across your application

## Best Practices

1. **Never hardcode URLs** - Always use configuration
2. **Keep configuration centralized** - Don't scatter configuration across multiple files
3. **Use descriptive names** - Make configuration keys self-explanatory
4. **Document changes** - Update this README when adding new configuration
5. **Version control** - Include configuration files in version control (but consider environment-specific overrides) 