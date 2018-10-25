import React, { Component } from "react";
import "./App.css";
import { Provider } from 'react-redux'
import store from './store'
import Navbar from './components/Navbar/Navbar'
import VideoList from './components/VideoList/VideoList'

class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <div>
          <Navbar/>
          <VideoList/>
        </div>
      </Provider>
    );
  }
}

export default App;
