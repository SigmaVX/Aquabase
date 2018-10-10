import React, {Component} from "react";
import API from "../utilities/API";
import Search from "../components/Search";
import Moment from "moment";

class Home extends Component {

    // Set Initial State
    state = {
        reports: [],
        games: [],
        systems: [],
        cheats: [],
        cheaters: [],
        chartData: [],
        legendData: [],
        items: [],
        userID: 1
    }

    componentDidMount =() => {
        // this.pageLoad();
    }

    // Save On Change Data
    handleOnChange = (event) => {
        const { name, value } = event.target;
        this.setState({[name]: value});
    }

    // Load State From Mongo
    pageLoad = () =>{
        this.loadReports();
        this.loadRecapCounts();
    }

    // Load Sorted Recap To State
    loadRecapCounts = ()=> {
        API.getRecapCounts()
        .then(res => {
            // console.log(res.data);
            this.setState({
              systems: res.data.systems,
              games: res.data.games,
              cheats: res.data.cheats,
              cheaters: res.data.cheaters
            })
            // console.log(res.data.cheats);
            // console.log(this.state.cheats);
            const chartData =[];
            const legendData = [];
            const myColors = ['#681D7F','#E287FF','#D03AFF','#71437F','#A72FCC','#570D7F','#C966FF', '#AE1AFF', '#65337F', '#8B15CC'];
            this.state.cheats.map(function(cheat,i){
                chartData.push({theta: cheat.cheatCount, label: cheat.cheatName, color: myColors[i]})                
            });
            this.state.cheats.map(function(cheat,i){
                legendData.push({title: cheat.cheatName +" ("+ cheat.cheatCount +")", color: myColors[i]})
            })
            this.setState({chartData: chartData, legendData: legendData});
            // console.log("Chart Data: ", this.state.chartData);
        })
        .catch(err => console.log(err))
    }

    // Load Reports To State
    loadReports = () => {
    API.getReports()
    .then(res => {
        // console.log("Reports: ", res.data);
        this.setState({
            reports: res.data,
        })
    })
    .catch(err => console.log(err))
    }

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

    postReport = (event) => {
        event.preventDefault();
        const sendObject ={
            cheaterIGN: this.state.cheaterIGN,
            cheatGame: this.state.cheatGame,
            cheatSystem: this.state.cheatSystem,
            cheatType: this.state.cheatType,
            cheatVideo: this.state.cheatVideo,
            cheatComments: this.state.cheatComments
        }

        // console.log(sendObject);
        API.postReport(sendObject)
        .then(res=> {
            // console.log(res.data)
            this.setState({
            cheaterIGN: "",
            cheatGame: "",
            cheatSystem: "",
            cheatType: "",
            cheatVideo: "",
            cheatComments: ""
            })
            this.loadReports();
        })
    }

  render() {
    
    return (

    <div>

        <div className="videoHolder jumbotron splash d-flex align-items-center">
            <div className="col-12 no-gutters text-center" id="splash-text">
                <h1 className="col-12 animated rotateIn" id="tilt-title">Aquabase</h1>
                <h2 className="col-12 animated fadeIn" id="splash-subtitle">add text here</h2>
            </div>    
        </div>


        <div className="container-fluid home-results background">
            
            <div className="text-center col-12 col-md-8 offset-md-2 pt-5 pb-3">
                <h3 className="pitch-text">add stuff here</h3>
            </div>
     
        </div>
    </div>
    )
  }
}

export default Home;

