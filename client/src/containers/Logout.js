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

  // Calls logout functionon component mount
  componentDidMount() {
    AUTH
      .logout()
      .then(res => {
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
      <Redirect to={{ pathname: "/" }}/>
    );
  }
}

export default Logout;