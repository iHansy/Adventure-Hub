import React from "react";
import { connect } from 'react-redux';
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles, AppBar, MenuItem, Menu, Button, Toolbar, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles({
    dashboardTitle: {
        marginLeft: '2em',
    },
    appBar: {
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
    menuItem: {
        height: '4em',
        '&:hover': {
            backgroundColor: 'rgb(172, 129, 49)',
            borderColor: '#0062cc',
        },
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
        props.dispatch({ type: 'LOGOUT' });
        props.history.push('/home');
    };

    return (
        <div>
            <AppBar className={classes.appBar} position="static">
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
                        <MenuItem onClick={handleClose} className={classes.menuItem}>Dashboard</MenuItem>
                        <MenuItem onClick={handleClose} className={classes.menuItem}>Park Search</MenuItem>
                        <MenuItem onClick={handleClose} className={classes.menuItem}>Feed</MenuItem>
                        <MenuItem onClick={logOut} className={classes.menuItem}>Logout</MenuItem>
                    </Menu>
                    <Typography className={classes.dashboardTitle} variant="h4">
                        {props.appBarHeader}
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

const DashboardAppBarRouted = withRouter(DashboardAppBar);
export default connect()(DashboardAppBarRouted);
// export default DashboardAppBar;
