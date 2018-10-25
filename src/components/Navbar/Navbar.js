import React, { Component } from 'react';
import './Navbar.css'
import { connect } from 'react-redux'
import { fetchVids } from '../../actions/vidActions'

class Navbar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            searchQuery: ''
        }

    }

    fetchVids() {
        this.props.fetchVids(this.state.searchQuery, null)
    }

    handleKeyPress(key){
        if(key === 'Enter'){
            this.props.fetchVids(this.state.searchQuery, null)
        }
    }

    render() {
        return (
            <nav className="Navbar">
                <div className="temp">
                    <div id="logo">YouTube Search</div>
                    <div>
                        <input onKeyPress = {(e) => this.handleKeyPress(e.key)} className = "submit_on_enter" onChange={(event) => this.setState({ searchQuery: event.target.value })} type="text" placeholder="Search..." value={this.state.searchQuery} />
                        <button onClick={() => this.fetchVids()}><i className="fa fa-search"></i></button>
                    </div>
                </div>
            </nav>
        )
    }
}


export default connect(null, { fetchVids })(Navbar)