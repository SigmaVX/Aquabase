import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./containers/Home";
import Reset from "./containers/Reset";
import Admin from "./containers/Admin";
import Login from "./containers/Login";
import Forgot from "./containers/Forgot";
import Signup from "./containers/Signup";
import Logout from "./containers/Logout";
import AUTH from "./utilities/AUTH";
import './App.css';
import Navbar from "./components/Navbar";
// import Analytics from 'react-router-ga';
// import VerticalNav from "./components/VerticalNav";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      // --
      // 'session' variables
      // ---------------------------
      isLoggedIn: false,
      isAdmin: false,
      crewname: "",
      userId: "",
      returnStatus: 0,
      errorMsg: "",
      redirectReferrer: false
    };
  }

  // Setting State For Login
  LoginResult = (authObj, redirPath) => {
    this.safeUpdate(authObj);
    this.redirPath = redirPath;
    console.log(authObj);
  }

  // Setting State For Reset
  ResetResult = (authObj) => {
    console.log("Updating Parent Data");
    console.log("Auth Object: ", authObj);
    this.safeUpdate(authObj);
  }

  LogoutResult = (authObj) => this.setState(authObj);

  componentDidMount() {
    this._isMounted = true;
    this.redirPath = "";

    // Check login status if page is reloaded
    this.isAuthenticated = this.checkAuthStatus();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  safeUpdate(stateObj) {
    if (this._isMounted) this.setState(stateObj);
  }

  renderLogin = () => {
    console.log("in renderLogin()");
    this.safeUpdate({redirectReferrer: true});
  }
  
  checkAuthStatus() {
    AUTH
      .loginCheck()
      .then(res => {
        console.log(res.data);
        if (res.data.isLoggedIn) this.isAuthenticated = true;
        this.safeUpdate({
          isLoggedIn: res.data.isLoggedIn,
          userId: res.data.userId,
          email: res.data.email
        });

        // Check if User Is Admin
        AUTH
        .adminCheck()
        .then(res => {this.setState({isAdmin: res.data.isAdmin}); return ({checkLogin: this.state.isLoggedIn, checkAdmin: this.state.isAdmin});} )
        .catch(err => {
          // unsuccessful admin check
          // console.log(err);
          this.safeUpdate({isAdmin: false});  
        })
      })
      .catch(err => {
        // unsuccessful login check
        // console.log(err);
        let tempObj = {
          returnStatus: -1,
          errorMsg: "Incorrect username/password",
          username: "",
          password: "",
          isLoggedIn: false
        };
        this.safeUpdate(tempObj);
      });
  }


  // AdminRoute = ({ component: Component, ...rest }) => {
  //   return (
  //     <Route
  //       {...rest}
  //       render = {props => {
  //         if (this.state.isAdmin) {
  //           return ( <Component 
  //             username = {this.state.username} 
  //             userId = {this.state.userId}
  //             email = {this.state.email}
  //             isLoggedIn = {this.state.isLoggedIn}               
  //             {...props} /> );
  //         } else if (this.state.isLoggedIn) {
  //           return ( <Redirect to={{ 
  //             pathname: this.redirPath,
  //             state: { referrer: window.location.pathname } 
  //           }} /> );
  //         } else {
  //             return (
  //               <EntryMessage 
  //                 renderLogin={this.renderLogin} 
  //                 adminAttempt={true}  
  //               />
  //             );
  //         }
  //       }
  //     }
  //     />
  //   );
  // }
  // induced in render to generate admin route
  // <this.AdminRoute exact path="/admin" component={Admin}/>

  render () { 
    return (
    <Router>
     
        <div>
          
          <Navbar 
            isLoggedIn = {this.state.isLoggedIn}
            isAdmin = {this.state.isAdmin}
            userId = {this.state.userId}
            username = {this.state.username}
            email = {this.state.email}
          />

          <Switch>
            <Route exact path="/" render={() => 
              <Home username = {this.state.username} 
                  userId = {this.state.userId}
                  email = {this.state.email}
              />}
            />

            <Route exact path="/login" render={(props) => 
              <Login 
                {...props}
                getLoginResult = {this.LoginResult} 
              />} 
            /> 

            <Route exact path="/auth/reset" render={(props) => 
              <Reset
                {...props}
                getResetResult = {this.ResetResult}
              />} 
            />

            <Route exact path="/admin" render={(props) => 
              <Admin 
                {...props}
                isLoggedIn = {this.state.isLoggedIn}
                isAdmin = {this.state.isAdmin}
                userId = {this.state.userId}
                username = {this.state.username}
                email = {this.state.email} 
              />} 
            /> 

            <Route exact path="/signup" render={(props) => 
              <Signup 
                {...props}
                 
              />} 
            /> 


            <Route exact path="/admin" render={<Admin/>}/>

            <Route exact path="/logout" render={() => <Logout getLogoutResult = {this.LogoutResult} />} />

            <Route render={() => (<h1 className="text-center">Page Not Found!</h1>)}/>

          </Switch>

          <Footer/>
        </div>
  
    </Router>
    );
  }
}

export default App;




