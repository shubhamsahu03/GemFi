# 🌟 Advanced MERN AI Finance SaaS Platform - GemFi

## 🗝️ Key Features: 👇

* 🔐 Authentication (Email + Password with JWT)
* 🏢 Create & Edit Transactions
* 📤 Upload & Scan Receipt with AI
* 📈 Beautiful Advanced Analytics  (MongoDB Aggregate Pipeline)
* 📊 Expenses Breakdown Pie Chart
* 📈 Income & Expense Line Chart
* 📅 Filter by Date Ranges — like Last 30 Days etc.
* ♻️ Recurring Transactions with Cron Job
* 📄 Auto-Generated Monthly Report (Emailed to User)
* 📥 CSV transaction Import
* 🔍 Filter & Search
* 📅 Pagination
* 🗑️ Bulk Delete
* ➕ Duplicate Transactions
* 🧑‍💼 Upload Profile Photo (Cloudinary)
* 🌐 Built with MERN Stack (Node.js, MongoDB, React, TypeScript)

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/GemFi.git
cd GemFi
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a .env file and add the following:

Server Side
```bash
MONGO_URI="isert-your-mongodb-url"
GEMINI_API_KEY="insert-your-gemini-api-key"

JWT_SECRET="Your-jwt-secret"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
CLOUDINARY_CLOUD_NAME="your-cloudinary-name"
FRONTEND_ORIGIN="http://localhost:5173"
PORT=8000
NODE_ENV=development
RESEND_API_KEY="your-resend-api-key"
```

Client Side
```bash
VITE_API_URL=http://localhost:8000/api
VITE_REDUX_PERSIST_SECRET_KEY=your-reduc-presist-secret-key
```


### 4. Run the development server
```bash
npm run dev
```

