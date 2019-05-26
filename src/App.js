import React from 'react';
import './App.css';
import Question from './components/Question';
import Navigation from './components/Navigation';
import { MuiThemeProvider } from "@material-ui/core/styles";
import Theme from "./components/Theme";
import Header from './components/Header';

import firebase from "firebase";
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import ReactGA from 'react-ga';
import Intro from './components/Intro';
// import {
//   CSSTransition,
//   TransitionGroup
// } from 'react-transition-group';

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

  componentDidMount = () => {
    this.setViewportHeight();

    // We listen to the resize event
    window.addEventListener('resize', () => {
      this.setViewportHeight();
    });
  }

  setViewportHeight = () => {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
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
        pageHistory: (!this.app.landingPages.find(p => p.id === currentPageId) && this.app.pages[0].id !== currentPageId) ? [...prevState.pageHistory, currentPageId] : []
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
          <Route path='/welcome' component={Intro} />
          <Route path='/question/:id' render={(props) => (
            <div className="App">
              <Header />
              <Question page={this.getPage(Number(props.match.params.id))} changePage={this.changePage}></Question>
              {!this.app.landingPages.find(p => p.id === Number(props.match.params.id)) &&
                <Navigation {...props} showBackBtn={this.state.pageHistory.length} reset={this.reset} goBack={this.goBack}></Navigation>}
            </div>
          )} />
          <Redirect from="*" to="/welcome" />
        </Switch>
      </MuiThemeProvider>
    )
  }
}

export default App;
