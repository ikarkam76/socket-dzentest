import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export const CommentsBar = () => {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <NavLink
                style={{ textDecoration: "none", color: "inherit" }}
                to={"/"}
              >
                Comments App
              </NavLink>
            </Typography>
            <Button variant="outlined" color="inherit">
              <NavLink
                style={{ textDecoration: "none", color: "inherit" }}
                to={"/images"}
              >
                Images
              </NavLink>
            </Button>
            <Button variant="outlined" color="inherit">
              <NavLink
                style={{ textDecoration: "none", color: "inherit" }}
                to={"/comments"}
              >
                Comments
              </NavLink>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
};
