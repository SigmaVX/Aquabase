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
      isLoggedIn: false,
      isAdmin: false,
      userId: "",
      returnStatus: 0,
      errorMsg: "",
      redirectReferrer: false,
      firstName: "",
      lastName: "",
      userType: "",
      email: ""
    };
  }

  // Setting State For Login
  LoginResult = (authObj, redirPath) => {
    console.log("Updating Parent Data");
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
    this.checkAuthStatus();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  safeUpdate(stateObj) {
    if (this._isMounted) this.setState(stateObj);
  }

  // renderLogin = () => {
  //   console.log("in renderLogin()");
  //   this.safeUpdate({redirectReferrer: true});
  // }
  

  // was working last on this function
  checkAuthStatus() {
    AUTH
      .loginCheck()
      .then(res => {
        if (res.data.isLoggedIn == true){
          
          if (res.data.userType == "admin"){
            this.safeUpdate({
              isLoggedIn: res.data.isLoggedIn,
              userId: res.data.userId,
              firstName: res.data.firstName,
              lastName: res.data.lastName,
              userType: res.data.userType,  
              email: res.data.email,
              isAdmin: true
            });         
          } else {
            this.safeUpdate({
              isLoggedIn: res.data.isLoggedIn,
              userId: res.data.userId,
              firstName: res.data.firstName,
              lastName: res.data.lastName,
              userType: res.data.userType,  
              email: res.data.email,
              isAdmin: false
            });
          }
        } else {
          this.safeUpdate({
            isLoggedIn: false,
            userId: "",
            firstName: "",
            lastName: "",
            userType: "",  
            email: "",
            isAdmin: false
          });
        }

       
        // Check if User Is Admin
        // AUTH
        // .adminCheck()
        // .then(res => {
        //   this.setState({isAdmin: res.data.isAdmin});
        //   return ({
        //       checkLogin: this.state.isLoggedIn,
        //       checkAdmin: this.state.isAdmin
        //     });
        //   })
        // .catch(err => {
        //   // unsuccessful admin check
        //   // console.log(err);
        //   this.safeUpdate({isAdmin: false});  
        // })

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

    console.log("Parent State: ", this.state);

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
                firstName = {this.state.firstName}
                lastName  = {this.state.lastName}
                email = {this.state.email} 
              />} 
            /> 

            <Route exact path="/reset" render={(props) => 
              <Reset 
                {...props}
                isLoggedIn = {this.state.isLoggedIn}
                isAdmin = {this.state.isAdmin}
                userId = {this.state.userId}
                firstName = {this.state.firstName}
                lastName  = {this.state.lastName}
                email = {this.state.email} 
              />} 
            /> 

            <Route exact path="/signup" render={(props) => 
              <Signup 
                {...props}
              />} 
            /> 

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




