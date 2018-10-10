import React, { Component } from "react";

class Search extends Component {
    state = {
        search: ""
    }

    // Save On Change Data
    handleOnChange = (event) => {
        const { name, value } = event.target;
        this.setState({[name]: value});
    }

    updateInfo = (event) =>{
        event.preventDefault();
        const searchObj = {
            cheaterIGN: this.state.search
        }
        this.props.reportSearch(searchObj);
        this.setState({
            search:""
        })
    }

    render(){
        return(
            <div className="container-fluid pt-3">
                <div className="row justify-content-center text-center">
                    <div className="col-12 col-md-8">
                        <h2 className="col-12">Search For Cheaters</h2>
                        
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control mb-2 search-box"
                                    name="search"
                                    value={this.state.search}
                                    placeholder="Enter An IGN To Search For A Cheater"
                                    onChange={this.handleOnChange}
                                    />
                                <button 
                                    className="btn btn-block" 
                                    onClick={this.updateInfo}>
                                    Search
                                </button>
                            </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default Search;