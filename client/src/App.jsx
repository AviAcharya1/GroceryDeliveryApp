import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductSearch from './pages/ProductSearch';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile.jsx';
import OrderHistory from './pages/OrderHistory';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/search" component={ProductSearch} />
              <PrivateRoute path="/cart" component={Cart} />
              <PrivateRoute path="/checkout" component={Checkout} />
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/order-history" component={OrderHistory} />
            </Switch>
          </Layout>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;