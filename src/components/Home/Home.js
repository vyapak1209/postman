import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar'
import VideoList from '../VideoList/VideoList'

export default class Home extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <VideoList/>
      </div>
    )
  }
}
