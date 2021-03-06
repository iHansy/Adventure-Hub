import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import FeedPage from '../FeedPage/FeedPage';
import DashboardPage from '../DashboardPage/DashboardPage';
import CreateAdventurePage from '../CreateAdventurePage/CreateAdventurePage';
import EditAdventurePage from '../EditAdventurePage/EditAdventurePage';
import HomePage from '../HomePage/HomePage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import ParkSearchPage from '../ParkSearchPage/ParkSearchPage';
import FeedDetails from '../FeedPage/FeedDetailsPage';
import ParkDetailsPage from '../ParkSearchPage/ParkDetailsPage';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
  }

  render() {
    return (
      <Router>
        <div>
          {/* me- use this for nav bar, taking out for now, can relocate */}
          {/* <Nav /> */}
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            {/* shows FeedPage at all times (logged in or not) */}
            <Route
              exact
              path="/feed"
              component={FeedPage}
            />

             {/* shows FeedDetails at all times (logged in or not) */}
             <Route
             exact
             path="/feed-details/:id"
             component={FeedDetails}
           />

             {/* shows ParkSearchPage at all times (logged in or not) */}
             <Route
              exact
              path="/park-search"
              component={ParkSearchPage}
            />

              {/* shows ParkDetailsPage at all times (logged in or not) */}
              <Route
              exact
              path="/park-search-details/:id"
              component={ParkDetailsPage}
            />

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/dashboard will show the DashboardPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/dashboard */}
            <ProtectedRoute
              // logged in shows DashboardPage else shows HomePage
              exact
              path="/dashboard"
              component={DashboardPage}
            />

            <ProtectedRoute
              // logged in shows CreateAdventurePage else shows HomePage
              exact
              path="/create-adventure"
              component={CreateAdventurePage}
            />

            <ProtectedRoute
              // logged in shows EditAdventurePage else shows HomePage
              exact
              path="/edit-adventure/:id"
              component={EditAdventurePage}
            />

            {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/dashboard"
              // - else shows RegisterPage at "/registration"
              exact
              path="/registration"
              component={RegisterPage}
              authRedirect="/dashboard"
            />
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/dashboard"
              // - else shows LandingPage at "/home"
              exact
              path="/home"
              component={HomePage}
              authRedirect="/dashboard"
            />

            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default connect()(App);
