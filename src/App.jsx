import React from "react";
import { Header, Container } from "semantic-ui-react";
import Login from "./components/Login";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import DisplayNews from "./components/DisplayNews"
import AdminDashboard from "./components/admin/AdminDashboard";

const App = props => {
  return (
    <Container>
      <Login />
      <Header id="main-header">The Reactive Herald</Header>
        
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={DisplayNews} />
          <Route exact path="/admin" component={AdminDashboard} />
        </Switch>
      </BrowserRouter>

    </Container>
  );
};

const mapStateToProps = state => {
  return {
    userAttrs: state.userAttrs
  };
};

export default connect(mapStateToProps)(App);
