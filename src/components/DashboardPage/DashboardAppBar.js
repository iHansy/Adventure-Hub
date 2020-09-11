import React from "react";
import { connect } from 'react-redux';
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles, AppBar, MenuItem, Menu, Button, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    dashboardTitle: {
      marginLeft: '2em',
    },
    appbar: {
        background: 'rgb(121, 119, 115)',
    },
    button: {
        '&:hover': {
            backgroundColor: 'rgb(172, 129, 49)',
            borderColor: '#0062cc',
          },
    },
    menu: {
        color: 'white',
    },
  });

const DashboardAppBar = (props) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(false);
    };

    const logOut = () => {
        setAnchorEl(null);
        // props.dispatch ({ type: 'LOGOUT' });
    };

    return (
        <div>
            <AppBar className={classes.appbar} position="static">
                <Toolbar>
                    <Button
                        className={classes.button}
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MenuIcon className={classes.menu} />
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Dashboard</MenuItem>
                        <MenuItem onClick={handleClose}>Feed</MenuItem>
                        <MenuItem onClick={handleClose}>Park Search</MenuItem>
                        <MenuItem onClick={logOut}>Logout</MenuItem>
                    </Menu>
                    <Typography className={classes.dashboardTitle} variant="h4">
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

// export default connect(DashboardAppBar);
export default DashboardAppBar;
