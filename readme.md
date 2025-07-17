# Wanderlust API

## Description
Wanderlust API is a backend service built with Node.js, Express, and MongoDB for managing travel listings. It provides RESTful endpoints to fetch listings and supports seeding initial data.

## Prerequisites
- Node.js (v16+ recommended)
- npm
- MongoDB database (local or cloud)

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd wanderlust

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory (or rename `.env.sample`):

   ```env
   PORT=8080
   MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/wanderlust?retryWrites=true&w=majority
   ```

   Replace `MONGODB_URI` with your actual MongoDB connection string.

4. **Seed the database with initial data**

   This will populate your database with sample listings.

   ```bash
   npm run seed
   ```

5. **Start the server**

   ```bash
   npm start
   ```

6. **Access the API**

   By default, the server runs on port 8080. Access listings at:

   ```
   GET http://localhost:8080/api/v1/listings
   ```

---

## Scripts

* `npm start` — Starts the server.
* `npm run seed` — Runs the seed script to initialize the database.

---

## Environment Variables

Create a `.env` file in the root of your project based on this sample:

```env
# .env.sample

# Port on which the Express server will run
PORT=8080

# MongoDB connection URI (replace with your own connection string)
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/wanderlust?retryWrites=true&w=majority
```

Rename `.env.sample` to `.env` and update the values before running the app.

---



