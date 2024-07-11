import React from 'react';
import { Typography, Container, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container maxWidth="md">
      <Typography variant="h2" gutterBottom>Welcome to Grocery Delivery App</Typography>
      <Typography variant="h5" gutterBottom>
        Find fresh groceries and have them delivered to your doorstep!
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/search">
        Start Shopping
      </Button>
    </Container>
  );
}

export default Home;