const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/';
const dbName = 'waste_sync';

let db;

const connectDB = async () => {
  try {
    const client = new MongoClient(uri); // Updated for driver v4+
    await client.connect();
    db = client.db(dbName);
    console.log('MongoDB connected successfully!');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

const getDB = () => {
  if (!db) {
    throw new Error('Database not connected');
  }
  return db;
};

module.exports = { connectDB, getDB };
