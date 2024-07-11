import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Typography, Container } from '@material-ui/core';
import CheckoutForm from '../components/CheckoutForm';

const stripePromise = loadStripe('your_stripe_publishable_key');

function Checkout() {
  // In a real app, you'd calculate this based on the cart items
  const amount = 1000; // $10.00

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Checkout</Typography>
      <Elements stripe={stripePromise}>
        <CheckoutForm amount={amount} />
      </Elements>
    </Container>
  );
}

export default Checkout;