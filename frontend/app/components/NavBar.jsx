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
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Menu as MenuIcon } from "lucide-react";
import { Home, Info, Mail } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const navItems = [
    { id: 1, link: "/", icon: <Home size={24} /> },
    { id: 2, link: "/about", icon: <Info size={24} /> },
    {
      id: 3,
      link: "https://mail.google.com/mail/?view=cm&fs=1&to=mealhub@example.com&su=Curious About MealHub!&body=Hello",
      icon: <Mail size={24} />,
    },
  ];
  return (
    <AppBar
      position="static"
      sx={{
        background: "rgba(255, 255, 255, 0.8)",
        boxShadow: "none",
        backdropFilter: "blur(10px)",
        padding: "0.5rem 0",
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
            color: "#333333",
          }}
        >
          <Link href="/" passHref style={{ textDecoration: "none" }}>
            MealHub
          </Link>
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer}
            >
              <MenuIcon size={30} color="black" />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
              <Box
                sx={{ width: 150, padding: "1rem" }}
                role="presentation"
                onClick={toggleDrawer}
                onKeyDown={toggleDrawer}
              >
                <List>
                  {navItems.map((item) => (
                    <ListItem button key={item.id}>
                      <a
                        href={item.link}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        {item.icon}
                      </a>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: "flex" }}>
            {navItems.map((item) => (
              <Button key={item.id} sx={{ color: "#333333" }}>
                <Link
                  href={item.link}
                  passHref
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                    color: "#333333",
                    fontWeight: "bold",
                  }}
                >
                  {item.icon}
                </Link>
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
