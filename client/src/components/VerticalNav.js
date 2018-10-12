import React, {Component} from "react";
import { Link } from "react-router-dom";
import { bubble as Menu } from 'react-burger-menu';


function AdminBar(props) {
  const isAdmin = props.isAdmin;
  if (isAdmin) {
    return (
      <li className={window.location.pathname === "/admin" ? "nav active nav-active" : "nav"}>
        <Link className="nav-link" to="/admin" onClick={() => this.closeMenu()}>Admin</Link>
      </li>
    );
  }
  return "";
}

function AuthMenu(props) {
  const isLoggedIn = props.isLoggedIn;
  
  if (isLoggedIn) {
    return (
      <div className="">
        <li className={window.location.pathname === "/logout" ? "nav active nav-active" : "nav"}>
          <Link className="nav-link" to="/logout" onClick={() => this.closeMenu()}>Logout</Link>
        </li>
        <div className="">
          <p className="username">Signed In As:<br></br>{props.userName}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="">
      <li className={window.location.pathname === "/login" ? "nav active nav-active" : "nav"}>
        <Link className="nav-link" to="/login" onClick={() => this.closeMenu()}>Login</Link>
      </li>
      <li className={window.location.pathname === "/signup" ? "nav active nav-active" : "nav"}>
        <Link className="nav-link" to="/signup" onClick={() => this.closeMenu()}>Sign Up</Link>
      </li>
    </div>
  );
}

class VerticalNav extends Component {

  constructor(props) {
    super(props);

    this.state = {
      testVar: "test variable",
      menuOpen: false
    };
  }


  // Used to track menu open/closed
  handleStateChange (state) {
    this.setState({menuOpen: state.isOpen})  
  }
  
  // Used to close the menu when a user clicks a menu item
  closeMenu () {
    this.setState({menuOpen: false})
  }



  render() {
    return  (
      <Menu
      width={ '200px' }
      customBurgerIcon={ <img id="burger-icon" src="/images/pinball-orange.png" alt="tilt icon"/> } 
      isOpen={this.state.menuOpen}
      onStateChange={(state) => this.handleStateChange(state)}
      >
        <nav className="navbar">

       
          <Link className="bm-header" to="/">
              <img className="nav-icon mr-2" src="/images/aquabase-icon.png" alt="Aquabase Icon"/>
          </Link>
          
        
            <ul className="">
              <li className={window.location.pathname === "/" ? "nav active nav-active" : "nav"}>
                <Link className="nav-link" to="/" onClick={() => this.closeMenu()}>Home</Link>
              </li>
              <li className={window.location.pathname === "/post" ? "nav active nav-active" : "nav"}>
                <Link className="nav-link" to="/post" onClick={() => this.closeMenu()}>Report Cheaters</Link>
              </li>
              <li className={window.location.pathname === "/glossary" ? "nav active nav-active" : "nav"}>
                <Link className="nav-link" to="/glossary" onClick={() => this.closeMenu()}>Cheat Glossary</Link>
              </li>
              <li className={window.location.pathname === "/videos" ? "nav active nav-active" : "nav"}>
                  <Link className="nav-link" to="/videos" onClick={() => this.closeMenu()}>Cheat Videos</Link>
              </li>    
              <li className={window.location.pathname === "/about" ? "nav active nav-active" : "nav"}>
                  <Link className="nav-link" to="/about" onClick={() => this.closeMenu()}>About</Link>
              </li>
              <AdminBar isAdmin = {this.props.isAdmin} />
              <AuthMenu 
                isLoggedIn = {this.props.isLoggedIn}
                userName = {this.props.username}
              />
            </ul>
        </nav>
      </Menu>
    );
  }
}

export default VerticalNav;

// Cheat Chat Removed
// <li className={window.location.pathname === "/chat" ? "nav active nav-active" : "nav"}>
//   <Link className="nav-link" to="/chat">Cheat Chat</Link>
// </li>