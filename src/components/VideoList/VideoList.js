import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchVids, sortVids } from '../../actions/vidActions'
import './VideoList.css'


class VideoList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            vidArr: [],
            showModal: false,
            modalUrl: '',
            currVid: {},
            sortType: ''
        }

    }


    onVidSelect(url, snippet) {
        this.setState({
            showModal: true,
            modalUrl: url,
            currVid: snippet,
        })
    }

    onBackDropPress() {
        if (this.state.showModal) {
            this.setState({
                showModal: false
            })
        }
    }

    loadMore() {
        console.log("Next Token ", this.props.nextToken)
        this.props.fetchVids(this.props.currQuery, this.props.nextToken)
    }


    onSelectSortType(type) {
        this.setState({ sortType: type })

        this.props.sortVids(this.props.vids, type)

    }


    render() {
        console.log("Vids ", this.props.vids)
        console.log("Modal state ", this.state.showModal)
        return (
            <div>
                <div className="container" >
                    <div className="row">
                        <div style={{ marginTop: "50px" }} className="col-md-8">
                            <div>
                                {
                                    (this.props.vids) ? this.props.vids.map((item) => {
                                        let url = `https://www.youtube.com/embed/${item.id}`
                                        return (
                                            <div className="videoContainer">
                                                {/* <iframe width="170" height="100" src={url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe> */}
                                                <div style={{ height: "180px", width: "320px" }}>
                                                    <a onClick={() => this.onVidSelect(url, item.snippet)} href="#" style={{ color: "black" }}>
                                                        <img alt = {item.snippet.thumbnails.medium.url} src={item.snippet.thumbnails.medium.url} height="150px" width="265px" />
                                                    </a>
                                                </div>
                                                <div className="descContainer">
                                                    <a onClick={() => this.onVidSelect(url, item.snippet)} href="#" style={{ color: "black" }}>
                                                        <h5>
                                                            {item.snippet.title}
                                                        </h5>
                                                    </a>
                                                    <label>
                                                        {item.snippet.channelTitle}
                                                    </label>
                                                </div>
                                            </div>
                                        )
                                    }) : null
                                }
                            </div>
                            <div style={{ display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'flex-end', marginBottom: "50px" }}>
                                {(this.props.vids && this.props.vids.length > 0) ? <span onClick={() => this.loadMore()} style={{ color: "rgb(78, 125, 228)" }} className="fake-link" id="fake-link-1"><h5>Load more...</h5></span> : <div />}
                            </div>
                        </div>
                        <div style={{ marginTop: "50px", }} className="col-md-4">

                            {(this.props.vids && this.props.vids.length > 0) ? <select style={{ backgroundColor: "#eee" }} className="btn" onChange={(e) => this.onSelectSortType(e.target.value)} placeholder="Sort by">
                                <option value="none" disabled selected hidden>Sort by</option>
                                <option value="a-z">A-Z</option>
                                <option value="z-a">Z-A</option>
                                <option value="d-h-l">Date: Descending</option>
                                <option value="d-l-h">Date: Ascending</option>
                            </select> : <div />}

                        </div>
                    </div>
                </div>


                {(this.state.showModal) ? <div onClick={() => this.onBackDropPress()} style={{ backgroundColor: "rgba(0, 0, 0, 0.9)", height: "100%", width: "100%", position: 'fixed', top: "0px", left: "0px" }}>
                    <div className="videoModal" style={{ display: 'flex', color: 'white', height: "620px", width: "920px", position: 'fixed', top: "100px", left: "320px", borderRadius: "15px", alignItems: 'center', justifyContent: 'center', zIndex: "100", flexDirection: 'column' }}>
                        <iframe title = {this.state.modalUrl} style={{ marginTop: "20px" }} width="680" height="400" src={this.state.modalUrl} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                        <h2 style={{ marginLeft: "30px", marginTop: "20px", marginRight: "20px", width: "680px", textAlign: 'left' }}>
                            {this.state.currVid.title}
                        </h2>
                        <h5 style={{ marginLeft: "30px", marginTop: "10px", marginRight: "20px", width: "680px", textAlign: 'left' }}>
                            {this.state.currVid.channelTitle}
                        </h5>
                        <h6 style={{ marginLeft: "30px", marginTop: "10px", marginRight: "20px", width: "680px", textAlign: 'left' }}>
                            {this.state.currVid.description}
                        </h6>
                    </div></div> : <div />}

            </div>
        )
    }
}


const mapStateToProps = state => ({
    vids: state.vids.items,
    nextToken: state.vids.nextToken,
    currQuery: state.vids.currQuery
})



export default connect(mapStateToProps, { fetchVids, sortVids })(VideoList);
