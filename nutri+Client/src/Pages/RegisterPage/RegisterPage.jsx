import React, { useState } from "react";
import CustomCard from "../../Components/CustomCard/CustomCard";
import { Alert, Box, Button, Link, TextField } from "@mui/material";
import axios from "axios";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    let newErrors = [];

    if (!validateEmail(email)) {
      newErrors.push("Invalid email format");
    }

    if (password !== passwordConfirm || password === "" || passwordConfirm === "") {
      newErrors.push("Passwords do not match");
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }


    try {
      const response = await axios.post("http://localhost:3000/api/user/register", {
        username,
        password,
        email,
      });

      if (response.status === 201) {
        // Registration successful
        window.location.href = "/login"; // Navigate to login page
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response.status === 409) {
          newErrors.push("User already registered");
        } else {
          newErrors.push("Registration failed");
        }
      } else {
        newErrors.push("Something went wrong");
      }
      setErrors(newErrors);
    }
  };

  return (
    <div className="register-page">
      <div className="logo">
        <img src="/logo.png" alt="Logo" />
      </div>
      <CustomCard
        title="Register"
        text="Enter your information to register"
        color={"black"}
      >
        <Box component="form" noValidate autoComplete="off">
          <div className="input-group">
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              required
              onChange={(e) => setUsername(e.target.value)}
              sx={{
                marginBottom: "10px",
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "black",
                  fontWeight: "bold",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#B81D33",
                  },
                  "&:hover fieldset": {
                    borderColor: "#B81D33",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#B81D33",
                  },
                },
              }}
            />
            <TextField
              id="password"
              type="password"
              label="Password"
              required
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                marginBottom: "10px",
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "black",
                  fontWeight: "bold",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#B81D33",
                  },
                  "&:hover fieldset": {
                    borderColor: "#B81D33",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#B81D33",
                  },
                },
              }}
            />
            <TextField
              id="passwordConfirm"
              type="password"
              label="Repeat Password"
              variant="outlined"
              required
              onChange={(e) => setPasswordConfirm(e.target.value)}
              sx={{
                marginBottom: "10px",
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "black",
                  fontWeight: "bold",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#B81D33",
                  },
                  "&:hover fieldset": {
                    borderColor: "#B81D33",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#B81D33",
                  },
                },
              }}
            />
            <TextField
              id="email"
              type="email"
              label="Email"
              variant="outlined"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              sx={{
                marginBottom: "10px",
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "black",
                  fontWeight: "bold",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#B81D33",
                  },
                  "&:hover fieldset": {
                    borderColor: "#B81D33",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#B81D33",
                  },
                },
              }}
            />
            {errors.length > 0 &&
              errors.map((error, index) => (
                <Alert key={index} severity="error" onClose={() => {
                  let newErrors = [...errors];
                  newErrors.splice(index, 1);
                  setErrors(newErrors);
                }}>
                  {error}
                </Alert>
              ))}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleRegister}
              sx={{
                marginTop: "10px",
                marginBottom: "10px",
                backgroundColor: "#B81D33",
                "&:hover": {
                  backgroundColor: "#B81D33",
                },
              }}
            >
              Register
            </Button>
          </div>
          <Link href="/">Already registered? Go to Login!</Link>
        </Box>
      </CustomCard>
    </div>
  );
};

export default RegisterPage;
