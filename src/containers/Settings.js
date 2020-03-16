import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Settings.css";

export default function Settings(props) {
  return (
    <div className="Settings">
      <LinkContainer to="/settings/password">
        <Button>
          Change Password
        </Button>
      </LinkContainer>
    </div>
  );
}
