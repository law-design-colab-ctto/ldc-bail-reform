import React, { Component } from "react"
import { Row, Col, Container } from "react-bootstrap"
import { useStaticQuery, graphql, StaticQuery } from "gatsby"
import "./issues-expl.scss"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import * as D3 from "d3"
// import svgExplImport from "../../static/assets/system-map/EE_2_reduced.svg"
import svgExplImport from "../../static/assets/system-map/EE_3.svg"
import TurnDeviceModal from "./turn-device-modal"
import ExplSidebar from "./issues-expl-sidebar"

class ExplThird extends Component {
  scroller
  layerSteps
  layer1
  layer2
  layer3
  numberOfSteps = D3.range(8)

  state = {
    issue_id: 3,
    step_index: 0,
    showMobileModal: false,
    explTextIsBelow: false,
    viewportWidth: 0,
  }

  // List of ids for arrows to animate
  nodeList = [
    "arrow-path-1",
    "arrow-path-2",
    "arrow-path-3",
    "arrow-path-4",
    "arrow-path-5",
  ]

  handleScrollStepEnter = ({ element, index, direction }) => {
    // Updating current step index
    this.setState({
      step_index: index,
    })

    // Show explanation text
    D3.select(`#ee-text-${this.state.step_index}`).style("display", "block")

    console.log(this.state.step_index)

    if (this.state.step_index === 0) {
      D3.selectAll(".text-layer-1").style("display", "none")
      D3.selectAll(".text-layer-2").style("display", "none")
      D3.selectAll(".text-layer-3").style("display", "none")
      D3.selectAll(".text-layer-4").style("display", "none")
    }

    // Animating main steps ("layers")
    if (
      this.state.step_index === 1 ||
      this.state.step_index === 2 ||
      this.state.step_index === 3 ||
      this.state.step_index === 4
    ) {
      this.layer1.style("display", "block")
      this.layer2.style("display", "none")
      this.layer3.style("display", "none")

      // Hiding text for other layers
      D3.selectAll(".text-layer-2").style("display", "none")
      D3.selectAll(".text-layer-3").style("display", "none")
      D3.selectAll(".text-layer-4").style("display", "none")

      // When scroll direction = up, display all text for this layer
      if (direction === "up") {
        D3.selectAll(".text-layer-1").style("display", "block")
      }
    } else if (this.state.step_index === 5) {
      this.layer1.style("display", "none")
      this.layer2.style("display", "block")
      this.layer3.style("display", "none")

      // Hiding text for other layers
      D3.selectAll(".text-layer-1").style("display", "none")
      D3.selectAll(".text-layer-3").style("display", "none")
      D3.selectAll(".text-layer-4").style("display", "none")

      // When scroll direction = up, display all text for this layer
      if (direction === "up") {
        D3.selectAll(".text-layer-2").style("display", "block")
      }
    } else if (this.state.step_index >= 6) {
      this.layer1.style("display", "none")
      this.layer2.style("display", "none")
      this.layer3.style("display", "block")

      // Hiding text for other layers
      D3.selectAll(".text-layer-1").style("display", "none")
      D3.selectAll(".text-layer-2").style("display", "none")
      D3.selectAll(".text-layer-4").style("display", "none")

      // When scroll direction = up, display all text for this layer
      if (direction === "up") {
        D3.selectAll(".text-layer-3").style("display", "block")
      }
    }

    // // Animating arrows

    if (this.state.step_index === 0) {
      // Reset main arrow groups as display: none
      D3.select("#arrow-1").style("display", "none")
      D3.select("#arrow-2").style("display", "none")
      D3.select("#arrow-3").style("display", "none")
      D3.select("#arrow-4").style("display", "none")
      D3.select("#arrow-5").style("display", "none")
    } else if (this.state.step_index === 1) {
    } else if (this.state.step_index === 2) {
      D3.select("#arrow-1").style("display", "block")

      // Animating arrow
      D3.select("#rect-arrow-path-1")
        .transition()
        .duration(1000)
        .attr("x", this.bbox1.x)
        .attr("y", this.bbox1.y)
    } else if (this.state.step_index === 3) {
      D3.select("#arrow-2").style("display", "block")

      // Animating arrow
      D3.select("#rect-arrow-path-2")
        .transition()
        .duration(1000)
        .attr("x", this.bbox2.x)
        .attr("y", this.bbox2.y)
    } else if (this.state.step_index === 4) {
      D3.select("#arrow-3").style("display", "block")

      // Animating arrow
      D3.select("#rect-arrow-path-3")
        .transition()
        .duration(1000)
        .attr("x", this.bbox3.x)
        .attr("y", this.bbox3.y)
    } else if (this.state.step_index === 7) {
      D3.select("#arrow-4").style("display", "block")

      // Animating arrow
      D3.select("#rect-arrow-path-4")
        .transition()
        .duration(1000)
        .attr("x", this.bbox4.x)
        .attr("y", this.bbox4.y)
    } else if (this.state.step_index === 8) {
      D3.select("#arrow-5").style("display", "block")

      // Animating arrow
      D3.select("#rect-arrow-path-5")
        .transition()
        .duration(1000)
        .attr("x", this.bbox5.x)
        .attr("y", this.bbox5.y)
    }
  }

  handleScrollStepExit = ({ element, index, direction }) => {}

  handleProgress = ({ progress }) => {}

  handleResize = () => {
    this.setState({
      showMobileModal:
        window.innerWidth < 992 && window.innerHeight < window.innerWidth,
      viewportWidth: window.innerWidth,
      explTextIsBelow:
        window.innerWidth < 992 && window.innerHeight > window.innerWidth,
    })

    this.layerSteps.style("height", window.innerHeight * 0.75 + "px")

    D3.select("#expl-sidebar-wrapper")
      .style("height", window.innerHeight * 0.8 + "px")
      .style("top", (window.innerHeight * 0.2) / 2 + "px")

    // Vertically centering the svg when it becomes sticky
    D3.select("#expl-svg-wrapper").style(
      "top",
      d => `${(window.innerHeight * 0.2) / 2}px`
    )

    this.scroller.resize()
  }

  onHide = () => false

  componentDidMount() {
    const self = this

    window.addEventListener("resize", this.handleResize)

    // Storing a selection of the layer steps element
    this.layerSteps = D3.select("#expl-step-wrapper").selectAll(
      ".expl-step-layer"
    )

    D3.xml(svgExplImport)
      .then(function (explSvg) {
        const viewBoxWidth = 1500 // svg container width
        const viewBoxHeight = 1200 // svg container height. Needs to be the same as height for svg-wrapper specified in SCSS

        // Storing a selection of the root node for the imported SVG
        let explMap = D3.select(explSvg).select("svg").node()

        // Appending the imported SVG to svg-wrapper
        D3.select("#svg").node().appendChild(explMap)

        D3.select(explMap)
          .attr("width", "100%")
          .attr("height", "100%")
          .attr("viewBox", "0 0 " + viewBoxWidth + " " + viewBoxHeight)
          .selectAll("title")
          .remove()

        ///////// BOUNDING BOXES /////////

        // Looping through nodeList to calculate bounding boxes
        // Order of operations is important, this must happen before
        // setting the layers to display: none
        self.nodeList.forEach((d, i) => {
          self[`bbox${i + 1}`] = D3.select("#" + d)
            .node()
            .getBBox()
        })
        // console.log(self.bbox4)

        ///////// LAYERS /////////

        // Creating variables for layers
        self.layer1 = D3.select("#layer-1")
        self.layer2 = D3.select("#layer-2")
        self.layer3 = D3.select("#layer-3")

        // Initially hide layers - will later be shown based on scrollama triggers
        self.layer1.style("display", "none")
        self.layer2.style("display", "none")
        self.layer3.style("display", "none")

        ///////// SCROLLAMA /////////

        // Creating the scroller
        // Inside D3.svg response, otherwise would throw error
        const scrollama = require("scrollama")
        self.scroller = scrollama()

        // Firing resize function
        self.handleResize()

        // Setting up the Scroller
        const scrollThreshold = 0.9
        self.scroller
          .setup({
            step: ".expl-step",
            offset: 0.7,
            threshold: scrollThreshold,
            progress: true,
            debug: false,
          })
          .onStepEnter(self.handleScrollStepEnter)
          .onStepExit(self.handleScrollStepExit)
          .onStepProgress(self.handleProgress)

        // setup resize event
        window.addEventListener("resize", self.scroller.resize())
      })
      .then(d => {
        ///////// CLIP PATHS /////////

        // Setting up clip paths to animate arrows
        // In a separate promise response, otherwise would throw error

        // Selecting the SVG
        let mainSvg = D3.select("#expl-svg-wrapper").select("svg")

        // Looping through nodeList to append clippaths
        this.nodeList.forEach((d, i) => {
          let clipPath = mainSvg
            .append("clipPath")
            .attr("id", `clip-${d}`)
            .append("rect")
            .attr("id", `rect-${d}`)
            .attr("width", self[`bbox${i + 1}`].width)
            .attr("height", self[`bbox${i + 1}`].height)

          // Animating arrows. Directions:
          // 1 - down
          // 2 - down
          // 3 - down
          // 4 - left
          // 5 - down

          if (i + 1 < 4 || i + 1 === 5) {
            // Down
            clipPath
              .attr("x", self[`bbox${i + 1}`].x)
              .attr("y", self[`bbox${i + 1}`].y - self[`bbox${i + 1}`].height)
          } else if (i + 1 === 4) {
            // Left
            clipPath
              .attr("x", self[`bbox${i + 1}`].x + self[`bbox${i + 1}`].width)
              .attr("y", self[`bbox${i + 1}`].y)
          }

          D3.select(`#${d}`)
            .attr("clip-path", `url(#clip-${d})`)
            .style("-webkit-clip-path", `url(#clip-${d})`)
        })
      })
  }

  componentWillUnmount() {
    this.scroller.destroy()
  }

  render() {
    return (
      <Container>
        <Row id="explanation-1__row">
          <Col sm={11} md={9} id="main-col">
            <div id="explanation-map" className="expl-step">
              <div id="expl-svg-wrapper">
              <div id="svg"></div>
                <div id="expl-sidebar-col-mobile" className="text-dark">
                  {this.state.explTextIsBelow && (
                    <ExplSidebar
                      issue_id={this.state.issue_id}
                      firstStepChange={5}
                    />
                  )}
                </div>
              </div>

              <div id="expl-step-wrapper">
                {this.numberOfSteps.map((person, index) => (
                  <div className="expl-step expl-step-layer">
                    Hello, {person + 1} from {index + 1}!
                  </div>
                ))}
              </div>
            </div>
          </Col>

          {!this.state.explTextIsBelow && (
            <Col sm={1} md={3} id="expl-sidebar-col">
              <div id="expl-sidebar-wrapper" className="text-dark">
                <ExplSidebar
                  issue_id={this.state.issue_id}
                  firstStepChange={5}
                />
              </div>
            </Col>
          )}
        </Row>
        <TurnDeviceModal
          show={this.state.showMobileModal}
          onHide={this.onHide}
          orientationBlocked="landscape"
          orientationGood="portrait"
        />
      </Container>
    )
  }
}

export default ExplThird
