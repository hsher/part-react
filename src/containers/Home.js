import React, { Component } from "react";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import axios from "axios";
import "./Home.css";

export default class Home extends Component {
  state = {
    users: []
  }

  componentDidMount() {
    const token = JSON.parse(localStorage.getItem("session")).data
        .access_token;
    const token2 = "Bearer " + token;

    axios.get("https://anadea-api-sandbox.herokuapp.com/api/users",
        {
          headers: {
            accept: "application/json",
            Authorization: token2
          }
        }
      )
      .then(res => {
        const users = res.data.data;
        console.log(users)

        this.setState({ users });
      })
  }

  render() {
    function renderUser(user) {
      return (
        <>
          <b>
            <span>First name: </span>
          </b>
          <span>{user.first_name}</span>
        </>
      );
    }

    return (
      <div className="Home">
        <h1>All users</h1>

        <ListGroup>
          {this.state.users.map(user => (
            <ListGroupItem key={user.id}>
              {renderUser(user)}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}
