# 🛍️ Waste Sync - Optimized Product Search App

This is a full-stack product search platform built with **Next.js**, **Express**, and **MongoDB**. It demonstrates optimized querying, efficient pagination, and basic system architecture for scalable e-commerce product search.

---

## Setup & Running Instructions

### 📦 Prerequisites
- Node.js v18+
- MongoDB running locally (`mongodb://localhost:27017/`)
- Git

### Installation

1. Clone the repo:
```bash
git clone https://github.com/sumantwarhekar/waste_sync_assignment.git
cd waste_sync_assignment
```

2. Install dependencies:
```bash
npm install
```

3. Set environment variables:
Create a `.env.local` file in the root and add:
```
MONGODB_URI=mongodb://localhost:27017/
```

4. Start the backend server:
```bash
node backend/server.js
```

5. Start the frontend (Next.js):
```bash
npm run dev
```

6. Seed the database (optional for testing):
```bash
node backend/seed.js
```

---

## How It Works

This project implements a product search API and frontend for an e-commerce-like setup:

### Frontend (Next.js)
- `/`: Home with a "Products" button
- `/products`: Lists all products with pagination
- `/search`: Allows search by category, tenant, or both with pagination support

### Backend (Express + MongoDB)
- **`GET /api/products/search`**
  - Params: `category`, `tenant`, `page`, `limit`
  - Returns paginated product list
- **`POST /api/products/add`**
  - Adds a new product (validated input)
- **`DELETE /api/products/remove?id=`**
  - Removes product by Mongo `_id`

---

## Performance & Optimization Notes

- **Indexes on category and tenant** help optimize MongoDB queries.
- Pagination handled using `.skip()` and `.limit()` in MongoDB.
- Validations for all endpoints using `express-validator`.

---

## System Architecture

```mermaid
graph TD
  UI[User Interface (Next.js)] --> API[Express.js API Server]
  API --> DB[(MongoDB)]
```

---

## Scalability Opportunities

- **Database Scaling**: Use MongoDB replication/sharding or Atlas.
- **Backend Scaling**: Deploy Express via Docker, use load balancing.
- **Caching**: Add Redis for repeated queries.
- **Search Engine**: Integrate MongoDB Atlas Search / Elasticsearch for fuzzy & advanced queries.

---

## 📄 License

MIT © Sumant Warhekar
