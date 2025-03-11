# Jignesh Node.js Test

## Description

This project is a RESTful API for a Multi-functional Product Management and Order System, built using Node.js, Express, and MongoDB. It includes features for product management, order handling, user authentication, and email notifications.

## Features

### **Product Management**

- Add new products with images.
- Update product details.
- List products with filtering, pagination, and sorting.
- Add reviews and display average ratings.

### **Order Management**

- Place new orders with validation.
- Update order status.
- Retrieve specific orders with product details and total price.
- List orders with filtering and pagination.

### **Authentication & Security**

- JWT-based authentication for protected routes.
- Input validation and error handling.

### **Additional Features**

- Image uploads using Multer.
- Nodemailer for email notifications.
- Swagger documentation.

## Installation

### **Prerequisites**

- Node.js (v16 or later)
- MongoDB (installed locally or a cloud-based instance)

### **Steps to Install and Run**

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/jignesh_nodejs_test.git
   cd jignesh_nodejs_test
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file and configure the following variables:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   SMTP_HOST=your_smtp_host
   SMTP_PORT=your_smtp_port
   SMTP_USER=your_email
   SMTP_PASS=your_email_password
   ```

4. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### **Product Management**

- `POST /api/products` - Add a new product.
- `PATCH /api/products/:id` - Update product details.
- `GET /api/products` - List products with filtering, sorting, and pagination.
- `POST /api/products/:id/reviews` - Add a review to a product.

### **Order Management**

- `POST /api/orders` - Place a new order.
- `PATCH /api/orders/:id` - Update order status.
- `GET /api/orders/:id` - Retrieve order details.
- `GET /api/orders` - List all orders with filtering and pagination.

### **Authentication**

- `POST /api/auth/register` - Register a new user.
- `POST /api/auth/login` - User login and JWT token issuance.

## Technologies Used

- Node.js
- Express.js
- MongoDB + Mongoose
- Multer (for image uploads)
- Nodemailer (for email notifications)
- JWT (for authentication)
- ESLint (for code linting)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the ISC License.

## Author

[Jigneshsingh Kushvaha](https://github.com/Jigneshsingh-growexxer)
