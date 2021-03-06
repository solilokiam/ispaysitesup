import React, { Component } from 'react';
import axios from 'axios';
import Giphy from './components/giphyComponent';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      upPaysites: false,
      upTubes: false,
    };
  }

  componentDidMount() {
    axios.get('https://ispaysitesupapi-quuvsofefc.now.sh')
      .then((response) => {
        const json = response.data;
        this.setState({
          loading: false,
          upPaysites: json.paysites === 'ok',
          upTubes: json.tubes === 'ok',
        })
      })
      .catch((error) => (
        this.setState({
          loading: false,
          up: false,
        })
      ));
  }

  renderResult() {
    const { loading, upPaysites, upTubes } = this.state;

    if(loading) {
      return (<p>Loading</p>);
    }

    if(upPaysites) {
      return (
        <div className="answer">
          <h2>YESSS!!!!</h2>
          <Giphy tag="congratulations" />
          <p>All systems seem to be working!!!!!</p>
        </div>
      );
    } else {
      if(upTubes) {
        return (
          <div className="answer">
            <h2>Nope</h2>
            <Giphy tag="ohh-burn" />
            <p>But the under-resourced tubes project is still doing fine.</p>
          </div>
        );
      } else {
        return (
          <div className="answer">
            <h2>Nope</h2>
            <Giphy tag="emergency" />
            <p>But neither does tubes so it must be an Amazon problem. Because tubes never fails</p>
          </div>);
      }
    }
  }

  render() {
    return (
      <div className="container">
      <div className="text">
        <h1 className="title">Is Paysites Up?</h1>
        { this.renderResult() }
      </div>
      </div>
    );
  }
}

export default App;
