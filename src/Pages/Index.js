import React from "react";
import { Helmet } from "react-helmet";
import "../Styles/Index.css";

export default function Index() {
  return (
    <div>
      <div>
        <Helmet>
          <title>TuneHub</title>
        </Helmet>
      </div>
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <img src="/path/to/your/logo.png" alt="Logo" />
          </div>
          <div className="title">
            <h1>TuneHub</h1>
          </div>
        </div>
      </header>

      <div className="main">
        <div className="main_index">
          <a className="button" href="login">
            LOGIN
          </a>
          <a className="button" href="registration">
            REGISTER
          </a>
        </div>
      </div>

      <footer className="footer">
        <div>
          <p>&copy; 2024 TuneHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
