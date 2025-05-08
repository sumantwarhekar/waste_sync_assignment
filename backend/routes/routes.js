const express = require('express');
const {
  getProducts,
  countProducts,
  addProduct,
  removeProduct,
} = require('../models/products');
const { query, body, validationResult } = require('express-validator');

const router = express.Router();

//
// 🔒 Validation Middleware
//
const validateSearchParams = [
  query('category').optional().isString().withMessage('Category must be a string'),
  query('tenant').optional().isString().withMessage('Tenant must be a string'),
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.warn('❌ Validation failed (search params)', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateAddProduct = [
  body('name').isString().withMessage('Name must be a string'),
  body('category').isString().withMessage('Category must be a string'),
  body('tenant').isString().withMessage('Tenant must be a string'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('description').optional().isString().withMessage('Description must be a string if provided'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.warn('❌ Validation failed (add product)', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateRemoveProduct = [
  query('id').isMongoId().withMessage('Invalid product ID'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.warn('❌ Validation failed (remove product)', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

//
// 🚀 Routes
//

// GET /api/products/search
router.get('/search', validateSearchParams, async (req, res) => {
  const { category, tenant } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 25;

  const query = {};
  if (category) query.category = category;
  if (tenant) query.tenant = tenant;

  try {
    const products = await getProducts(query, page, limit);
    const total = await countProducts(query);

    return res.status(200).json({
      total,
      page,
      pageSize: products.length,
      products,
    });
  } catch (err) {
    console.error('Error fetching products:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /api/products/add
router.post('/add', validateAddProduct, async (req, res) => {
  const { name, category, tenant, price, description } = req.body;

  const newProduct = {
    name,
    category,
    tenant,
    price,
    description,
    createdAt: new Date(),
  };

  try {
    await addProduct(newProduct);
    return res.status(201).json({
      message: 'Product added successfully',
      product: newProduct,
    });
  } catch (err) {
    console.error('🔥 Failed to add product:', err);
    return res.status(500).json({ error: 'Failed to add product' });
  }
});

// DELETE /api/products/remove
router.delete('/remove', validateRemoveProduct, async (req, res) => {
  const { id } = req.query;

  try {
    const deletedCount = await removeProduct(id);

    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    return res.status(200).json({ message: 'Product removed successfully' });
  } catch (err) {
    console.error('🔥 Failed to remove product:', err);
    return res.status(500).json({ error: 'Failed to remove product' });
  }
});

module.exports = router;
