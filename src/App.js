import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './css/reveal.css';
import Reveal from 'reveal.js'
import Slideshow from './slideshow/slideshow.js'

class App extends Component {

  componentDidMount() {
    Reveal.initialize({})

    function click (e) {
      if (!e)
        e = window.event;
      if ((e.type && e.type == "contextmenu") || (e.button && e.button == 2) || (e.which && e.which == 3)) {
        if (window.opera)
          window.alert("");
        return false;
      }
    }
    if (document.layers)
      document.captureEvents(Event.MOUSEDOWN);
      document.onmousedown = click;
      document.oncontextmenu = click;
      }

  render() {


    return (

      <Slideshow />
    );
  }
}

export default App;
