import React from "react";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Profile.css";

export default function Profile(props) {
  return (
    <div className="Profile">
      <LinkContainer to="/profile/password">
        <Button>Change Password</Button>
      </LinkContainer>
    </div>
  );
}
