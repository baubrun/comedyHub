import { IconButton } from "@mui/material";
import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from "@mui/icons-material/Home";
import { useHistory } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import BusinessIcon from "@mui/icons-material/Business";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();

  const handleClickMenu = (evt) => {
    setAnchorEl(evt.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (path) => {
    history.replace(path);
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
        <MenuItem onClick={() => handleClick("/")}>
          <ListItemIcon>
            <HomeIcon fontSize="small" />
          </ListItemIcon>
          Home
        </MenuItem>

        <MenuItem onClick={() => handleClick("/search")}>
          <ListItemIcon>
            <SearchIcon fontSize="small" />
          </ListItemIcon>
          Search
        </MenuItem>

        <MenuItem onClick={() => handleClick("/search?purpose=for-sale")}>
          <ListItemIcon>
            <AddBusinessIcon fontSize="small" />
          </ListItemIcon>
          To Buy
        </MenuItem>

        <MenuItem onClick={() => handleClick("/search?purpose=for-rent")}>
          <ListItemIcon>
            <BusinessIcon fontSize="small" />
          </ListItemIcon>
          To Rent
        </MenuItem>
      </Menu>
    </>
  );
};

export default Navbar;
