import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import AUTH from "../utilities/AUTH";
import Modal from 'react-modal';
import {ErrorUserName, ErrorPassword, WrongEmail} from "../components/ErrorComponents";
import * as VConst from "../constants/VConst";

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      errorMsg: "",
      isValidEmail: true,
      modalIsOpen: false,
      formatMsg: "Please Enter Your Email Below To Get A New Token",
      forgotEmail: ""
    }
  }
    

  componentDidMount() {
    this._isMounted = true;
    this.nextPathNav = "/";
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentWillReceiveProps(nextProps) {
    // this.openModal();
  }

  safeUpdate(stateObj) {
    if (this._isMounted) 
      this.setState(stateObj);
  }

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    })
  }

  checkErrorMessage() {
    // console.log("Checking For Error Messages");
    if (this.state.errorMsg !== "") {
      return (
        <span className="form-control bg-danger mb-2">{this.state.errorMsg}</span>
      );
    }
  }

  resetPassword(event){
    event.preventDefault();
   
    AUTH
      .forgot({email: this.state.forgotEmail})
      .then(res =>{
        console.log(res.data);
        this.safeUpdate({
          formatMsg: res.data,
          forgotEmail: ""
        }); 
      })
  }

  

  render() {
    

    return (
      <div className="container-fluid no-guters py-5 px-0 background">
        
        <div className="row justify-content-center login-alert">
              
          <h1 className="col-12 text-center" id="reset-password-line-one">Please Try Again</h1>
          <h2 className="col-12 text-center" id="reset-password-line-two">Your Reset Token Is Invalid Or Has Expired</h2>

          <h2 className="col-12 text-center">
            {this.state.formatMsg}
          </h2>

          <div className="col-12 key-icon-wrap my-1">
            <i className="fab fa-keycdn"></i>
          </div> 

          <form className="col-12 col-md-6 my-1" onSubmit={this.handleSubmit}>

              <div className="form-group text-center">
                  <input type="text" className="form-control py-1 center-placeholder" name="forgotEmail" value={this.state.forgotEmail}  placeholder="Enter Email" onChange={this.handleInputChange}/>
              </div>

              { !this.state.isValidEmail 
                ? <WrongEmail 
                    WrongEmail={!this.state.isValidEmail} 
                  />
                : null
              }

              <div className="form-group">
                  <button type="submit" className="btn btn-block py-1" onClick={(event)=>this.resetPassword(event)}>Reset Password</button> 
              </div>

            </form>
          </div>
      </div>                

      
      );
    }
}

export default Login;