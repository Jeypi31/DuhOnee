import React, { useState } from 'react';
import { 
  Container, Box, TextField, Button, Typography, Link, Grid, IconButton, InputAdornment 
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Settings as SettingsIcon, Build as BuildIcon, WifiTethering as WifiTetheringIcon, FiveG as FiveGIcon } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { validateSignUpField, validateSignUpForm } from '../utilities/SignUpValidation';
import NavBar from '../components/NavBar.jsx';
import Footer from '../components/Footer.jsx';



const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

    const fieldError = validateSignUpField(field, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: fieldError,
    }));
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    const formErrors = validateSignUpForm(formData);
    setErrors(formErrors);

    if (Object.values(formErrors).some((error) => error)) {
      setError('Please fill up all fields!');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/signup', formData);
      console.log('Sign up successful:', response.data);
      navigate('/signin');
    } catch (error) {
      console.error('Error signing up:', error);
      setError(error.response?.data?.message || 'Failed to sign up. Please try again.');
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
          marginTop: '-2%',
          background: 'linear-gradient(to bottom right, black, #051b36)',

        }}
        
      >
        
          {/* Left: Sign-up Form */}
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              p: 35,
              ml: -3,
              borderRadius: '0px',
              background: 'linear-gradient(to bottom right, #051b36, #10151f)',
              width: '500%', maxWidth: 923, backgroundColor: 'rgba(19, 19, 19)', height: '100%' }}>
            
            <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 14 14"
  id="User-Circle-Single--Streamline-Core"
  height={150}
  width={150}
  style={{
    position: 'absolute', // Change to 'relative', 'fixed', or 'static' as needed
    top: '120px',         // Adjust the top position
    left: '390px', 
    bottom: '20px' ,     // Adjust the left position
    zIndex: 1,           // Control stacking order
  }}
>
  <desc>{"User Circle Single Streamline Icon: https://streamlinehq.com"}</desc>
  <g id="user-circle-single--circle-geometric-human-person-single-user">
    <path
      id="Union"
      fill="#000000"
      fillRule="evenodd"
      d="M14 7c0 1.87687 -0.7387 3.5812 -1.9411 4.8382 -1.27 1.3275 -3.0572 2.156 -5.03801 2.1618L7 14l-0.02089 0c-1.98081 -0.0058 -3.76805 -0.8343 -5.03798 -2.1618C0.738659 10.5812 0 8.87687 0 7c0 -3.86599 3.13401 -7 7 -7 3.866 0 7 3.13401 7 7Zm-2.7572 3.5C10.2341 9.27847 8.70794 8.49997 7 8.49997c-1.70794 0 -3.23406 0.7785 -4.24285 2.00003 1.00879 1.2215 2.53491 2 4.24285 2 1.70794 0 3.2341 -0.7785 4.2428 -2ZM7.00012 7.49997c1.38071 0 2.5 -1.11929 2.5 -2.5s-1.11929 -2.5 -2.5 -2.5 -2.5 1.11929 -2.5 2.5 1.11929 2.5 2.5 2.5Z"
      clipRule="evenodd"
      strokeWidth={1}
    />
  </g>
</svg>


              <Typography variant="h4" gutterBottom sx={{ color: '#ffffff',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                  mt: 5, }}>
                Sign up
              </Typography>
              
              {error && (
                <Typography variant="body2" sx={{ color: '#ff0000', textAlign: 'center', mb: 2 }}>
                  {error}
                </Typography>
              )}
              <Box component="form" noValidate autoComplete="off" onSubmit={handleSignUp}>
              <TextField
  label="First Name"
  fullWidth
  margin="normal"
  variant="outlined"
  error={!!errors.firstName}
  helperText={errors.firstName}
  InputLabelProps={{ style: { color: '#b5b5b5' } }}
  InputProps={{
    style: { color: '#ffffff', height: '60px' },
  }}
  sx={{
    backgroundColor: '#000000',
    borderRadius: '10px',
    mb: 2,
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#787878', // White border for the TextField
      },
      '&:hover fieldset': {
        borderColor: '#787878', // Hover effect for the white border
      },
      '&.Mui-focused fieldset': {
        borderColor: '#787878', // Focus effect for the white border
      },
    },
  }}
  value={formData.firstName}
  onChange={(e) => handleInputChange('firstName', e.target.value)}
/>
<TextField
  label="Last Name"
  fullWidth
  margin="normal"
  variant="outlined"
  error={!!errors.lastName}
  helperText={errors.lastName}
  InputLabelProps={{ style: { color: '#b5b5b5' } }}
  InputProps={{
    style: { color: '#ffffff', height: '60px' },
  }}
  sx={{
    backgroundColor: '#000000',
    borderRadius: '10px',
    mb: 2,
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#787878',
      },
      '&:hover fieldset': {
        borderColor: '#787878',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#787878',
      },
    },
  }}
  value={formData.lastName}
  onChange={(e) => handleInputChange('lastName', e.target.value)}
/>
<TextField
  label="Email"
  fullWidth
  margin="normal"
  variant="outlined"
  error={!!errors.email}
  helperText={errors.email}
  InputLabelProps={{ style: { color: '#b5b5b5' } }}
  InputProps={{
    style: { color: '#ffffff', height: '60px' },
  }}
  sx={{
    backgroundColor: '#000000',
    borderRadius: '10px',
    mb: 2,
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#787878',
      },
      '&:hover fieldset': {
        borderColor: '#787878',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#787878',
      },
    },
  }}
  value={formData.email}
  onChange={(e) => handleInputChange('email', e.target.value)}
/>
<TextField
  label="Password"
  type={showPassword ? 'text' : 'password'}
  fullWidth
  margin="normal"
  variant="outlined"
  error={!!errors.password}
  helperText={errors.password}
  InputLabelProps={{ style: { color: '#b5b5b5', height: '60px' } }}
  InputProps={{
    style: { color: '#ffffff' },
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
    mb: 2,
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#787878',
      },
      '&:hover fieldset': {
        borderColor: '#787878',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#787878',
      },
    },
  }}
  value={formData.password}
  onChange={(e) => handleInputChange('password', e.target.value)}
/>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 3,
                    mb: 4,
                    backgroundColor: '#051b36',
                    color: '#000000',
                    width: '50%',
                    borderRadius: '30px',
                    marginLeft: '25%',
                    height: '60px',
                    fontSize: '18px',
                    boxShadow: "0 0 5px 1px rgba(0, 1, 1, 0.7)",

                  }}
                >
                  Sign Up
                </Button>

                <Typography variant="body2" sx={{ color: '#ffffff', textAlign: 'center' }}>
                  Already have an account? <Link href="/signin" variant="body2" sx={{ color: '#ffffff' }}>Sign in</Link>
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Features Section */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 10, mt: 30 }}>
              {/* Feature 1 */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <SettingsIcon sx={{ fontSize: 50, color: '#ffffff', ml: 30 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    Adaptable performance
                  </Typography>
                  <Typography variant="body1">
                    Our product effortlessly adjusts to your needs, boosting efficiency and simplifying your tasks.
                  </Typography>
                </Box>
              </Box>

              {/* Feature 2 */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <BuildIcon sx={{ fontSize: 40, color: '#ffffff', ml: 30 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    Built to last
                  </Typography>
                  <Typography variant="body1">
                    Experience unmatched durability that goes above and beyond with lasting investment.
                  </Typography>
                </Box>
              </Box>

              {/* Feature 3 */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <WifiTetheringIcon sx={{ fontSize: 40, color: '#ffffff', ml: 30 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    Great User Experience
                  </Typography>
                  <Typography variant="body1">
                    Integrate our product into your routine with an intuitive and easy-to-use interface.
                  </Typography>
                </Box>
              </Box>

               {/* Feature 4 */}
               <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <FiveGIcon sx={{ fontSize: 40, color: '#ffffff', ml: 30 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    Fast Internet Speed Connection
                  </Typography>
                  <Typography variant="body1">
                  Experience lightning-fast connections that keep your website running seamlessly, ensuring a smooth and efficient user experience every time.                  </Typography>
                </Box>
              </Box>
            </Box>
      </Container>
      <Footer />
    </>
  );
}

export default SignUp;
