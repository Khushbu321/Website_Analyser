import React, { Component } from 'react';
import './App.css';
import LandingPage from '../src/LandingPage/index';
import ResultsPage from '../src/ResultsPage/index';
class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      url: '',
      data: null
    }
  }

  // addData = (data) => {
  //   this.setState({
  //     data: data
  //   })
  // }

  // onSubmit = () => {
  //   var data = {
  //     optionURL: this.state.url
  //   }
  //   fetch("/api/sendURL", {
  //     method: "POST", // *GET, POST, PUT, DELETE, etc.
  //     mode: "cors", // no-cors, cors, *same-origin
  //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  //     credentials: "same-origin", // include, *same-origin, omit
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then(response => response.json())
  //     .then(data => { sessionStorage.setItem("unique_id", data.unique_id); })
  //     .catch(err => console.log(err));
  // }

  // dispalyResults = () => {
  //   var data = {
  //     optionURL: this.state.url
  //   }
  //   fetch(`/api/getResults?url="${data.optionURL}"`, {
  //     method: "GET", // *GET, POST, PUT, DELETE, etc.
  //     mode: "cors", // no-cors, cors, *same-origin
  //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  //     credentials: "same-origin", // include, *same-origin, omit
  //     headers: {
  //       "Content-Type": "application/json",
  //     }
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data);
  //       this.addData(data) })
  //     .catch(err => console.log(err));
  // }

  // handleChange = (e) => {
  //   this.setState({
  //     url: e.target.value
  //   })
  // }

  render() {
    return (
      <div className="App">
      <LandingPage/>
      <ResultsPage/>
        {/* <div className="search_container">
            <div>
              <label>Enter URL:</label>
              <input type="text" id="url" name="name" value={this.state.url} onChange={this.handleChange} />
            </div>
            <div>
              <button type="submit" onClick={this.onSubmit}>OK</button>
            </div>
        </div>
        <div className="results_container">
          <div>
            <button onClick={this.dispalyResults}>Show Results</button>
          </div>
          <div className="result">
            {this.state.data}
          </div>
        </div> */}
      </div>
    );
  }
}

export default App;
