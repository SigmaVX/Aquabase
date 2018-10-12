import React, {Component} from "react";

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      trips: []
    }
  }
    
  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    })
  }

  
  render() {
    

    return (
      <div>
        <h1>Crew Info</h1>
        <h2>Upcoming Trips</h2>        
      </div>                

      
      );
    }
}

export default CrewInfo;