const { ObjectId } = require('mongodb');
const { getDB } = require('../config/database');

const collectionName = 'products';

// Add new product
const addProduct = async (productData) => {
  const db = getDB();
  const collection = db.collection(collectionName);
  const result = await collection.insertOne(productData);
  return result.insertedId;
};

// Get paginated products
const getProducts = async (query, page = 1, limit = 10) => {
  const db = getDB();
  const collection = db.collection(collectionName);
  return await collection.find(query).skip((page - 1) * limit).limit(limit).toArray();
};

// Count total products for pagination
const countProducts = async (query) => {
  const db = getDB();
  const collection = db.collection(collectionName);
  return await collection.countDocuments(query);
};

// Delete product by ID
const removeProduct = async (id) => {
  const db = getDB();
  const collection = db.collection(collectionName);
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount;
};

module.exports = {
  addProduct,
  getProducts,
  countProducts,
  removeProduct,
};
