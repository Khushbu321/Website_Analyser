import React, { Component } from 'react';
import './style.css';

class LandingPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url: '',
      data: null
    }
  }

  addData = (data) => {
    this.setState({
      data: data
    })
  }

  onSubmit = () => {
    var data = {
      optionURL: this.state.url
    }
    fetch("/api/sendURL", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        sessionStorage.setItem("unique_id", data.unique_id);
        this.dispalyResults();
     })
      .catch(err => console.log(err));
  }

  dispalyResults = () => {
    var data = {
      optionURL: this.state.url
    }
    var interval =  setInterval(() => {
      fetch(`/api/getResults?url=${data.optionURL}`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          // clearInterval(interval);
          this.addData(data)
        })
        .catch(err => console.log(err));
    }, 1000);
  }

  handleChange = (e) => {
    this.setState({
      url: e.target.value
    },()=> {
      console.log(this.state.url);
    })
  }

  render() {
    return (
      <div className="LandingPage">
      <div className="main_container">
        <div className="intro_text">Let's check your website</div>
        <div className="search_container">
          <div>
            <input type="text" id="url" className="input_url" name="name" value={this.state.url} onChange={this.handleChange} />
          </div>
          <div className="go_container">
            <button type="submit" className="go_button" onClick={this.onSubmit}>GO</button>
          </div>
      </div>
      </div>
        {this.state.data ? <div>{this.state.data}</div>: null}
      {/* <div className="header">
          <div className="header_items">About</div>
          <div className="header_items">Privacy</div>
          <div className="header_items">Disclamer</div>
      </div> */}
      </div>
    );
  }
}

export default LandingPage;
