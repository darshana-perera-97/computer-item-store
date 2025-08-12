# Computer Item Store Backend

A Node.js backend API for managing computer store inventory and user authentication.

## Features

- **Computer Items Management**: CRUD operations for computer products
- **User Authentication**: Registration, login, and profile management
- **RESTful API**: Clean and consistent API endpoints
- **Error Handling**: Comprehensive error handling and validation
- **CORS Support**: Cross-origin resource sharing enabled
- **Modular Structure**: Organized code structure for scalability

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```env
   PORT=3060
   HOST=localhost
   NODE_ENV=development
   JWT_SECRET=your-super-secret-jwt-key
   DATABASE_URL=mongodb://localhost:27017/computer-store
   CORS_ORIGIN=*
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon
- `npm test` - Run tests (to be implemented)

## API Endpoints

### Base URL
```
http://localhost:3060/api
```

### Computer Items

#### Get All Items
```
GET /computer-items
```

**Query Parameters:**
- `category` - Filter by category (e.g., Laptop, Accessories)
- `brand` - Filter by brand
- `inStock` - Filter by stock status (true/false)
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter

#### Get Single Item
```
GET /computer-items/:id
```

#### Create New Item
```
POST /computer-items
```

**Body:**
```json
{
  "name": "Product Name",
  "category": "Category",
  "price": 99.99,
  "brand": "Brand Name",
  "specs": {
    "processor": "Intel i7",
    "ram": "16GB"
  }
}
```

#### Update Item
```
PUT /computer-items/:id
```

#### Delete Item
```
DELETE /computer-items/:id
```

### Authentication

#### User Registration
```
POST /auth/register
```

**Body:**
```json
{
  "username": "username",
  "email": "user@example.com",
  "password": "password123"
}
```

#### User Login
```
POST /auth/login
```

**Body:**
```json
{
  "username": "username",
  "password": "password123"
}
```

#### Get Profile
```
GET /auth/profile
```

**Headers:**
```
Authorization: Bearer <token>
```

#### Update Profile
```
PUT /auth/profile
```

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "username": "newusername",
  "email": "newemail@example.com"
}
```

### Health Check
```
GET /health
```

## Project Structure

```
backend/
├── config/
│   └── config.js          # Configuration settings
├── middleware/
│   └── auth.js            # Authentication middleware
├── routes/
│   ├── index.js           # Main router
│   ├── auth.js            # Authentication routes
│   └── computerItems.js   # Computer items routes
├── index.js               # Main server file
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## Middleware

### Authentication Middleware
- `authenticateToken` - Verifies JWT tokens
- `requireRole` - Role-based access control

## Data Models

### Computer Item
```javascript
{
  id: Number,
  name: String,
  category: String,
  price: Number,
  brand: String,
  specs: Object,
  inStock: Boolean,
  createdAt: String,
  updatedAt: String
}
```

### User
```javascript
{
  id: Number,
  username: String,
  email: String,
  password: String,
  role: String,
  createdAt: String,
  updatedAt: String
}
```

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "error": "Error message"
}
```

## Success Responses

Successful operations return:

```json
{
  "success": true,
  "data": {...},
  "message": "Operation message"
}
```

## Development Notes

- Currently uses in-memory storage (mock data)
- JWT authentication is mocked for development
- CORS is enabled for all origins in development
- Error handling includes try-catch blocks and proper HTTP status codes

## Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- Real JWT implementation
- Password hashing with bcrypt
- Input validation with Joi or express-validator
- Rate limiting
- Logging with Winston
- Testing with Jest
- API documentation with Swagger

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

ISC 