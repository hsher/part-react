import { LinkContainer } from "react-router-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import Routes from "./Routes";
import "./App.css";

function App(props) {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  async function handleLogout() {
    try {
      const token = JSON.parse(localStorage.getItem('session')).data.access_token;
      const response = await axios.post("https://anadea-api-sandbox.herokuapp.com/api/oauth/revoke",
        {
          headers: {
            "accept": "application/json"
          },
          "token": token
        }
      );

      userHasAuthenticated(false);
    }

    catch (error) {
      console.log(error); // catches both errors
    }

  }

  async function onLoad() {
    try {
      const token = JSON.parse(localStorage.getItem('session')).data.access_token;
      const token2 = "Bearer " + token;
      console.log('token ' + token2)
      const response = await axios.get("https://anadea-api-sandbox.herokuapp.com/api/profile",
        {
          headers: {
            "accept": "application/json",
            "Authorization": token2
          },
          data: {}
        }
      );

      console.log(response)
      userHasAuthenticated(true);
    }

    catch (error) {
      console.log(error); // catches both errors
    }

    setIsAuthenticating(false);
  }

  return (
    !isAuthenticating &&
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Scratch</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {isAuthenticated
              ? <NavItem onClick={handleLogout}>Logout</NavItem>
              : <>
                  <LinkContainer to="/signup">
                    <NavItem>Signup</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                </>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
    </div>
  );
}

export default App;
