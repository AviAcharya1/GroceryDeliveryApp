import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, Button, Container } from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Cart() {
  const [cart, setCart] = useState({ items: [] });
  const history = useHistory();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(response.data);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  };

  const removeItem = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const totalAmount = cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>Your Cart</Typography>
      {cart.items.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <>
          <List>
            {cart.items.map((item) => (
              <ListItem key={item.product._id}>
                <ListItemText
                  primary={item.product.name}
                  secondary={`Quantity: ${item.quantity} - Price: $${item.product.price * item.quantity}`}
                />
                <Button onClick={() => removeItem(item.product._id)}>Remove</Button>
              </ListItem>
            ))}
          </List>
          <Typography variant="h6">Total: ${totalAmount.toFixed(2)}</Typography>
          <Button variant="contained" color="primary" onClick={() => history.push('/checkout')}>
            Proceed to Checkout
          </Button>
        </>
      )}
    </Container>
  );
}

export default Cart;