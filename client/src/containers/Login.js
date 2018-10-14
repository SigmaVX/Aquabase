import React, {Component} from "react";
import {Redirect, Link} from "react-router-dom";
import AUTH from "../utilities/AUTH";
import Modal from 'react-modal';
import {WrongEmail} from "../components/ErrorComponents";
// import * as VConst from "../constants/VConst";

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      isLoggedIn: false,
      isAdmin: false,
      email: "",
      password: "",
      userId: "",
      userType: "",
      returnStatus: 0,
      errorMsg: "",
      isValidPassword: true,
      isValidEmail: true,
      modalIsOpen: false,
      formatMsg: "Please Enter The Email Associated With Your Aquabase Account",
      forgotEmail: ""
    }
    // Bind This For Modal
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.nextPathNav = "/crew-portal";
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

  // Login With Sessions & Bycrpt
  login = (event) => {
    let isValidForm = true;
    event.preventDefault();

    AUTH
      .login({email: this.state.email, password: this.state.password})
      .then(res => {
        console.log("Res Data: ", res.data);
          if(res.data.userType == "admin"){
            
            this.safeUpdate({
              isLoggedIn: res.data.isLoggedIn,
              firstName: res.data.firstName,
              lastName: res.data.lastName,
              userType: res.data.userType,
              userId: res.data.userId,
              email: res.data.email,
              redirectToReferrer: true,
              isAdmin: true,
              errorMsg: ""
            });

          } else {
            this.safeUpdate({
              isLoggedIn: res.data.isLoggedIn,
              firstName: res.data.firstName,
              lastName: res.data.lastName,
              userType: res.data.userType,
              userId: res.data.userId,
              email: res.data.email,
              redirectToReferrer: true,
              isAdmin: false,
              errorMsg: ""
            });
          }
 
          console.log(this.state.isAdmin);
        
          // ------------------------------
          // Callback To Parent
          // ------------------------------
          this.props.getLoginResult({
            isLoggedIn: this.state.isLoggedIn,
            isAdmin: this.state.isAdmin, 
            userId: this.state.userId,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            userType: this.state.userType,
            email: this.state.email
            }, this.nextPathNav);
          })
      
      .catch(err => {
        console.log(err);
        let tempObj = {
          returnStatus: -1,
          errorMsg: "Incorrect Username and/or Password",
          password: "",
          isLoggedIn: false
        };
        this.safeUpdate(tempObj);
      });

    this.safeUpdate({            
      isValidEmail: true,
      isValidPassword: true
    });
  }

  // Modal Methods
  // ==========================================================
   
  openModal() {
    this.setState({modalIsOpen: true});
  }
 
  afterOpenModal() {
    // this.subtitle.style.color = '#f00';
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }



  render() {

    // Redirects To Crew Portal After Login
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer) {
      return (
        <Redirect to={{ pathname: "/crew-portal" }} />
      );
    } 

    // Prevent Submit If Fields Are Empty
    const isEnabled = this.state.email.length>0 && this.state.password.length>0;


    return (
      <div className="container-fluid no-guters py-5 px-0 background">
        
        <div className="row justify-content-center login-alert">
          
          <h1 className="col-12 text-center">Crew Login</h1>

          <form className="col-12 col-md-6 my-1">
            
            <div className="form-group"> 
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
                className="form-control center-placeholder"
                placeholder="Enter Email"/>
            </div>
            
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

            {
              this.state.returnStatus !== 0 
              ? this.checkErrorMessage()
              : ""
            } 


            <div className="form-group">
              <button type="submit" disabled={!isEnabled} className="btn btn-block mt-3" onClick={this.login}>
                Submit Login
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