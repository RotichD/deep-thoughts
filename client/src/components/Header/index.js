import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import { makeStyles } from '@material-ui/core/styles'; // Material UI Components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  offset: theme.mixins.toolbar,
}));

const Header = () => {
  const classes = useStyles();

  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  // // for header className="bg-secondary mb-4 py-2 flex-row align-center"
  // //for div "container flex-row justify-space-between-lg justify-center align-center"

  return (
    <header> 
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="logo-homepage-button" component={Link} to="/">
              <HomeRoundedIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title} component={Link} to="/" style={{ fontFamily: 'Rubik', fontWeight: 300 }}>
              Deep Thoughts
            </Typography>
            <>
              {Auth.loggedIn() ? (
                <>
                  <Button component={Link} to="/profile">
                    <AccountCircleRoundedIcon />
                  </Button>
                  <Button color="inherit" href="/" onClick={logout}>
                    <ExitToAppRoundedIcon />
                  </Button>
                </>
              ) : (
                <>
                  <Button color="inherit" component={Link} to="/login">Login</Button>
                  <Button color="inherit" component={Link} to="/signup">Signup</Button>
                </>
              )}
            </>
          </Toolbar>
        </AppBar>
        <div className={classes.offset} />
      </div>
    </header>
  );
};

export default Header;
