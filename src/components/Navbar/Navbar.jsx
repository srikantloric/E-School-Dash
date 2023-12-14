import React, { useContext, useState, useEffect } from "react";
import "./Navbar.scss";
import ProfileImage from "../../assets/images.jpg";
import { Avatar, Badge, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SideBarContext from "../../context/SidebarContext";
import {
  IconBell,
  IconMessage2,
  IconMoon,
  IconSearch,
} from "@tabler/icons-react";
import { auth } from "../../firebase";

function Navbar() {
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  ///profile menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    auth.signOut();
    handleClick();
  }
  //profile menu

  const notificationsLabel = (count) => {
    if (count === 0) {
      return "no notifications";
    }
    if (count > 99) {
      return "more than 99 notifications";
    }
    return `${count} notifications`;
  };

  const status = useContext(SideBarContext);
  const handleOnClick = () => {
    status.toggle();
  };

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
      if (getCurrentDimension().width < 1000) {
        status.setSidebarOpen(false);
      } else {
        status.setSidebarOpen(true);
      }
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

  return (
    <div className="navbar-container">
      <div className="navbar-wrapper">
        <div className="navbar-leftsection">
          <Tooltip title="Collapse">
            <IconButton onClick={handleOnClick}>
              <MenuIcon />
            </IconButton>
          </Tooltip>

          <div className="search-box">
            <IconSearch className="search-iconn" size={28} />
            <span>Search..</span>
            <div>Ctrl+K</div>
          </div>
        </div>
        <div className="navbar-rightsection">
          <div className="rounded-bg">
            <Tooltip title="Night Mode">
              <IconButton>
                <IconMoon size={22} />
              </IconButton>
            </Tooltip>
          </div>
          <div className="rounded-bg">
            <Tooltip title="Message">
              <IconButton aria-label={notificationsLabel(100)}>
                <Badge badgeContent={1} color="success">
                  <IconBell size={22} />
                </Badge>
              </IconButton>
            </Tooltip>
          </div>
          <div className="rounded-bg">
            <Tooltip title="Message">
              <IconButton aria-label={notificationsLabel(100)}>
                <Badge badgeContent={9} color="primary">
                  <IconMessage2 size={22} />
                </Badge>
              </IconButton>
            </Tooltip>
          </div>
          <Tooltip title="Account">
            <IconButton
             id="demo-positioned-button"
             aria-controls={open ? 'demo-positioned-menu' : undefined}
             aria-haspopup="true"
             aria-expanded={open ? 'true' : undefined}
             onClick={handleClick}>
             <Avatar sx={{ bgcolor:"purple" }}>A</Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            style={{position:"absolute",top:50,zIndex:999999}}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
