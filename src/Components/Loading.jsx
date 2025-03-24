import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <div className="loading-container d-flex justify-content-center align-items-center">
      <Spinner animation="grow" variant="primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loading;
