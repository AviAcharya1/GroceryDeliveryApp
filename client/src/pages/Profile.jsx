import React, { useState, useContext, useEffect } from 'react';
import { Typography, TextField, Button, Grid, Paper, makeStyles } from '@material-ui/core';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { API_ENDPOINTS } from '../config';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
}));

function Profile() {
  const classes = useStyles();
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        API_ENDPOINTS.UPDATE_PROFILE,
        { name, email, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(response.data);
      setPassword('');
      alert('Profile updated successfully');
    } catch (error) {
      setError('Failed to update profile. Please try again.');
    }
  };

  return (
    <Paper className={classes.paper}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="New Password (leave blank to keep current)"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Typography color="error">{error}</Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Update Profile
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default Profile;