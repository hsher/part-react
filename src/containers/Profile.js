import React, { Component } from "react";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import axios from "axios";
import { LinkContainer } from "react-router-bootstrap";
import "./Profile.css";

export default class Profile extends Component {
  state = {
    profile: []
  };

  componentDidMount() {
    const token = JSON.parse(localStorage.getItem("session")).data.access_token;
    const token2 = "Bearer " + token;

    axios
      .get("https://anadea-api-sandbox.herokuapp.com/api/profile", {
        headers: {
          accept: "application/json",
          Authorization: token2
        }
      })
      .then(res => {
        const profile = res.data.data;

        this.setState({ profile });
      });
  }

  render() {
    return (
      <div className="Profile">
        <h1>Profile</h1>

        <ListGroup>
          <ListGroupItem>
            <b>
              <span>First name:</span>
            </b>
            <span></span>
          </ListGroupItem>
          <ListGroupItem>
            <b>
              <span>Last name:</span>
            </b>
            <span></span>
          </ListGroupItem>
          <ListGroupItem>
            <b>
              <span>Email: </span>
            </b>
            <span>{this.state.profile.email}</span>
          </ListGroupItem>
        </ListGroup>

        <LinkContainer to="/profile/password">
          <Button>Change Password</Button>
        </LinkContainer>
      </div>
    );
  }
}
