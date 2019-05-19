import React from 'react';
import './App.css';
import Question from './components/Question';
import { MuiThemeProvider } from "@material-ui/core/styles";
import Theme from "./components/Theme";
import Button from '@material-ui/core/Button';
import firebase from "firebase";
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import ReactGA from 'react-ga';
import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageHistory: []
    }

    // Question source
    this.app = require('./Source.json');
    // Initialize Firebase
    firebase.initializeApp(require('./FirebaseConfig.json'));
    // Google analytics
    this.initReactGa();
  }

  changePage = (currentPageId) => {
    if (!this.app.landingPages.find(p => p.id === currentPageId) && !this.app.pages.find(p => p.id === currentPageId))
      currentPageId = 1200;

    ReactGA.event({
      category: 'Question',
      action: `Load question ${currentPageId}`
    });

    this.setState(prevState => (
      {
        pageHistory: [...prevState.pageHistory, currentPageId]
      }));

    this.props.history.push(`/question/${currentPageId}`);
  };

  goBack = () => {
    let newHistory = this.state.pageHistory.slice(0, this.state.pageHistory.length - 1);

    this.setState({
      pageHistory: newHistory
    });

    this.props.history.push(`/question/${(newHistory[newHistory.length - 1] != null) ? newHistory[newHistory.length - 1] : this.app.pages[0].id}`);
  }

  reset = () => {
    this.setState({
      pageHistory: []
    });

    this.props.history.push(`/question/${this.app.pages[0].id}`);
  }

  getPage = (pageId) => {
    if (this.app.landingPages.find(p => p.id === pageId))
      return this.app.landingPages.find(p => p.id === pageId);
    else if (this.app.pages.find(p => p.id === pageId))
      return this.app.pages.find(p => p.id === pageId);
    else
      return this.app.landingPages[0];
  }

  initReactGa = () => {
    ReactGA.initialize('UA-140389226-1');
    ReactGA.pageview('/homepage');
  }

  render() {
    return (
      <MuiThemeProvider theme={Theme}>
        <Switch>
          <Route path='/question/:id' render={(props) => (
            <div className="App">
              <Question page={this.getPage(Number(props.match.params.id))} changePage={this.changePage}></Question>
              <div style={{ padding: '1rem' }}>
                {!this.app.landingPages.find(p => p.id === Number(props.match.params.id)) ?
                  <div>
                    {this.state.pageHistory.length ? <Button variant="outlined" onClick={() => this.goBack(Number(props.match.params.id))} style={{ marginRight: '0.2rem' }}>Back</Button> : ''}
                    <Button variant="outlined" onClick={this.reset}>Reset</Button>
                  </div>
                  : ''}
              </div>
            </div>
          )} />
          <Redirect from="*" to="/question/1" />
        </Switch>
      </MuiThemeProvider>
    );
  }
}

export default App;
