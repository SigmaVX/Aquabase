import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import ReactDOM from "react-dom";
import AUTH from "../utilities/AUTH";
import {ErrorUserName, ErrorPassword, ErrorEmail, ErrorPasswordMatch} from "../components/ErrorComponents";
import * as VConst from "../constants/VConst";


class Signup extends Component {
  state = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    pswrdConfirmation: "",
    userType: "",
    userImage: "",
    errorMsg: "",
    successMsg: "",
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
    return (
      <div className="form-group alert alert-danger text-center mb-2">
        {this.state.errorMsg}
      </div>
    );
  }

  displaySuccessMessage() {
    setTimeout(()=>{
      this.safeUpdate({successMsg:""});
    }, 5000);

    return (
      <div id="success-message" className="form-group alert alert-success text-center mb-2">
        {this.state.successMsg}
      </div>
    );
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
  addCrew = (event) => {
    event.preventDefault();
    let isValidForm = true;

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
        firstName: this.state.firstName,
        lastName: this.state.lastName, 
        phone: this.state.phone,
        email: this.state.email, 
        password: this.state.password, 
        pswrdConfirmation: this.state.pswrdConfirmation,
        userType: this.state.userType,
        userImage: this.state.image
       })
      .then(res => {
        console.log("res.data: ", res.data);
        let tempObj = {
          firstName: "",
          lastName: "", 
          phone: "",
          email: "", 
          password: "", 
          pswrdConfirmation: "",
          userType: "",
          userImage: "",
          errorMsg: "",
          successMsg: res.data.successMsg
        };
        this.safeUpdate(tempObj);
      })
      .catch(err => {
        console.log("Error: ", err.response.data);
        this.safeUpdate({errorMsg: err.response.data});
      });

    this.safeUpdate({            
      isValidName: true,
      isValidPassword: true,
      isValidEmail: true,
      doPasswordsMatch: true
    });
  }

  render() {

    // Validate That Form Data Is Present
    const { firstName, lastName, email, phone, password, pswrdConfirmation, userType} = this.state;
    const isEnabled = firstName.length>0 && lastName.length >0 && email.length>0 && phone.length >0 && password.length>0 && pswrdConfirmation.length>0 && userType == "crew" || userType == "admin";
    // console.log(isEnabled);
    
    return (
      <div className="container-fluid py-5 background">
        <div className="row justify-content-center text-center">
        
          <form className="col-12 col-md-6 my-1">
             
            <div className="form-group">
              <input
                type="text"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleInputChange}
                className="form-control center-placeholder"
                placeholder="First Name" />
            </div>
        
            <div className="form-group">
              <input
                type="text"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleInputChange}
                className="form-control center-placeholder"
                placeholder="Last Name" />      
            </div>
        
            <div className="form-group">
              <input
                type="text"
                name="phone"
                value={this.state.phone}
                onChange={this.handleInputChange}
                className="form-control center-placeholder"
                placeholder="Phone" />      
            </div>
        

            <div className="form-group">
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
                className="form-control center-placeholder"
                placeholder="Email" />  
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
            
            <div className="form-group">
              <select
                type="text"
                name="userType"
                value={this.state.userType}
                onChange={this.handleInputChange}
                className="form-control center-placeholder"
                placeholder="Select Role">
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="crew">Crew</option>
              </select>
            </div>

            <div className="form-group">
              <input
                type="file"
                accept="image/*"
                name="image"
                value={this.state.image}
                onChange={this.handleInputChange}
                className="form-control center-placeholder"
                placeholder="Crew Image" />  
            </div>

            {
              this.state.errorMsg !== "" 
              ? this.displayErrorMessage()
              : ""
            }

            {
              this.state.successMsg !== "" 
              ? this.displaySuccessMessage()
              : ""
            }

            <div className="form-group">
              <button type="submit" disabled={!isEnabled} className="btn btn-block" onClick={this.addCrew}>Add Crew Member</button>
            </div>
          
          </form>

        </div>
      </div>
    )
  }
}



export default Signup;