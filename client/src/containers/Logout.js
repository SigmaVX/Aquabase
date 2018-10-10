import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import AUTH from "../utilities/AUTH";

class Logout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tempVar: "temp variable"
    }
  }

  // simply call logout function as soon as component mounts
  componentDidMount() {
    AUTH
      .logout()
      .then(res => {
          // console.log(res.data);
          // ------------------------------
          // callback function to parent
          // ------------------------------
          this.props.getLogoutResult(
            res.data
          );
      })
      .catch(err => {
        console.log(err); 
      })
  }

  render() {
    return (
      <Redirect to={{ pathname: "/login" }} />    
      );
  }

}

export default Logout;