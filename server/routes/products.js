const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    const products = await Product.find({ name: { $regex: query, $options: 'i' } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Search failed' });
  }
});

module.exports = router;