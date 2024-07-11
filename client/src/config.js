const API_BASE_URL = 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  PRODUCTS_SEARCH: `${API_BASE_URL}/products/search`,
  CART: `${API_BASE_URL}/cart`,
  CART_ADD: `${API_BASE_URL}/cart/add`,
  CART_REMOVE: `${API_BASE_URL}/cart/remove`,
  PAYMENT_INTENT: `${API_BASE_URL}/payment/create-payment-intent`,
};