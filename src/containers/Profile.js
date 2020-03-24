import React, { Component } from "react";
import { Button, ListGroup, ListGroupItem,FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from "axios";
import { LinkContainer } from "react-router-bootstrap";
import "./Profile.css";

export default class Profile extends Component {
  state = {
    profile: [],
    first_name: ""
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

  handleChangeName = (event) => {
    event.preventDefault();

    const token = JSON.parse(localStorage.getItem("session")).data.access_token;
    const token2 = "Bearer " + token;
    axios
      .put(
        "https://anadea-api-sandbox.herokuapp.com/api/profile",
        {
          user: {
            first_name: this.state.first_name
          }
        },
        {
          headers: {
            accept: "application/json",
            Authorization: token2
          }
        }
      )
      .then(res => {
        const profile = res.data.data;

        this.setState({ profile });
      });
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  render() {
    return (
      <div className="Profile">
        <h1>Profile</h1>

        <ListGroup>
          <ListGroupItem>
            <b>
              <span>First name: </span>
            </b>
            <span>{this.state.profile.first_name}</span>
          </ListGroupItem>
          <ListGroupItem>
            <b>
              <span>Last name: </span>
            </b>
            <span>{this.state.profile.last_name}</span>
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

        <Button onClick={this.handleChangeName}>Change Name</Button>
        <br/>
        <br/>

        <form onSubmit={this.handleChangeName}>
          <FormGroup bsSize="large" controlId="first_name">
            <ControlLabel>New first name</ControlLabel>
            <FormControl
              type="text"
              onChange={this.handleChange}
              value={this.state.first_name}
            />
          </FormGroup>

          <Button
            block
            type="submit"
            bsSize="large"
          >
            Change First Name
          </Button>
        </form>
      </div>
    );
  }
}
