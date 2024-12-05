import React, { useState } from 'react';
import {
  Container, Box, TextField, Button, Typography, Link, Grid, IconButton, InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar.jsx';
import Footer from '../components/Footer.jsx';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [focusedField, setFocusedField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSignIn = async (event) => {
    event.preventDefault();

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/signin', formData);

      console.log("Response from backend:", response.data);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);

      if (response.data.redirectTo) {
        navigate(response.data.redirectTo);
      } else {
        navigate('/homepage');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          minHeight: '100vh',
          minWidth: '100%',
          backgroundColor: 'white',
        }}
      >
        <Grid container spacing={0} sx={{ borderRadius: 2, padding: 0, marginLeft: -3 }}>
          {/* Left Side with Image and Features */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundImage: 'url("https://www.krenerbookkeeping.com/wp-content/uploads/2018/07/computer-blue-opacity-background.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: '#ffffff',
              textAlign: 'left',
              padding: 4,
            }}
          >

          <Box
          component="img"
          src="https://cdn.discordapp.com/attachments/1296104834432368797/1311562875893977168/LOGO_PARA_KAY_PJ.png?ex=6751389d&is=674fe71d&hm=3012b156ff56ad5c30caeb429c35c97af28e9ea62abc66f6ab24ff70edd9a5ab&" // Replace this with your image URL
          alt="Feature Image"
          sx={{
          width: '60%',
          height: 'auto',
          borderRadius: 2,
          }}
          />
            
            <Typography
              variant="body1"
              sx={{
                marginTop: 2,
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              }}
            >
             " It's Not Just The One, It's DuhOne. "
            </Typography>
            
          </Grid>

          {/* Right Side with Form */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 30,
                width: '500%',
                maxWidth: 923,
                background: 'linear-gradient(to bottom right, #051b36 , #10151f)',
                height: '100%',
              }}
            >
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  color: '#ffffff',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                }}
              >
                Sign in to your account
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                sx={{ color: '#ffffff', textAlign: 'center' }}
              >
                Please enter your details
              </Typography>
              {error && (
                <Typography
                  variant="body2"
                  sx={{
                    color: '#ff0000',
                    textAlign: 'center',
                    mb: 2,
                  }}
                >
                  {error}
                </Typography>
              )}
              <Box component="form" noValidate autoComplete="off" onSubmit={handleSignIn}>
                <TextField
                  label="Email"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  error={!!error}
                  helperText={error}
                  InputLabelProps={{ style: { color: '#b5b5b5' } }}
                  InputProps={{
                    style: {
                      color: '#ffffff',
                      border:
                        focusedField === 'email'
                          ? '1px solid #787878'
                          : '1px solid #787878',
                      height: '60px',
                    },
                  }}
                  sx={{
                    backgroundColor: '#000000',
                    borderRadius: '10px',
                    mb: 4,
                  }}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                />
                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <TextField
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={!!error}
                    helperText={error}
                    InputLabelProps={{ style: { color: '#b5b5b5' } }}
                    InputProps={{
                      style: {
                        color: '#ffffff',
                        border:
                          focusedField === 'password'
                            ? '1px solid #787878'
                            : '1px solid #787878',
                        height: '60px',
                      },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      backgroundColor: '#000000',
                      borderRadius: '10px',
                    }}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                  />
                  <Link
                    href="/forgot-password"
                    variant="body2"
                    sx={{
                      position: 'absolute',
                      top: '-10%',
                      right: '3%',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                    }}
                  >
                    Forgot Password?
                  </Link>
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 5,
                    mb: 4,
                    backgroundColor: '#051b36',
                    color: '#000000',
                    width: '50%',
                    borderRadius: '30px',
                    marginLeft: '25%',
                    height: '60px',
                    fontSize: '18px',
                    boxShadow: "0 0 1px 1px black",
                  }}
                >
                  Sign in
                </Button>
                <Typography variant="body2" sx={{ color: '#ffffff', textAlign: 'center', }}>
                  Don't have an account?{' '}
                  <Link href="/signup" variant="body2" sx={{ color: '#ffffff' }}>
                    Sign up
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default SignIn;
