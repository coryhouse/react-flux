import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div>
      <h2>Uh-oh, we can't find what you're looking for!</h2>
      <p>
        <Link to="/">Back to Home</Link>
      </p>
    </div>
  );
}

export default NotFoundPage;
