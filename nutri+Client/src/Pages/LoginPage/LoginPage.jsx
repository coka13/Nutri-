import React, { useState } from "react";
import CustomCard from "../../Components/CustomCard/CustomCard";
import { Box, Button, Link, TextField } from "@mui/material";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query"; // Import useMutation from @tanstack/react-query
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/authSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  // Define your mutation function
  const { mutate, isLoading, error } = useMutation({
    mutationFn: async () => {
      const response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const jsonData = await response.json();
      return jsonData;
    },
    onSuccess: (data) => {
      console.log("Login successful:", data);
      if (data!=="User not found" && data!=="Invalid password" && data!=="Password not found for user"){
      dispatch(setUser(data))

        navigate("/home");
      } 
    },
    onError: (error) => {
      console.error("Login failed:", error);
      alert("An error occurred. Please try again later.");
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call mutate to initiate the login mutation
    mutate();

  };

  return (
    <>
      <div className="login-page">
        <div className="logo">
          <img src="/logo.png" alt="Logo" />
        </div>
        <CustomCard
          title="Login"
          text="Please enter your credentials"
          color={"black"}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
          >
            <div className="input-group">
              <TextField
                id="username"
                label="Username"
                variant="outlined"
                value={username}
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
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  backgroundColor: "#B81D33",
                  "&:hover": {
                    backgroundColor: "#B81D33",
                  },
                }}
              >
                Login
              </Button>
            </div>
            <Link href="/register">Not registered yet? Go to Register!</Link>
          </Box>
        </CustomCard>
      </div>
    </>
  );
};

export default LoginPage;
