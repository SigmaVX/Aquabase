import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AUTH from "../utilities/AUTH";
import API from "../utilities/API";
import {ErrorPassword, ErrorPasswordMatch} from "../components/ErrorComponents";
import * as VConst from "../constants/VConst";


class Reset extends Component {
  state = {
    isLoggedIn: false,
    isAdmin: false,
    success: false,
    password: "",
    pswrdConfirmation: "",
    firstName: "",
    lastName: "",
    email: "",
    userId: "",
    errorMsg: "",
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
    this.loadResetData();
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
    // console.log("Checking For Error Message");
    if (this.state.errorMsg !== "") {
      return (
        <div className="alert alert-danger text-center mb-2">
          {this.state.errorMsg}
        </div>
      );
    }
  }


  loadResetData = () => {

    console.log("Loading Reset Data");
    
    API.getResetData()
    .then(res => {
        console.log("Reset Data: ", res.data);
        this.setState({
            userId: res.data.userId,
            email: res.data.email
        })
        
        // check if user is admin
        AUTH
        .adminCheck()
        .then(res => {
          this.safeUpdate({ 
            isAdmin: res.data.isAdmin
          });
          // ------------------------------
          // callback function to parent
          // ------------------------------
          this.props.getResetResult({
            isLoggedIn: true,
            isAdmin: res.data.isAdmin, 
            userId: this.state.userId,
            email: this.state.email
          })
        })
        .catch(err => {
          console.log(err);
          this.safeUpdate({isAdmin: false});  
        })
    })
    .catch(err => console.log(err))
    }

  // -----------------------------------------------------------------------

 updatePassword = (event) => {

    event.preventDefault();
    
    let isValidForm = true;

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

    console.log(this.state.userId);

    AUTH
      .updatePassword({ 
        userId: this.state.userId,  
        password: this.state.password, 
        pswrdConfirmation: this.state.pswrdConfirmation })
      .then(res => {
        console.log("Password Update Data From Back End: ", res.data);
        this.safeUpdate({ 
          success: res.data,
          isLoggedIn: res.data.isLoggedIn,
          isAdmin: false, 
          userId: res.data.userId,
          username: res.data.username,
         })

        // ------------------------------
        // Check If User Is Admin
        //  -----------------------------

         AUTH
         .adminCheck()
         .then(res => {
           this.safeUpdate({ 
            isAdmin: res.data.isAdmin
          });

        // ------------------------------
        // Callback Function to Parent
        // ------------------------------
          
          this.props.getResetResult({
            isLoggedIn: this.state.isLoggedIn,
            isAdmin: res.data.isAdmin, 
            userId: this.state.userId,
            username: this.state.username,
            email: this.state.email
            }, "/");
          })
      })

      .catch(err => {
        console.log(err.response.data);
        let tempObj = {
          errorMsg: err.response.data,
          password: "",
          pswrdConfirmation: "",
          isLoggedIn: false
        };
        this.safeUpdate(tempObj);
      });

      this.safeUpdate({            
          isValidPassword: true,
          doPasswordsMatch: true
        });
      }

  render() {
    // If Signup was a success, take them to the Home page
    if (this.state.success) {
      return <Redirect to="/" />
    }




    return (
      <div className="container-fluid py-5 background">
        <div className="row justify-content-center text-center">
        
          <form className="col-12 col-md-6 my-1">
            <h1 className="col-12" id="reset-text">Reset Password</h1>
              
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
              <button type="submit" className="btn btn-block" onClick={this.updatePassword}>Change Password</button>
            </div>
          
          </form>
        </div>
      </div>
    )
  }
}



export default Reset;