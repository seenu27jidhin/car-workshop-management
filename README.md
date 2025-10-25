## 🚀 Features

### 👥 Employee Management

- **User Authentication & Authorization**

  - Secure user registration and login with JWT tokens
  - Role-based access control (USER, ADMIN, EMPLOYEE, MANAGER)
  - Password encryption using bcryptjs
  - Protected routes with middleware authentication

- **Employee Profiles**
  - Complete employee information management
  - Registration number tracking
  - Department and position assignment
  - Employee status management (Active/Inactive)

### 📋 Leave Management System

- **Leave Request Processing**

  - Multiple leave categories (Sick, Casual, Annual, Unpaid, Emergency, Others)
  - Comprehensive leave status tracking
  - Approval workflow with manager/admin oversight
  - Leave modification and change requests
  - Detailed leave history and reporting

- **Advanced Leave Features**
  - Search and filter functionality
  - Pagination for large datasets
  - Date range filtering
  - Employee search by registration number
  - Automated leave calculations

### 🛒 E-commerce Integration

- **Product Management**

  - Product catalog with categories (Clothing, Electronics, Books, Other)
  - Image upload support with Multer
  - Stock management
  - Price tracking
  - Product search and filtering

- **Shopping Cart System**

  - Add/remove items from cart
  - Quantity management
  - Wishlist functionality
  - Cart persistence per user
  - Automatic total calculation

- **Order Processing**
  - Complete order management
  - Multiple payment methods (COD, Credit Card, Debit Card, UPI, Net Banking, Wallet)
  - Order status tracking (Pending, Confirmed, Processing, Shipped, Delivered, Cancelled)
  - Shipping address management
  - Order history and tracking

## 🛠️ Technology Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

### Frontend Components

- **React Hooks** - State management (`useCart.js`)
- **CSS** - Styling (`CartItems.css`)
- **JavaScript** - Client-side logic

## 📁 Project Structure

```
server/
├── db/
│   ├── index.js                 # Database connection
│   └── models/
│       ├── user_schema.js       # User/Employee model
│       ├── employee_schema.js   # Employee details model
│       ├── leave_schema.js      # Leave request model
│       ├── product_schema.js    # Product catalog model
│       ├── cart-schema.js       # Shopping cart model
│       └── order-schema.js      # Order management model
├── routes/
│   ├── index.js                 # Main router configuration
│   ├── user_routes.js           # Authentication routes
│   ├── leave_routes_clean.js    # Leave management routes
│   ├── product_routes.js        # Product management routes
│   ├── cart_routes.js           # Shopping cart routes
│   └── order_routes.js          # Order processing routes
├── middleware/
│   ├── auth.js                  # JWT authentication middleware
│   └── check-token.js           # Token validation middleware
├── hooks/
│   └── useCart.js               # React cart hook
├── public/
│   └── uploads/                 # File upload directory
├── server.js                    # Main server file
└── package.json                 # Dependencies and scripts
```

## 🔧 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd server
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:

   ```env
   PORT=3000
   JWT_SECRET=your_jwt_secret_key
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 📊 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Employee Management

- `GET /api/leave/search-employee` - Search employees by registration number
- `GET /api/leave/leavespopulated` - Get all leave requests with filters

### Leave Management

- `POST /api/leave/` - Create leave request
- `GET /api/leave/all-leaves` - Get all leave requests
- `PUT /api/leave/:id/status` - Update leave status
- `GET /api/leave/:id` - Get single leave request

### Product Management

- `POST /api/products/` - Create product
- `GET /api/products/` - Get all products with filters
- `GET /api/products/:id` - Get single product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Shopping Cart

- `POST /api/cart/add` - Add item to cart
- `GET /api/cart/` - Get user's cart
- `PUT /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/remove` - Remove item from cart

### Order Management

- `POST /api/orders/` - Create order
- `GET /api/orders/` - Get user's orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/status` - Update order status

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Role-based access control
- Protected API endpoints
- Input validation and sanitization
- CORS configuration

## 📱 Frontend Integration

The backend is designed to work seamlessly with React frontend components:

- `CartItems.js` - Shopping cart interface
- `CartPage.js` - Cart management page
- `ViewLevRequest.js` - Leave request viewer
- Custom React hooks for state management

## 🚀 Deployment

The application is ready for deployment on platforms like:

- Heroku
- AWS
- DigitalOcean
- Vercel
- Railway

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Built with ❤️ for efficient employee and e-commerce management.


**Note**: This system provides a complete solution for organizations that need both employee management and e-commerce capabilities in a single integrated platform.
