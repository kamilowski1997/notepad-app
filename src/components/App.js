import React, {useEffect} from "react";
import SignUp from "./SignUp"
import SignIn from "./SignIn"
import Profile from "./Profile"
import Dashboard from "./Dashboard"
import { Container } from 'react-bootstrap'
import { AuthProvider } from "../contexts/AuthContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import ResetPassword from "./ResetPassword";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/signup">
            <Container
              className="d-flex align-items-center justify-content-center"
              style={{ minHeight: "100vh" }}
            >
              <div className="w-100" style={{ maxWidth: "400px" }}>
                <SignUp/>
              </div>
            </Container>
          </Route>

          <Route path="/signin">
            <Container
              className="d-flex align-items-center justify-content-center"
              style={{ minHeight: "100vh" }}
            >
              <div className="w-100" style={{ maxWidth: "400px" }}>
                <SignIn/>
              </div>
            </Container>
          </Route>

          <Route path="/reset-password">
            <Container
              className="d-flex align-items-center justify-content-center"
              style={{ minHeight: "100vh" }}
            >
              <div className="w-100" style={{ maxWidth: "400px" }}>
                <ResetPassword/>
              </div>
            </Container>
          </Route>
          
          <PrivateRoute path="/profile" component={Profile}/>

          <PrivateRoute exact path="/" component={Dashboard}/>
        </Switch>
      </AuthProvider> 
    </Router>
  );
}

export default App;
