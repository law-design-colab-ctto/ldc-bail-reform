import React, { Component } from "react";
import Layout from "./layout"
import Head from './head';
import DocumentCard from './document-card';
import { Container } from 'react-bootstrap';
import * as d3 from 'd3';

import { graphql, StaticQuery } from "gatsby"
import { Row, Col } from "react-bootstrap"




class NarrativeSection extends Component {
  scroller;
  
  state = {
    data: 0,
    backgroundImages: ["assets/cell-window.jpg", "assets/convict-direction.jpg", "assets/jail-cell.jpg"],
    progress: 0,
    narrativeBgImg: "assets/cell-window.jpg"
  };

  handleScrollStepEnter = ({element, index, direction}) => {
    const data = this.state.steps[index];
    // element.style.backgroundColor = 'lightgoldenrodyellow';
    this.setState({data});


  }
  handleScrollStepExit = ({element, index, direction}) => {
    // element.style.backgroundColor = 'white';
    console.log("scroll step exit")
  }

  handleProgress = ({progress}) => {
    this.setState({progress});

    if (progress < 0.3) {
      this.setState({
        narrativeBgImg: "assets/cell-window.jpg"
      })
    } else if (progress < 0.6) {
      this.setState({
        narrativeBgImg: "assets/convict-direction.jpg"
      })
    } else {
      this.setState({
        narrativeBgImg: "assets/jail-cell.jpg"
      })
    }
  }

  componentDidMount(){
    const scrollama = require('scrollama')
    const scrollThreshold = 0.33
    this.scroller = scrollama()

    this.scroller.setup({
      container: '#narrative-scroll',
      step: '#narrative-step',
      threshold: scrollThreshold,
      progress: true,
      debug: true
    })
    .onStepEnter(this.handleScrollStepEnter)
    .onStepExit(this.handleScrollStepExit)
    .onStepProgress(this.handleProgress)

    // setup resize event
    window.addEventListener("resize", this.scroller.resize);
  }

  componentWillUnmount(){
    this.scroller.destroy();
  }

  render () {
  const { data, steps, progress, images, narrativeBgImg } = this.state;

  const narrativePgStyle = {
    paddingTop: "100vh",
    paddingLeft: "10vw",
    paddingRight: "10vw",
    fontSize: "30px",
    color: "white",
    height: "200vh"
  }

  return (
    <div id="narrative-scroll">
      <div id="narrative-step" style={{
        height:"600vh", 
        backgroundAttachment:"fixed", 
        backgroundSize: "cover",
        backgroundImage: `url(`+ narrativeBgImg  +`)`
        }}>
        <div style={narrativePgStyle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec risus urna, tincidunt vitae lacus ut, aliquet pellentesque justo. Duis vel ante tincidunt, tincidunt ipsum et, placerat dui. Fusce at sem at ipsum faucibus auctor. Nam sapien nisi, auctor imperdiet suscipit sit amet, dignissim at libero. In in lorem facilisis, egestas enim a, vestibulum lorem. Aenean facilisis leo id justo pharetra volutpat. Vivamus consequat iaculis ultricies. Suspendisse eu tincidunt odio, vitae aliquam velit. Integer tristique metus mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rutrum molestie metus vel sodales. Cras a massa non justo bibendum egestas a nec lectus. Fusce faucibus sapien vel nulla dapibus ornare. Nulla fringilla felis non venenatis feugiat. Nam ultricies ornare sapien eu luctus.
        </div>

        <div style={narrativePgStyle}>
          Aenean interdum laoreet massa, a scelerisque metus vestibulum eget. Fusce libero eros, egestas ac gravida at, tincidunt non libero. Sed tempus ullamcorper augue. Nullam accumsan odio risus, ut maximus mi gravida consequat. In blandit nibh vel dui ultricies maximus. Vivamus fermentum et lacus at aliquet. Nullam et neque faucibus, pellentesque erat sed, vulputate nisi. Mauris velit justo, aliquet eget laoreet imperdiet, cursus quis enim. Etiam viverra nunc dapibus felis elementum placerat. In et sollicitudin odio, sagittis tincidunt tortor. In eget quam bibendum, pretium tellus ac, ultricies elit. Integer rutrum, massa ac iaculis facilisis, ante risus auctor elit, nec tempor arcu sem id magna. Sed venenatis augue mauris, fringilla laoreet sapien maximus rutrum. Sed pretium, mauris eget egestas porta, lorem urna accumsan nisi, vitae facilisis tortor odio sit amet tellus. Vivamus varius fermentum libero. Cras nibh lectus, consectetur sit amet luctus ut, fringilla ornare quam.
        </div>

        <div style={narrativePgStyle}>
          Nullam vehicula libero vel augue fermentum, ut ultrices felis mollis. Duis a arcu lacus. Donec a urna non metus posuere luctus eget et risus. Praesent diam turpis, finibus eu dolor eu, cursus scelerisque est. Morbi fringilla feugiat urna malesuada ultrices. Cras vitae placerat erat, non finibus diam. Curabitur vitae mi ex. Donec in convallis mauris.
        </div>
      </div>
    </div>
  )
}
}

export default NarrativeSection