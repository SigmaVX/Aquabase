import React, {Component} from "react";
import { Link } from "react-router-dom";





function AdminBar(props) {
  const isAdmin = props.isAdmin;
  if (isAdmin) {
    return (
      <div className="d-flex">
        <li className={window.location.pathname === "/admin" ? "nav-item active nav-active" : "nav-item"}>
          <Link className="nav-link" to="/admin">Aquabase</Link>
        </li>

        <li className={window.location.pathname === "/signup" ? "nav-item active nav-active" : "nav-item"}>
          <Link className="nav-link" to="/signup">Add Crew</Link>
        </li>
      </div>
    );
  }
  return "";
}


function AuthMenu(props) {
  const isLoggedIn = props.isLoggedIn;
  
  if (isLoggedIn) {
    return (
      <div className="d-flex">
        <li className={window.location.pathname === "/crew-portal" ? "nav-item active nav-active" : "nav-item"}>
          <Link className="nav-link" to="/crew-portal">Crew Portal</Link>
        </li>
        <li className={window.location.pathname === "/logout" ? "nav-item active nav-active" : "nav-item"}>
          <Link className="nav-link" to="/logout">Logout</Link>
        </li>
      </div>
    );
  }
  return (
    <div className="d-flex">
      <li className={window.location.pathname === "/login" ? "nav-item active nav-active" : "nav-item"}>
        <Link className="nav-link" to="/login">Crew Login</Link>
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
          <img className="nav-icon" src="/images/aquabase-icon.png" alt="Aquabase Icon"/>
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