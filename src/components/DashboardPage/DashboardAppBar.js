import React from "react";
import { connect } from 'react-redux';
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles, AppBar, MenuItem, Menu, Button, Toolbar, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import mapStoreToProps from '../../redux/mapStoreToProps';
import dashboardBanner from '../App/images/dashboardBanner.jpg';

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

    const handleLogOut = () => {
        setAnchorEl(null);
        props.dispatch({ type: 'LOGOUT' });
    };

    //going to dashboard when clicked in app bar
    const handleDashboard = () => {
        setAnchorEl(null);
        props.history.push('/dashboard');
    };

    //going to feed when clicked in app bar
    const handleFeed = () => {
        setAnchorEl(null);
        props.history.push('/feed');
    };

    //going to park search when clicked in app bar
    const handleParkSearch = () => {
        setAnchorEl(null);
        props.history.push('/park-search');
    };

    const handleHome = () => {
        setAnchorEl(null);
        props.history.push('/home');
    };

    return (
        <div className="dashboardAppBar">
            <AppBar className={classes.appBar} position="static">
                <DashboardHeader />
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
                        {props.store.user.id &&
                            <MenuItem onClick={handleDashboard} className={classes.menuItem}>Dashboard</MenuItem>
                        }
                        {!props.store.user.id &&
                            <MenuItem onClick={handleHome} className={classes.menuItem}>Home</MenuItem>
                        }
                        <MenuItem onClick={handleParkSearch} className={classes.menuItem}>Find a Park</MenuItem>
                        <MenuItem onClick={handleFeed} className={classes.menuItem}>User Activity</MenuItem>
                        {props.store.user.id &&
                            <MenuItem onClick={handleLogOut} className={classes.menuItem}>Logout</MenuItem>
                        }
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
export default connect(mapStoreToProps)(DashboardAppBarRouted);
// export default DashboardAppBar;
