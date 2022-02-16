import React from "react";

export default function Footer() {

  return (
    <div>
      <footer className="footer"
        style={{
          marginTop: 20,
          textAlign: 'center'
        }}
      >
        <div className="container">
          <span className="text-muted">&copy; All rights reserved. Restaurants-For-Hungers.netlify.app.</span>
        </div>
      </footer>
    </div>
  );
};
