# 🛍️ Waste Sync - Optimized Product Search App

This is a full-stack product search platform built with **Next.js**, **Express**, and **MongoDB**. It demonstrates optimized querying, efficient pagination, and basic system architecture for scalable e-commerce product search.

---

## Setup & Running Instructions

### 📦 Prerequisites & Dependencies
- Node.js v18+
- MongoDB running locally (`mongodb://localhost:27017/`)
- Git
- faker-js/faker (for seeding the database)
-  axios
- cors
- dotenv
- express
- express-validator
- next
- react
- react-dom 

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

4. Start the backend server (needs to be executed from the root folder):
```bash
node backend/server.js
```

5. Start the frontend (Next.js): (run it in a new terminal) 
```bash
cd frontend
npm run dev
```

6. Seed the database (optional for testing, needs to be executed from root folder and running it in a new terminal):
```bash
node scripts/seed.js
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

- Indexes on category and tenant help optimize MongoDB queries.
- Pagination handled using `.skip()` and `.limit()` in MongoDB.
- Validations for all endpoints using `express-validator`.

---

## System Architecture

It can be broken down three different sections:
1. Frontend (Client Layer)
- Built using Next.js (React framework).
- Handles user input and renders product search and result views.
- Makes API requests to the backend using fetch.

2. Backend (API Layer)
- Built with Express.js.
- Exposes RESTful endpoints to support:
- Product search with optional filters (category, tenant)
- Product addition and deletion
- Pagination support
- Performs input validation using express-validator.

3. Database (Data Layer)
- Uses MongoDB as the database.
- Stores product documents in a products collection.
- Implements indexing on category and tenant fields to optimize search queries.
- Supports efficient skip() and limit() operations for paginated queries.

---

## Scalability Opportunities

The system now functions well for light use, but there are clear methods to scale it larger. On the database side of things, the capability to enable MongoDB replication will increase availability through data replication across nodes. For handling lots of data, sharding on something such as tenant or category would divide the load nice and evenly across machines.

The backend is stateless, which makes horizontal scaling easy. Multiple instances of the Express server can be run behind a load balancer like NGINX or AWS ELB to handle higher traffic. This would be a suitable setup in a containerized environment with Docker or a process manager like PM2.

It can also boost performance. Adding Redis to store often queried terms in a cache would reduce database queries. In the frontend, static content may be cached with a CDN to speed up response and lower server load.

If search complexity rises, the addition of a specialist engine like Elasticsearch or MongoDB Atlas Search would add support for autocomplete, fuzzy matching, and advanced filtering all of which are beyond the capabilities of simple MongoDB queries.

---

## 📄 License

MIT © Sumant Warhekar
