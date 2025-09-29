# Credify Store - E-commerce Platform

A comprehensive e-commerce platform built with React, TypeScript, Express, and Tailwind CSS. Features a complete admin panel for managing categories, products, orders, users, and analytics.

## 🚀 Features

### Customer Features
- **Product Catalog** - Browse products by categories
- **Shopping Cart** - Add/remove items, manage quantities
- **User Authentication** - Login, register, profile management
- **Order Management** - Place orders, track order history
- **Product Search** - Find products easily
- **Responsive Design** - Works on all devices

### Admin Panel Features
- **Dashboard** - Overview of sales, orders, and analytics
- **Category Management** - CRUD operations for product categories
- **Product Management** - Full inventory management system
- **Order Management** - Process and track customer orders
- **User Management** - Manage customer accounts
- **Coupon System** - Create and manage discount codes
- **Analytics** - Business insights and reporting
- **Settings** - System configuration

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Express.js, Node.js
- **Database**: SQLite with Drizzle ORM
- **Routing**: Wouter
- **State Management**: React Query
- **UI Components**: Custom components with Tailwind CSS
- **Icons**: Heroicons
- **Build Tool**: Vite

## 📁 Project Structure

```
credify-store/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── admin/         # Admin panel components
│   │   ├── components/    # Reusable UI components
│   │   ├── contexts/      # React contexts
│   │   ├── lib/          # Utility libraries
│   │   └── pages/        # Application pages
├── server/                # Backend Express server
│   ├── routes.ts         # API routes
│   └── index.ts          # Server entry point
├── shared/               # Shared types and utilities
└── db/                  # Database files
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/siddiqeeshrestha/credify-store.git
   cd credify-store
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Main website: http://localhost:5001
   - Admin panel: http://localhost:5001/admin

### Admin Login Credentials
- **Email**: admin@credify.com
- **Password**: admin123

## 🏗 Production Deployment

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

## 📱 Admin Panel Routes

- `/admin` - Dashboard
- `/admin/categories` - Category Management
- `/admin/products` - Product Management  
- `/admin/orders` - Order Management
- `/admin/users` - User Management
- `/admin/coupons` - Coupon Management
- `/admin/analytics` - Analytics Dashboard
- `/admin/settings` - System Settings

## 🎨 Key Features Details

### Product Management
- Add, edit, delete products
- Inventory tracking
- Category assignment
- Image management
- Pricing and discounts

### Order Processing
- Order status tracking
- Payment processing
- Inventory updates
- Customer notifications

### User Management
- Customer account management
- Role-based permissions
- Activity tracking

### Analytics
- Sales reports
- User analytics
- Product performance
- Revenue tracking

## 🔒 Security Features

- Role-based authentication
- Session management
- Input validation
- CSRF protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Siddiqee Shrestha**
- GitHub: [@siddiqeeshrestha](https://github.com/siddiqeeshrestha)

## 🙏 Acknowledgments

- Built with modern web technologies
- Responsive design principles
- User-friendly admin interface
- Comprehensive e-commerce functionality

---

**Happy Coding! 🚀**