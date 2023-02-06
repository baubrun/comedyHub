import React from "react";
import { useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Navbar from "./Navbar";

const Header = () => {
  const { items } = useSelector((s) => s.cart);
  const uniqueItems = new Set(items.map(item => item?._id))
  return (
    <>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Navbar />
          <Box>            
              {items?.length > 0 && (
                <Badge badgeContent={uniqueItems?.size ?? 0} color="secondary">
                  <ShoppingCartIcon fontSize="small" color="secondary" />
                </Badge>
              )}
            </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
