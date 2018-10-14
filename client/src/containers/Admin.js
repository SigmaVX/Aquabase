import React, {Component} from "react";
import Search from "../components/Search";
import Moment from "moment";
import Modal from 'react-modal';
import API from "../utilities/API";
// import ReactDOM from 'react-dom';

class Admin extends Component {

    constructor() {
        super();

    // Set Initial State
    this.state = {
        trips:[],
        modalIsOpen: false
    };

    // Bind This For Modal
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    }

    // Save On Change Data
    handleOnChange = (event) => {
        const { name, value } = event.target;
        this.setState({[name]: value});
    }

    componentDidMount(){
        
    }

    // Load Cheats To State
    // loadCheats = () => {
    //     API.getCheats()
    //     .then(res => {
    //         // console.log(res.data);
    //         this.setState({
    //           cheats: res.data,
    //         })
    //     })
    //     .catch(err => console.log(err))
    // }

    // Load Games To State
    // loadGames = () => {
    //     API.getGames()
    //     .then(res => {
    //         // console.log(res.data);
    //         this.setState({
    //           games: res.data,
    //         })
    //     })
    //     .catch(err => console.log(err))
    // }

    // Load Systems To State
    // loadSystems = ()=> {
    //     API.getSystems()
    //     .then(res => {
    //         // console.log(res.data);
    //         this.setState({
    //           systems: res.data,
    //         })
    //     })
    //     .catch(err => console.log(err))
    // }

    // Load State From Mongo
    // pageLoad = () =>{
    //     this.loadGames();
    //     this.loadSystems();
    //     this.loadCheats();
    //     this.loadForums();
    // }

    // Search For Reports By IGN
    reportSearch = (searchObject) => {
        // console.log("Search Obj: ", searchObject);

        API.getReportsByIGN(searchObject).then(res => {
            // console.log("Res Data: ", res.data);
            this.setState({
                reports: res.data
            })
        })
        .catch(err => console.log(err))
    }

    // Post Cheat
    postCheat = (event) =>{
        event.preventDefault();
        API.postCheats({
            cheatName: this.state.cheatName,
            cheatImage: this.state.cheatImage,
            cheatDescription: this.state.cheatDescription
        }).then(res => {
            this.loadCheats();
            this.setState({
            cheatName: "",
            cheatImage: "",
            cheatDescription: ""
            });
        }).catch(err => console.log(err))
    }

     // Post Game
     postGame = (event) =>{
        event.preventDefault();
        API.postGames({
            gameName: this.state.gameName,
            gameImage: this.state.gameImage
        }).then(res => {
            this.loadGames();
            this.setState({
            gameName: "",
            gameImage: ""
            });
        }).catch(err => console.log(err))
    }

    // Post System
    postSystem = (event) =>{
        event.preventDefault();
        API.postSystems({
            systemName: this.state.systemName,
            systemImage: this.state.systemImage
        }).then(res => {
            this.loadSystems();
            this.setState({
            systemName: "",
            systemImage: ""
            })    
        }).catch(err => console.log(err))
    }

    // Post Forum
    postForum = (event) =>{
      event.preventDefault();
      API.postForum({
          forumChatRoom: this.state.forumChatRoom
      }).then(() => {
          this.setState({forumChatRoom: ""});
          this.loadForums();    
      }).catch(err => console.log(err))
    }
   
   // Update Cheat
   updateCheat = (cardObject) =>{
        console.log("Cheat Object:", cardObject);
        API.putCheat(cardObject.id, {
            cheatName: cardObject.cardName,
            cheatImage: cardObject.cardImage,
            cheatDescription: cardObject.cheatDescription
        }).then(res => {
            this.loadCheats();
            this.setState({
                cheatName: "",
                cheatImage: "",
                cheatDescription: ""
            })
        }).catch(err => console.log(err))
    }

    // Save Edit Info To State To Pass To Modal and Trigger Modal 
    editReport = (id, comments, video, ign) =>{
        this.setState({
            editCheatComments: comments,
            editCheatVideo: video,
            editCheaterIGN: ign,
            editId: id
        })
        // console.log("Edit Prams For State: ", id, comments, video, ign);
        this.openModal();
    }

    // Update Comments & Video With Edit Button
   updateCommentsAndVideo = (event, id) =>{
    event.preventDefault();
    const sendObject = {
        cheatComments: this.state.editCheatComments,
        cheatVideo: this.state.editCheatVideo
    }

    console.log("Send Object: ", sendObject);

    API.putCommentsAndVideos(id, sendObject).then(res => {
        this.reportSearch({cheaterIGN: this.state.editCheaterIGN})
        this.setState({
            editCheatName: "",
            editCheatImage: "",
            editCheaterIGN: "",
            editId: ""
        })
        this.closeModal();
    }).catch(err => console.log(err))
}

    // Update Game
    updateGame = (cardObject) =>{
        // console.log("Game Object:", cardObject);
        API.putGame(cardObject.id, {
            gameName: cardObject.cardName,
            gameImage: cardObject.cardImage
        }).then(res => {
            this.loadGames();
            this.setState({
                gameName: "",
                gameImage: ""
            })
        }).catch(err => console.log(err))
    }
   
    // Update System
    updateSystem = (cardObject) =>{
        // console.log("Game Object:", cardObject);
        API.putSystem(cardObject.id, {
            systemName: cardObject.cardName,
            systemImage: cardObject.cardImage
        }).then(res => {
            this.loadSystems();
            this.setState({
                systemName: "",
                systemImage: ""
            }) 
        }).catch(err => console.log(err))
    }


    // Delete Report
    deleteReportItem = (id, cheatGame, cheatSystem, cheatType, cheaterIGN) =>{
        API.deleteReport({id:id})
        .then(res => {
            this.reportSearch({cheaterIGN: res.data.cheaterIGN});
            const countObject = {   
                gameName : cheatGame,
                systemName : cheatSystem,
                cheatName : cheatType,
                cheaterIGN: cheaterIGN
            };  
            // console.log("Count Object: ", countObject);
            API.reduceCounts(countObject);
            // console.log("Delete Done!")
        })
        .catch(err => console.log(err))
    }


    // Modal Methods
    // ==========================================================
   
        openModal() {
            this.setState({modalIsOpen: true});
        }
       
        afterOpenModal() {
          // references are now sync'd and can be accessed.
        //   this.subtitle.style.color = '#f00';
        }
       
        closeModal() {
          this.setState({modalIsOpen: false});
        }


  render() {

    // Set Target For Modal - Required As Per React Modal Docs
    Modal.setAppElement('#root');

    return (

    <div>
        
        
        <div className="row no-gutters jumbotron text-center admin-jumbo mb-0">
            <h1 className="col-12 animated bounceInLeft">Admin</h1>
            <h2 className="col-12 animated bounceInLeft">Choose Wisely</h2>
        </div>

        <div className="container-fluid admin-data py-4">
            
            <div className="row justify-content-center text-center mx-2 my-2">

                <div className="col-12 col-md-5">
                    <h2>Add Crew</h2>
                    <form>
                        <div className="form-group">
                            <input type="text" className="form-control my-2 center-placeholder" name="systemName" value={this.state.systemName}  placeholder="Enter New System Name" onChange={this.handleOnChange}/>
                            <input type="text" className="form-control my-2 center-placeholder" name="systemImage" value={this.state.systemImage}  placeholder="Enter System Image Path" onChange={this.handleOnChange}/>
                            <button type="submit" className="btn btn-block my-2" onClick={this.postSystem}>Add System</button>
                        </div>
                        
                    </form>
                </div>

                <div className="col-12 col-md-5">
                    <h2>Add Boat</h2>
                    <form>
                        <div className="form-group">
                            <input type="text" className="form-control my-2 center-placeholder" name="gameName" value={this.state.gameName}  placeholder="Enter New Game Name" onChange={this.handleOnChange}/>
                            <input type="text" className="form-control my-2 center-placeholder" name="gameImage" value={this.state.gameImage}  placeholder="Enter Game Image Path" onChange={this.handleOnChange}/>
                            <button type="submit" className="btn btn-block my-2" onClick={this.postGame}>Add Game</button>
                        </div>
                        
                    </form>
                </div>
            </div>
            

        
            <div className="row justify-content-center text-center mt-4 mb-2">
                <h2 className="col-12">Tracked Systems</h2>

            </div>


            <div className="row justify-content-center text-center pt-3 pb-2">
                <h2 className="col-12">Tracked Games</h2>
           
            </div>


            <Search
                reportSearch={this.reportSearch}
            />
                    
            <div className="container py-5">
                <h2 className="col-12 text-center">{this.state.trips.length
                    ? ""
                    : "No Search Results!"}
                </h2>
                <div className="row justify-content-center">
                <table className="col-10">
                    <tbody>
                    {this.state.trips.map(report=>{
                        return (
                        <tr className="row justify-content-center reports-row py-2" key={report._id}>
                            
                            <td className="col-12 col-md-8">
                                <h5 className="ign-title mt-2 mb-1">{report.cheaterIGN} ({report.cheatSystem.systemName})</h5>
                                <h6 className="cheat-type my-1">Game Name: {report.cheatGame.gameName} Cheat Type: {report.cheatType.cheatName}</h6>
                                <p className="date my-1">Reported On: {Moment(report.date).format('MMM Do YY')}</p>
                                <a className="video-link my-1" target="_blank" href={report.cheatVideo}>{report.cheatVideo ? report.cheatVideo : "No Video Link Posted"}</a>
                                <p className="comment-text my-1">{report.cheatComments ? `Comments: ${report.cheatComments}` : "No Comments"}</p>
                            </td>
                            <td className="col-12 col-md-2 text-center">
                                <button className="btn btn-block mt-4" onClick={() => this.deleteReportItem(report._id, report.cheatGame._id, report.cheatSystem._id, report.cheatType._id, report.cheaterIGN)}>Delete</button>
                                <button className="btn btn-block" onClick={() => this.editReport(report._id, report.cheatComments, report.cheatVideo, report.cheaterIGN)}>Edit</button>
                            </td>
                        </tr>
                        )
                    })}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
               

        <Modal
            className="animated fadeInDown"  
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            contentLabel="Edit Modal"
        >
            <div className="modal-header text-center">        
                <h2 className="modal-title" ref={subtitle => this.subtitle = subtitle}>Edit Report Comments And Video</h2>
           </div>

           <div className="modal-body">
                <div className="row justify-content-center text center my-4">
                    <form className="col-12 col-md-11" onSubmit={this.handleSubmit}>
                        
                        <div className="form-group">
                            <label>Edit YouTube Video Link:</label>
                            <input type="text" className="form-control py-1" name="editCheatVideo" value={this.state.editCheatVideo}  placeholder="https://youtu.be/6Zcib-ZT2qk" onChange={this.handleOnChange}/>
                        </div>
                        <div className="form-group">
                            <label>Edit Comments:</label>
                            <textarea type="text" className="form-control py-1" name="editCheatComments" value={this.state.editCheatComments}  placeholder="Comments Must Be Less Than 300 Characters" onChange={this.handleOnChange}/>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-block py-1" onClick={(event)=>this.updateCommentsAndVideo(event, this.state.editId)}>Update Data</button> 
                            <button type="close" className="btn btn-block py-1" onClick={this.closeModal}>close</button>               
                        </div>
                    </form>
                </div>
            </div>                



        </Modal>
                



    </div>
    )
  }
}

export default Admin;

/*

this.setState({updatedChatRoom[index]: forum.forumChatRoom});

              { 
                this.state.forums.map((forum, index) => {
                  return (
                    <div className="card col-12 col-md-3 mb-1 mx-1 no-gutters" key={forum._id}>
                      <div class="card-body">
                        <h5 class="card-title">{forum.forumChatRoom}</h5>
                      </div>
                    </div>
                )}
              )}

 */