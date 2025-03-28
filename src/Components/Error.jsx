import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center  text-center">
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h2 className="mb-3">Oops! Page Not Found</h2>
      <p className="text-muted">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <img
        src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
        alt="404 Not Found"
        className="img-fluid mb-4"
        style={{ maxWidth: "400px" }}
      />
      <Button variant="primary" onClick={() => navigate("/")}>
        🔙 Go to Home
      </Button>
    </Container>
  );
};

export default Error;
