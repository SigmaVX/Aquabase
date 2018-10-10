import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AUTH from "../utilities/AUTH";
import {ErrorUserName, ErrorPassword, ErrorEmail, ErrorPasswordMatch} from "../components/ErrorComponents";
import * as VConst from "../constants/VConst";


class Signup extends Component {
  state = {
    success: false,
    username: "",
    password: "",
    pswrdConfirmation: "",
    email: "",
    userId: 0,
    errorMsg: "",
    isValidUserName: true,
    isValidEmail: true,
    isValidPassword: true,
    doPasswordsMatch: true
  }
  
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name] : value
    })
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  safeUpdate(obj) {
    if (this._isMounted){
      this.setState(obj);
    } 
  }

  displayErrorMessage() {
    console.log("Checking Error Message");
    if (this.state.errorMsg !== "") {
      return (
        <div className="alert alert-danger text-center mb-2">
          {this.state.errorMsg}
        </div>
      );
    }
  }

  // -----------------------------------------------------------------------
  // isValidEmail() checks if an email is valid
  // source code for regular expression:
  // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript/1373724#1373724
  //
  isValidEmail = (email) => {
    var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    // Test method is JS to look for mactching conditions in a string based on RegEx - returns true or false
    return re.test(email);
  }

  // Method to register a new user
  register = (event) => {
    event.preventDefault();
    let isValidForm = true;

    // validate username
    if (this.state.username.length < VConst.UnameMinLength || 
      this.state.username.length > VConst.UnameMaxLength) {
      this.safeUpdate({isValidUserName: false});
      isValidForm = false;
    }

    // validate email
    if (!this.isValidEmail(this.state.email)) {
      this.safeUpdate({isValidEmail: false});
      isValidForm = false;
    }

    // validate password
    if (this.state.password.length < VConst.MinPasswordLength) {
      this.safeUpdate({isValidPassword: false});
      isValidForm = false;
    }

    // validate password match
    if (this.state.password !== this.state.pswrdConfirmation) {
      this.safeUpdate({doPasswordsMatch: false});
      isValidForm = false;
    }

    if (!isValidForm) return;

    AUTH
      .signup({ 
        username: this.state.username, 
        email: this.state.email, 
        password: this.state.password, 
        pswrdConfirmation: this.state.pswrdConfirmation })
      .then(res => {
        console.log("res.data: ", res.data);
        this.safeUpdate({ 
          success: res.data,
          isLoggedIn: res.data.isLoggedIn,
          isAdmin: false, 
          userId: res.data.userId,
          username: res.data.username,
          email: res.data.email         
         })
        // ------------------------------
        // Callback function to parent
        // ------------------------------
        this.props.getSignupResult({
          isLoggedIn: this.state.isLoggedIn,
          isAdmin: false, 
          userId: this.state.userId,
          username: this.state.username,
          email: this.state.email
        }, "/");
        // ------------------------------
        // Redirect On Successful Sign Up
        // ------------------------------
        this.safeUpdate({ redirectToReferrer: true });
      })
      .catch(err => {
        console.log("Error: ", err.response.data);
        let tempObj = {
          errorMsg: err.response.data,
          username: "",
          password: "",
          email: "",
          pswrdConfirmation: "",
          isLoggedIn: false
        };
        this.safeUpdate(tempObj);
      });
    this.safeUpdate({            
      isValidUserName: true,
      isValidPassword: true,
      isValidEmail: true,
      doPasswordsMatch: true
    });
  }

  render() {
    // If Signup is successful redirect to Home
    if (this.state.success) {
      return <Redirect to="/" />
    }

    return (
      <div className="container-fluid py-5 background">
        <div className="row justify-content-center text-center">
        
          <form className="col-12 col-md-6 my-1">
            <h1 className="col-12">Sign Up</h1>
            <div className="col-12 key-icon-wrap my-1">
              <i className="fas fa-key"></i>
            </div> 
            <div className="form-group">
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChange}
                className="form-control center-placeholder"
                placeholder="Enter Username - 3 To 30 Characters With Letters, Numbers, Or Underscores" />
              
            </div>
            { !this.state.isValidUsername 
              ? <ErrorUserName 
                  ErrorInUserName={!this.state.isValidUserName} 
                  UnameMinLength={VConst.UnameMinLength}
                  UnameMaxLength={VConst.UnameMaxLength}
                />
              : null
            }

            <div className="form-group">
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
                className="form-control center-placeholder"
                placeholder="Enter Email" />
              
            </div>
            { !this.state.isValidEmail 
              ? <ErrorEmail ErrorInEmail={!this.state.isValidEmail} />
              : null
            }

            <div className="form-group">
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                className="form-control center-placeholder"
                placeholder="Enter Password - Must Be At Least 6 Characters"
              />
            </div>
            { !this.state.isValidPassword 
              ? <ErrorPassword 
                  ErrorInPassword={!this.state.isValidPassword} 
                  MinPasswordLength={VConst.MinPasswordLength}
                />
              : null
            }
            <div className="form-group">
              <input
                type="password"
                name="pswrdConfirmation"
                value={this.state.pswrdConfirmation}
                onChange={this.handleInputChange}
                className="form-control center-placeholder"
                placeholder="Confirm Password"
              />
            </div>
            { !this.state.doPasswordsMatch
              ? <ErrorPasswordMatch ErrorInPasswordMatch={!this.state.doPasswordsMatch} />
              : null
            }
            {
              this.state.errorMsg !== "" 
              ? this.displayErrorMessage()
              : ""
            }
            <div className="form-group">
              <button type="submit" className="btn btn-block" onClick={this.register}>Sign Up</button>
            </div>
          
          </form>
        </div>
      </div>
    )
  }
}



export default Signup;