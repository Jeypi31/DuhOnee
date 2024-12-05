import React, { useState, useEffect } from "react";
import { Container, Box, TextField, Button, Typography, Grid, IconButton, InputAdornment } from "@mui/material";
import axios from "axios";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("ForgotPassword component mounted");
  }, []);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleCaptchaChange = (value) => {
    setCaptchaVerified(!!value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!captchaVerified) {
      setError("Please complete the reCAPTCHA.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/forgot-password", {
        email,
        password: newPassword,
      });

      console.log("Password change response:", response.data);
      setError("");
      setEmail("");
      setNewPassword("");
      setConfirmPassword("");

      navigate("/signin");
    } catch (error) {
      console.error("Error during POST request:", error);
      setError("Error updating password. Please try again.");
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <>
      <NavBar />
      <Box
        sx={{
          height: "100vh",
          width: "100%",
          background: "linear-gradient(to bottom right, black, #051b36)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container spacing={0} sx={{ padding: 4, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 4,
                borderRadius: "8px",
                width: "100%",
                maxWidth: 400,
                mx: "auto",
                backgroundColor: "rgba(28, 28, 28, 0.8)",
                border: "1px solid transparent",
                boxShadow: "0 0 1px 1px grey",
              }}
            >
              {/* Verified Icon */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <VerifiedUserIcon sx={{ color: "#00c853", fontSize: 60 }} />
              </Box>

              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  color: "#ffffff",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Forgot Password
              </Typography>
              {error && (
                <Typography variant="body2" sx={{ color: "#ff0000", textAlign: "center", mb: 2 }}>
                  {error}
                </Typography>
              )}

              <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={email}
                  onChange={handleEmailChange}
                  InputLabelProps={{ style: { color: "#ffffff" } }}
                  InputProps={{ style: { color: "#ffffff", border: '1px solid white' } }}
                  sx={{ backgroundColor: "#2a2a2a", borderRadius: "5px" }}
                />

                <TextField
                  label="New Password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={newPassword}
                  onChange={handlePasswordChange}
                  InputLabelProps={{ style: { color: "#ffffff" } }}
                  InputProps={{
                    style: { color: "#ffffff", border: '1px solid white' },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ backgroundColor: "#2a2a2a", borderRadius: "5px" }}
                />

                <TextField
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  InputLabelProps={{ style: { color: "#ffffff" } }}
                  InputProps={{
                    style: { color: "#ffffff" , border: '1px solid white' },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowConfirmPassword} edge="end">
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ backgroundColor: "#2a2a2a", borderRadius: "5px" }}
                />

                <ReCAPTCHA
                  sitekey="6LfExY0qAAAAAMabiwm7M24Sa9-1K7pL0ZO6YOdi"
                  onChange={handleCaptchaChange}
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 2,
                    mb: 2,
                    backgroundColor: "#051b36",
                    color: "#051b36",
                    "&:hover": {
                      backgroundColor: "#051b36",
                    },
                  }}
                  disabled={!captchaVerified}
                >
                  Change Password
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default ForgotPassword;
