"use client";
import { useState, useRef, useEffect } from "react";
import { Box, Typography, Button, Container, TextField } from "@mui/material";
import Link from "next/link";

export default function ReserveMeal({
  mealId,
  availableSpots,
  setAvailableSpots,
  setSubmitted,
}) {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phonenumber: "",
    numberOfGuests: 1,
  });

  const customerNameRef = useRef(null);
  const emailRef = useRef(null);
  const phonenumberRef = useRef(null);

  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);

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
    phonenumber: /^[\+\-\(\)\d\s]{8,15}$/,
    numberOfGuests: /^[1-9]\d*$/,
  };
  const validateField = (fieldName, value) => {
    return regexPatterns[fieldName].test(value);
  };
  const handleSubmit = async (e) => {
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
    if (formData.numberOfGuests > availableSpots) {
      errorMessages.push("Not enough spots available.");
    }
    if (errorMessages.length > 0) {
      alert(errorMessages.join("\n"));
      return;
    }
    const reservationData = {
      contact_name: formData.customerName,
      contact_email: formData.email,
      contact_phonenumber: formData.phonenumber,
      number_of_guests: formData.numberOfGuests,
      meal_id: mealId,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reservations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reservationData),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors);
      }

      const data = await response.json();
      const totalReserved = Number(data.total_reserved);
      const maxReservations = Number(data.max_reservations);
      const newAvailableSpots = maxReservations - totalReserved;

      setAvailableSpots(newAvailableSpots);
      setSubmittedSuccessfully(true);
      setSubmitted(true);

      setFormData({
        customerName: "",
        email: "",
        phonenumber: "",
        numberOfGuests: 1,
      });
    } catch (error) {
      alert(error.message);
    }
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
        <TextField
          label="Name"
          variant="outlined"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          required
          fullWidth
          inputRef={customerNameRef}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Number of Guests"
          name="numberOfGuests"
          type="number"
          value={formData.numberOfGuests}
          onChange={handleChange}
          required
          fullWidth
        ></TextField>
        <TextField
          label="Email"
          type="email"
          name="email"
          variant="outlined"
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
          inputRef={emailRef}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Phone number"
          type="tel"
          id="phonenumber"
          name="phonenumber"
          variant="outlined"
          value={formData.phonenumber}
          onChange={handleChange}
          required
          fullWidth
          inputRef={phonenumberRef}
          sx={{ mb: 2 }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Book Seat
        </Button>
        {submittedSuccessfully && (
          <Typography variant="body1" color="success.main">
            Thank you for your booking!
          </Typography>
        )}
        <Link href="/" passHref>
          <Button variant="outlined" color="primary">
            Back to Home
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
