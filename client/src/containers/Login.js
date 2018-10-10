import React, {Component} from "react";
import {Redirect, Link} from "react-router-dom";
import AUTH from "../utilities/AUTH";
import Modal from 'react-modal';
import {ErrorUserName, ErrorPassword, WrongEmail} from "../components/ErrorComponents";
import * as VConst from "../constants/VConst";

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      isLoggedIn: false,
      username: "",
      email: "",
      userId: "",
      password: "",
      returnStatus: 0,
      errorMsg: "",
      isValidUserName: true,
      isValidPassword: true,
      isValidEmail: true,
      modalIsOpen: false,
      formatMsg: "Please Enter The Email Associated With Your Tilt Account",
      forgotEmail: ""
    }
    // Bind This For Modal
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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

  // Method to handle user login - redirects to Home when done
  // validates entries first
  login = (event) => {
    let isValidForm = true;
    event.preventDefault();

    // validate username
    if (this.state.username.length < VConst.UnameMinLength || 
        this.state.username.length > VConst.UnameMaxLength) {
      this.safeUpdate({isValidUserName: false});
      isValidForm = false;
    }

    if (this.state.password.length < VConst.MinPasswordLength) {
      this.safeUpdate({isValidPassword: false});
      isValidForm = false;
    }

    if (!isValidForm) return;
    
    AUTH
      .login({username: this.state.username, password: this.state.password})
      .then(res => {
        console.log("Data Returned After Login: ", res.data);
        this.safeUpdate({
          isLoggedIn: res.data.isLoggedIn,
          username: res.data.username,
          userId: res.data.userId,
          email: res.data.email
        });

        // check if user is admin
        AUTH
        .adminCheck()
        .then(res => {
          this.safeUpdate({ 
            redirectToReferrer: true,
            isAdmin: res.data.isAdmin,
          });
          // ------------------------------
          // callback function to parent
          // ------------------------------
          this.props.getLoginResult({
            isLoggedIn: this.state.isLoggedIn,
            isAdmin: res.data.isAdmin, 
            userId: this.state.userId,
            username: this.state.username,
            email: this.state.email
          }, this.nextPathNav);
        })
        .catch(err => {
          console.log(err);
          this.safeUpdate({isAdmin: false});  
        })
      })
      .catch(err => {
        console.log(err);
        let tempObj = {
          returnStatus: -1,
          errorMsg: "Incorrect Username and/or Password",
          username: "",
          password: "",
          isLoggedIn: false
        };
        this.safeUpdate(tempObj);
      });
    
    this.safeUpdate({            
      isValidUserName: true,
      isValidPassword: true
    });
  }

  signup = (event) =>{
    event.preventDefault();
    this.props.history.push(`/signup`)
  }

  // Modal Methods
  // ==========================================================
   
  openModal() {
    this.setState({modalIsOpen: true});
  }
 
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }



  render() {
    // return to page from which user was originally sent before login attempt
    // if this fails, return to home page
    this.nextPathNav = (this.props.location.state) ? this.props.location.state.referrer : "/";
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      // console.log(`Login.js referrer: ${this.nextPathNav}`);
      return (
        <Redirect to={{ pathname: this.nextPathNav }} />
      );
    } 

    return (
      <div className="container-fluid no-guters py-5 px-0 background">
        
        <div className="row justify-content-center login-alert">
          
        
          <h1 className="col-12 text-center">Login</h1>
          <div className="col-12 key-icon-wrap my-1">
            <i className="fab fa-keycdn"></i>
          </div> 

          <form className="col-12 col-md-6 my-1">
            
            <div className="form-group">
              
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChange}
                className="form-control center-placeholder"
                placeholder="Enter Username"/>
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
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                className="form-control center-placeholder"
                placeholder="Enter Password"
              />
            </div>

            { !this.state.isValidPassword 
              ? <ErrorPassword 
                  ErrorInPassword={!this.state.isValidPassword} 
                  MinPasswordLength={VConst.MinPasswordLength}
                />
              : null
            }

            {
              this.state.returnStatus !== 0 
              ? this.checkErrorMessage()
              : ""
            } 

            <div className="form-group">
              <button type="submit" className="btn btn-block mt-3" onClick={this.login}>
                Submit Login
              </button>
              <button type="submit" className="btn btn-block mt-3" onClick={this.signup}>
                Sign Up
              </button>
              <div className="btn btn-block mt-3" onClick={()=>this.openModal()}>
                Forgot Password?
              </div>
            </div>

          </form>

        </div>

        <Modal
        className="animated fadeInDown"  
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        contentLabel="Forgot Modal"
        // appElement={el}
    >
          <div className="modal-header text-center">        
                <h2 className="modal-title" ref={subtitle => this.subtitle = subtitle}>Forgot Your Password?</h2>
          </div>

          <div className="modal-body">
                <div className="row justify-content-center text center my-4">
                
                    <h3 className="col-12 text-center">
                      {this.state.formatMsg}
                    </h3>

                    <form className="col-12 col-md-11" onSubmit={this.handleSubmit}>

                        <div className="form-group text-center">
                            <input type="text" className="form-control py-1" name="forgotEmail" value={this.state.forgotEmail}  placeholder="" onChange={this.handleInputChange}/>
                        </div>

                        { !this.state.isValidEmail 
                          ? <WrongEmail 
                              WrongEmail={!this.state.isValidEmail} 
                            />
                          : null
                        }
            
                        <div className="form-group">
                            <button type="submit" className="btn btn-block py-1" onClick={(event)=>this.resetPassword(event)}>Reset Password</button> 
                            <button type="close" className="btn btn-block py-1" onClick={()=>this.closeModal()}>Close</button>               
                        </div>
                    </form>
                </div>
            </div>                

          </Modal>










      </div>
      
      );
    }
}

export default Login;