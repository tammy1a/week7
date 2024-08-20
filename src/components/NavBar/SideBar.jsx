import { Box, Button, Divider, MenuItem } from "@mui/material";
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";


const SideBar = () => {

  const userLoggedIn = localStorage.getItem("LoggedIn")==="true";
  const handleSignInOut = ()=>{
    if(userLoggedIn)
    {
      localStorage.setItem("LoggedIn",false);
      localStorage.setItem("CurrentUser","");
    }
    window.location.href ="./login"
  }
  return (
    <Box
      sx={{
        minWidth: "60dvw",
        p: 2,
        backgroundColor: "background.paper",
        flexGrow: 1,
      }}
    >
      {
        userLoggedIn==true?<>
      <MenuItem>
      <Link to="./todos">
        To-dos
      </Link>
      </MenuItem>
      <MenuItem>
      <Link to={"./profile"}>Profile</Link>
      </MenuItem>
        </>:""
      }
      <MenuItem>
      <Link to="./about">About</Link>
      </MenuItem>
      <Divider />
      <MenuItem>
        <Button
          color="primary"
          variant="contained"
          component="a"
          sx={{ width: "100%" }}
          onClick={handleSignInOut}
        >
          {userLoggedIn?"Sign Out":"Sign In"}
        </Button>
      </MenuItem>
    </Box>
  );
};
SideBar.propTypes={
    LoggedIn : PropTypes.string.isRequired
}
export default SideBar;
