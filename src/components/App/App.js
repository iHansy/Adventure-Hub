import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import FeedPage from '../FeedPage/FeedPage';
import DashboardPage from '../DashboardPage/DashboardPage';
import InfoPage from '../InfoPage/InfoPage';
import HomePage from '../HomePage/HomePage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
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

            {/* Visiting localhost:3000/feed will show the about page. */}
            <Route
              // shows FeedPage at all times (logged in or not)
              exact
              path="/feed"
              component={FeedPage}
            />

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/dashboard will show the DashboardPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/dashboard */}
            <ProtectedRoute
              // logged in shows DashboardPage else shows LoginPage
              exact
              path="/dashboard"
              component={DashboardPage}
            />

            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/info"
              component={InfoPage}
            />

            {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/dashboard"
              // - else shows LoginPage at /login
              exact
              path="/login"
              component={LoginPage}
              authRedirect="/dashboard"
            />
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
