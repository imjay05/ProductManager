# Product Manager

A clean, modern full-stack MERN application for efficient product management with real-time statistics and an intuitive user interface.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)
![MongoDB](https://img.shields.io/badge/mongodb-latest-green.svg)

---

## ✨ Features

- **Product Management**: Add, edit, and delete products with ease
- **Real-time Statistics**: Track total products, inventory value, and category distribution
- **Responsive Design**: Beautiful, mobile-friendly interface that works on all devices
- **RESTful API**: Clean backend architecture following best practices
- **Live Updates**: See changes reflected instantly without page refresh

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (latest version) - [Download](https://www.mongodb.com/try/download/community)
- **Git** (optional, for cloning) - [Download](https://git-scm.com/)
- **npm** or **yarn** package manager (comes with Node.js)

---

## 🚀 Installation & Setup

### 1. Clone or Download the Repository

```bash
# Clone via Git
git clone https://github.com/your-username/product-manager.git
cd product-manager
```

Or download the ZIP file and extract it to your desired location.

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

### 3. Environment Configuration

Create a `.env` file in the `backend` folder:

```bash
touch .env  # On Windows: type nul > .env
```

Add the following configuration:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/productmanager
NODE_ENV=development
```

> **Note**: Replace `MONGO_URI` with your MongoDB Atlas connection string if using cloud hosting:
> ```
> MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/productmanager
> ```

### 4. Start MongoDB

Ensure MongoDB is running on your system:

```bash
# On macOS/Linux
sudo systemctl start mongod

# On Windows (if installed as service)
net start MongoDB

# Or run manually
mongod
```

### 5. Start the Backend Server

```bash
# From the backend directory
npm start
```

You should see:
```
✓ Server running on port 5000
✓ MongoDB connected successfully
```

Backend API is now live at `http://localhost:5000`

### 6. Frontend Setup

Open a **new terminal window/tab** and navigate to the frontend directory:

```bash
cd frontend
npm install
```

### 7. Start the Frontend Server

```bash
npm start
```

The application will automatically open at `http://localhost:3000`

---

## 📱 Usage

1. **View Dashboard**: See your product inventory and statistics at a glance
2. **Add Product**: Click "Add New Product" button and fill in the details:
   - Product Name
   - Price
   - Description
   - Category
3. **Edit Product**: Click the edit icon on any product card to modify details
4. **Delete Product**: Click the delete icon to remove a product (with confirmation)
5. **Track Statistics**: Monitor total products, inventory value, and category distribution in real-time

---

## 🧪 Sample Data for Testing

You can quickly test the application by adding these sample products:

```json
[
  {
    "name": "Graphic Cotton T-shirt",
    "price": 19.99,
    "description": "Soft and breathable cotton t-shirt with cool graphic print.",
    "category": "Clothing"
  },
  {
    "name": "Samsung Galaxy S23",
    "price": 999.97,
    "description": "Latest flagship smartphone with amazing camera and performance.",
    "category": "Electronics"
  },
  {
    "name": "Laptop",
    "price": 999.99,
    "description": "High-performance laptop for work and gaming.",
    "category": "Electronics"
  },
  {
    "name": "Wireless Mouse",
    "price": 29.99,
    "description": "Ergonomic wireless mouse with precision tracking.",
    "category": "Accessories"
  },
  {
    "name": "Coffee Maker",
    "price": 79.99,
    "description": "Programmable coffee maker with thermal carafe.",
    "category": "Appliances"
  }
]
```

**Option 1**: Add via UI (recommended for testing the interface)

**Option 2**: Insert directly into MongoDB:
```bash
mongosh
use productmanager
db.products.insertMany([...paste sample data...])
```

---

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **dotenv** - Environment variable management
- **cors** - Cross-origin resource sharing

### Frontend
- **React.js** - UI library
- **Axios** - HTTP client
- **CSS3** - Styling
- **React Hooks** - State management

---

## 📂 Project Structure

```
product-manager/
├── backend/
│   ├── models/
│   │   └── Product.js
│   ├── routes/
│   │   └── products.js
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
└── README.md
```

---

## 🔧 Configuration

### Default Ports
- **Backend**: `http://localhost:5000`
- **Frontend**: `http://localhost:3000`

### Changing Ports

**Backend**: Modify `PORT` in `.env` file
```env
PORT=8000
```

**Frontend**: Create `.env` file in `frontend/` directory
```env
PORT=3001
```

---

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB service is running
- Verify `MONGO_URI` in `.env` is correct
- Check firewall settings if using cloud MongoDB

### Port Already in Use
```bash
# Find and kill process on port 5000 (macOS/Linux)
lsof -ti:5000 | xargs kill -9

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### CORS Errors
- Ensure backend CORS is properly configured
- Verify frontend is making requests to correct backend URL

---

## 🎨 Customization

### Styling
Modify `frontend/src/App.css` to customize the UI theme, colors, and layout.

### API Endpoints
Extend `backend/routes/products.js` to add new features like:
- Product search/filtering
- Image uploads
- User authentication
- Inventory tracking

---

## 📝 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | Get all products |
| POST | `/products` | Create new product |
| PUT | `/products/:id` | Update product |
| DELETE | `/products/:id` | Delete product |

### Example Request
```javascript
// Create Product
POST /api/products
Content-Type: application/json

{
  "name": "Product Name",
  "price": 99.99,
  "description": "Product description",
  "category": "Category Name"
}
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---




## 👤 Author

**Jay Shelke**

- GitHub: (https://github.com/imjay05)
- LinkedIn: (https://www.linkedin.com/in/jay-shelke-4323a22a5/)
- Email: imjaydigambarshelke@gmail.com

---

## 🙏 Acknowledgments

- MongoDB documentation
- React.js community
- Express.js team
- All contributors and testers

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Open an issue on GitHub
3. Contact the maintainer directly

---
