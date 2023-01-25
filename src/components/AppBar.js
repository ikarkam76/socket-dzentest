import { Diversity1Rounded } from "@mui/icons-material";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export const CommentsBar = () => {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <NavLink
              style={{ textDecoration: "none", color: "inherit" }}
              to={"/"}
            >
              <Diversity1Rounded
                fontSize="large"
                sx={{ marginRight: "15px" }}
              />
            </NavLink>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Comments App
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
