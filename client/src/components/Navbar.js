import React, {Component} from "react";
import { Link } from "react-router-dom";


function AdminBar(props) {
  const isAdmin = props.isAdmin;
  if (isAdmin) {
    return (
      <li className={window.location.pathname === "/admin" ? "nav-item active nav-active" : "nav-item"}>
        <Link className="nav-link" to="/admin">Admin</Link>
      </li>
    );
  }
  return "";
}

function AuthMenu(props) {
  const isLoggedIn = props.isLoggedIn;
  
  if (isLoggedIn) {
    return (
      <div className="d-flex">
        <li className={window.location.pathname === "/logout" ? "nav-item active nav-active" : "nav-item"}>
          <Link className="nav-link" to="/logout">Logout</Link>
        </li>
        <li className="nav-item">
          <p className="username">{props.userName}</p>
        </li>
      </div>
    );
  }
  return (
    <div className="d-flex">
      <li className={window.location.pathname === "/login" ? "nav-item active nav-active" : "nav-item"}>
        <Link className="nav-link" to="/login">Login</Link>
      </li>
      <li className={window.location.pathname === "/signup" ? "nav-item active nav-active" : "nav-item"}>
        <Link className="nav-link" to="/signup">Sign Up</Link>
      </li>
    </div>
  );
}

class Navbar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      testVar: "test variable"
    };
  }

  render() {
    return  (
      <nav className="navbar navbar-expand-lg">
        <Link className="navbar-brand" to="/">
          <img className="nav-icon" src="./images/pinball-orange.png" alt="Tilt Icon"/>
        </Link>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className={window.location.pathname === "/about" ? "nav-item active nav-active" : "nav-item"}>
                <Link className="nav-link" to="/about">About</Link>
            </li>
            <AdminBar isAdmin = {this.props.isAdmin} />
            <AuthMenu 
              isLoggedIn = {this.props.isLoggedIn}
              userName = {this.props.username}
             />
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;