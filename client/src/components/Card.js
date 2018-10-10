import React, { Component } from "react";

class Card extends Component {

    state = {
        cardName: this.props.gameName||this.props.systemName || this.props.cheatName,
        cardImage:  this.props.gameImage||this.props.systemImage || this.props.cheatImage,
        cheatDescription: this.props.cheatDescription || null
    }

     // Save On Change Data
     handleOnChange = (event) => {
        const { name, value } = event.target;
        this.setState({[name]: value});
    }

    updateInfo = (id, name, image, cheatDescription) => {
        // console.log("Name: ", name, "Image: ", image);

        // Validatoion - Check If Empty
        if(this.state.cardName === "" && this.state.cardImage === ""){
            document.getElementById(id).innerHTML="Missing Name and Image!";
        } else {

            document.getElementById(id).innerHTML="Updated!";

            // Keep Image If Image Is Empty
            if(this.state.cardImage === ""){
                this.setState({
                    cardImage: image
                })
            }

            // Keep Name If Name Is Empty
            if(this.state.cardName === ""){
                this.setState({
                    cardName: name
                })
            }

            // Keep Cheat Description If Name Is Empty
            if(this.state.cheatDescription === ""){
                this.setState({
                    cheatDescription: cheatDescription
                })
            }


            let cardInfo ={};

            if(this.state.cheatDescription){
            
                cardInfo = {
                    cardName: this.state.cardName,
                    cardImage: this.state.cardImage,
                    id: id,
                    cheatDescription: this.state.cheatDescription
                }

            } else {
                
                cardInfo = {
                    cardName: this.state.cardName,
                    cardImage: this.state.cardImage,
                    id: id
                };
            }

            console.log("Card Info: ", cardInfo);
            if(this.props.updateGame){
                console.log("Update game processing");
                this.props.updateGame(cardInfo);
            } 
            
            if(this.props.updateSystem){
                console.log("Update system processing");
                this.props.updateSystem(cardInfo);
            }

            if(this.props.updateCheat){
                console.log("Update cheat type processing");
                this.props.updateCheat(cardInfo);
            }
        }   
    }

    render() {
        return (
            <div className="card col-12 col-md-3 mb-1 mx-1 no-gutters" key={this.props._id}>
                <img className="card-img-top img-fluid crop" src={this.props.gameImage || this.props.systemImage || this.props.cheatImage} alt={this.props.gameName || this.props.systemName || this.props.cheatImage}/>
                <div className="card-body">
                    <h5 className="card-title my-0">{this.props.gameName || this.props.systemName || this.props.cheatName}</h5>
                    <p className="card-body my-0" id={this.props._id}>Cheat Count: {this.props.cheatCount}</p>
                    <input type="text" className="form-control my-1 center-placeholder" name="cardName" value={this.state.cardName} placeholder="Update Name" onChange={this.handleOnChange}/>
                    <input type="text" className="form-control my-1 center-placeholder" name="cardImage" value={this.state.cardImage} placeholder="Update Image" onChange={this.handleOnChange}/>
                    
                        {this.props.cheatDescription
                            ?  <input type="text" className="form-control my-1 center-placeholder" name="cheatDescription" value={this.state.cheatDescription} placeholder="Update Description" onChange={this.handleOnChange}/>
                            :  null
                        }
                    
                    <button className="btn btn-block my-1" onClick={()=>this.updateInfo(this.props._id, this.props.gameName||this.props.systemName||this.props.cheatName, this.props.gameImage||this.props.systemImage||this.props.cheatImage, null || this.props.cheatDescription)}>Update Data</button>
                </div>
              </div>   
        )
    }
}

export default Card;