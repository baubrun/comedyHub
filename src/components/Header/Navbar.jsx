import React, { useState } from "react";
import { IconButton, ListItemText } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from "@mui/icons-material/Home";
import { useHistory } from "react-router-dom";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import {
  EVENTS_PAGE,
  HOME_PAGE,
  CART_PAGE,
} from "../../shared/constants/navigation";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();

  const handleClickMenu = (evt) => {
    setAnchorEl(evt.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (path) => {
    history.push(path);
    handleClose();
  };

  return (
    <>
      <IconButton size="large" sx={{ color: "#fff" }} onClick={handleClickMenu}>
        <MenuIcon />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleClick(HOME_PAGE.path)}>
          <ListItemIcon>
            <HomeIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText primary="HOME" />
        </MenuItem>

        <MenuItem onClick={() => handleClick(EVENTS_PAGE.path)}>
          <ListItemIcon>
            <LocalActivityIcon fontSize="small" color="secondary" />
          </ListItemIcon>
          <ListItemText primary="EVENTS" />
        </MenuItem>

        <MenuItem onClick={() => handleClick(CART_PAGE.path)}>
          <ListItemIcon>
            <ShoppingCartIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText primary="CART" />
        </MenuItem>
      </Menu>
      <Typography variant="h6" sx={{ mr: 4, textTransform: "uppercase" }}>
        comedy hub
      </Typography>
    </>
  );
};

export default Navbar;
