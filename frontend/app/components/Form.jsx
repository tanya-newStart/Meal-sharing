"use client";
import { useState, useRef } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import Link from "next/link";

export default function Form() {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phonenumber: "",
  });

  const customerNameRef = useRef(null);
  const emailRef = useRef(null);
  const phonenumberRef = useRef(null);

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const regexPatterns = {
    customerName: /^[A-Za-z]{2,}(?:\s[A-Za-z]{2,})+$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phonenumber: /^\d{8}$/,
  };
  const validateField = (fieldName, value) => {
    return regexPatterns[fieldName].test(value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let errorMessages = [];
    if (!validateField("customerName", formData.customerName)) {
      errorMessages.push(
        "First and last names should be at least 2 characters long and contain only letters."
      );
    }
    if (!validateField("email", formData.email)) {
      errorMessages.push("Please enter a valid email address.");
    }
    if (!validateField("phonenumber", formData.phonenumber)) {
      errorMessages.push("Phone number should be an 8-digit number.");
    }
    if (errorMessages.length > 0) {
      alert(errorMessages.join("\n"));
      return;
    }

    setSubmitted(true);
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
          p: 3,
          borderRadius: 1,
          boxShadow: 1,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Reservation Form
        </Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <label htmlFor="customerName">
          <Typography variant="body1">Name</Typography>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
            ref={customerNameRef}
          />
        </label>
        <label htmlFor="email">
          <Typography variant="body1">Email</Typography>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            ref={emailRef}
          />
        </label>
        <label htmlFor="phonenumber">
          <Typography variant="body1">Phone</Typography>
          <input
            type="tel"
            id="phonenumber"
            name="phonenumber"
            value={formData.phonenumber}
            onChange={handleChange}
            required
            ref={phonenumberRef}
          />
        </label>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Sign Up
        </Button>
        {submitted && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">
              Form submitted successfully!
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Thank you for signing up!
            </Typography>
            <Link href="/" passHref>
              <Button variant="outlined" color="primary">
                Back to Home
              </Button>
            </Link>
          </Box>
        )}
      </Box>
    </Container>
  );
}
