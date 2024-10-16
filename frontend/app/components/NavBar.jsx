"use client";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchBar from "./SearchBar";
import Link from "next/link";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const navItems = [
    {
      text: "Home",
      link: "/nav_bar",
    },
    {
      text: "About",
      link: "/nav_bar/about",
    },
    {
      text: "Contact",
      link: "/nav_bar/contact",
    },
  ];
  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        boxShadow: "none",
        padding: "0.5rem 0",
        mb: 4,
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            letterSpacing: 1.5,
            fontFamily: "Pacifico,cursive",
            fontSize: "2rem",
          }}
        >
          MealHub
        </Typography>
        <SearchBar sx={{ mr: 2 }} />
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer}
            >
              <MenuIcon sx={{ fontSize: 30, color: "#fff" }} />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
              <Box
                sx={{ width: 250, padding: "1rem" }}
                role="presentation"
                onClick={toggleDrawer}
                onKeyDown={toggleDrawer}
              >
                <List>
                  {navItems.map((item) => (
                    <ListItem button key={item.text}>
                      <Link href={item.link} passHref>
                        <ListItemText
                          primary={
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              {item.icon}
                              <span style={{ marginLeft: 8 }}>{item.text}</span>
                            </Box>
                          }
                        />
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: "flex" }}>
            {navItems.map((item) => (
              <Button key={item.text} sx={{ color: "#fff" }}>
                <Link
                  href={item.link}
                  passHref
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textDecoaration: "none",
                    color: "#fff",
                  }}
                >
                  {item.icon}
                  <span style={{ marginLeft: 8 }}>{item.text}</span>
                </Link>
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
