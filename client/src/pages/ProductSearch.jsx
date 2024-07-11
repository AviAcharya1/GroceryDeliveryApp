import React, { useState, useContext } from 'react';
import { TextField, Button, Grid, Card, CardContent, Typography, CardMedia, CardActions, CircularProgress, Snackbar, Pagination } from '@material-ui/core';
import axios from 'axios';
import { API_ENDPOINTS } from '../config';
import { AuthContext } from '../contexts/AuthContext';

function ProductSearch() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_ENDPOINTS.PRODUCTS_SEARCH}?query=${query}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Search failed:', error);
      setError('Failed to fetch products. Please try again.');
    }
    setLoading(false);
  };

  const addToCart = async (productId) => {
    if (!user) {
      setError('Please login to add items to cart');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.post(API_ENDPOINTS.CART_ADD, 
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setError('Product added to cart');
    } catch (error) {
      console.error('Failed to add to cart:', error);
      setError('Failed to add product to cart. Please try again.');
    }
  };

  return (
    <div>
      <TextField
        label="Search products"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button onClick={handleSearch} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Search'}
      </Button>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography>{product.description}</Typography>
                <Typography>${product.price}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => addToCart(product._id)}>
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
        message={error}
      />
    </div>
  );
}

export default ProductSearch;