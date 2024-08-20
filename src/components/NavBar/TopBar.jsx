import PropTypes from "prop-types";
import { Box, Button, MenuItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const logoStyle = {
    width: "140px",
    height: "auto",
    cursor: "pointer",
  };
  

const TopBar = () => {
  
  const userLoggedIn = localStorage.getItem("LoggedIn") ==='true';
  const handleSignInOut = ()=>{
    if(userLoggedIn)
    {
      localStorage.setItem("LoggedIn",false);
      localStorage.setItem("CurrentUser","");
    }
    window.location.href ="./login"

  }
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          ml: "-18px",
          px: 0,
        }}
      >
        <img
          src={
            "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg"
          }
          style={logoStyle}
          alt="logo of sitemark"
        />
        <Box sx={{ display: { xs: "none", sm: "flex" } }}>
          {
            userLoggedIn==true?<>
          <MenuItem sx={{ py: "6px", px: "12px" }}>
            <Typography variant="body2" color="text.primary">
            <Link to="/todos" className="nav-link">
              To-dos
            </Link>
            </Typography>
          </MenuItem>
          <MenuItem sx={{ py: "6px", px: "12px" }}>
            <Typography variant="body2" color="text.primary">
              <Link to="./profile">Profile</Link>
            </Typography>
          </MenuItem>
            </>:""
          }
          <MenuItem sx={{ py: "6px", px: "12px" }} >
            <Typography variant="body2" color="text.primary">
              <Link to="./about">About</Link>
            </Typography>
          </MenuItem>
        </Box>
      </Box>
      <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
             
              
              <Button
                color="primary"
                variant="contained"
                size="small"
                component="a"
                onClick={handleSignInOut}
              >
                {userLoggedIn?"Sign Out":"Sign In"}
              </Button>
            </Box>
    </>
  );
};

TopBar.propTypes = {
  LoggedIn: PropTypes.string.isRequired,
};

export default TopBar;
