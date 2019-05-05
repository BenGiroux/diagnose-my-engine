import React, { Component } from 'react';
import './App.css';
import Question from './components/Question';
import { MuiThemeProvider } from "@material-ui/core/styles";
import Theme from "./components/Theme";
import Button from '@material-ui/core/Button';
import firebase from "firebase";

class App extends Component {
  constructor(props) {
    super(props);

    if (localStorage.getItem('questionState'))
      this.state = JSON.parse(localStorage.getItem('questionState'));
    else
      this.state = require('./Source.json');

    // Initialize Firebase
    firebase.initializeApp(require('./FirebaseConfig.json'));
  }

  changePage = (currentPageId) => {
    if (!this.state.landingMode && this.state.pages.find(p => p.id === currentPageId) == null)
      // Broken page
      currentPageId = 1200

    // eslint-disable-next-line no-mixed-operators
    if (this.state.landingMode && !this.state.landingPages.find(lp => lp.id === currentPageId) || (currentPageId < this.state.currentPage))
      this.setState({ landingMode: false });

    this.setState(prevState => (
      {
        pageHistory: !this.state.landingMode ? [...prevState.pageHistory, currentPageId] : [],
        currentPage: currentPageId
      }), () => { localStorage.setItem('questionState', JSON.stringify(this.state)); });
  };

  goBack = () => {
    let newHistory = this.state.pageHistory.slice(0, this.state.pageHistory.length - 1);

    this.setState({
      pageHistory: newHistory,
      currentPage: newHistory.length > 0 ? newHistory[newHistory.length - 1] : this.state.pages[0].id
    }, () => { localStorage.setItem('questionState', JSON.stringify(this.state)); });
  }

  reset = () => {
    this.setState({
      pageHistory: [],
      currentPage: this.state.pages[0].id
    }, () => { localStorage.setItem('questionState', JSON.stringify(this.state)); });
  }

  getPage = () => {
    if (this.state.landingMode)
      return this.state.landingPages.find(p => p.id === this.state.currentPage);
    else
      return this.state.pages.find(p => p.id === this.state.currentPage);
  }

  render() {
    return (
      <MuiThemeProvider theme={Theme}>
        <div className="App">
          <Question page={this.getPage()} changePage={this.changePage}></Question>
          <div style={{ padding: '1rem' }}>
            {this.state.currentPage !== 1 && !this.state.landingMode &&
              <div>
                <Button variant="outlined" onClick={this.goBack} style={{ marginRight: '0.2rem' }}>Back</Button>
                <Button variant="outlined" onClick={this.reset}>Reset</Button>
              </div>
            }
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
