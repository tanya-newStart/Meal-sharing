"use client";
import { useState, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Modal,
  IconButton,
} from "@mui/material";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";

export default function ReserveMeal({
  mealId,
  availableSpots,
  setAvailableSpots,
  setSubmitted,
  open,
  onClose,
}) {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phonenumber: "",
    numberOfGuests: 1,
  });

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
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="reservation-modal-title"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          id="reservation-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Reservation Form
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Name"
            variant="outlined"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
            fullWidth
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
            sx={{ mb: 2 }}
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
            sx={{ mb: 2 }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
              mt: 2,
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Book Seat
            </Button>
            <Link href="/" passHref>
              <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
                Back to Home
              </Button>
            </Link>
          </Box>
          {submittedSuccessfully && (
            <Typography variant="body1" color="success.main">
              Thank you for your booking!
            </Typography>
          )}
        </Box>
      </Box>
    </Modal>
  );
}
