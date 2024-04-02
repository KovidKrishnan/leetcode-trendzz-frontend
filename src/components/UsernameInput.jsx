import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import logo from "../assets/logo.png";
import trendzzlogo from "../assets/trendzz-logo.jpg"
import { Link } from "react-router-dom";

export default function UsernameInput() {
  const [name, setName] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div>
    <div
      style={{ width: "500px", backgroundColor: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(10px)'}}
      className="border-1 rounded-4 shadow-lg max-auto"
    >
      <form className="w-100 text-light" onSubmit={handleSubmit}>
        <Card className="bg-transparent">
          <Card.Img
            style={{ width: "240px" }}
            className="rounded-3 mx-auto shadow-lg"
            variant="top"
            src={trendzzlogo}
          />
          <Card.Body>
            <Card.Title>Input username</Card.Title>
            <Card.Text>Enter your username to analyze your stats</Card.Text>
            <input
              style={{ color: "black" }}
              className="bg-light border-0 p-2 px-3 w-100 my-3 rounded-2"
              type="text"
              name="username"
              id="username"
              placeholder="username"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
              
            <Button type="submit" className="shadow border-0" style={{backgroundColor: '#ff861c'}}><Link to={`/dashboard?username=${name}`} className="text-dark">Drive Leetcode</Link>
            </Button>
          </Card.Body>
        </Card>
      </form>
    </div>
    <div className="d-flex justify-content-center align-items-center mt-2">
    <p>Made with &#10084; by <a href="https://linkedin.com/in/kovidkrishnan" className="text-warning font-weight-bold"><b>Kovid Krishnan</b></a></p>
  </div>
    </div>
  );
}
