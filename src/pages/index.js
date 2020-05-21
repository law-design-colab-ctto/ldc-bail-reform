import React from "react"
import { Link } from "gatsby"
import { Row, Col, Jumbotron, Button, Container, Card } from "react-bootstrap"

import Layout from "../components/layout"
import Head from '../components/head';


const IndexPage = () => {
  return (
    <Layout>
      <Head title="Home" />
      <Jumbotron className="mb-5">
        <Container className="text-center">
          <img src="https://placehold.it/300x150" className="mb-5" alt=""/>
          <p className="display-3 mb-5">According to the Auditor General, 70% of people held in Ontario jails are legally innocent.</p>
          <h3 className="mb-5">Why?</h3>
          <p>
            <Button variant="primary">Learn more</Button>
          </p>
        </Container>
      </Jumbotron>

      <Container>
        <Row className="justify-content-md-center mb-4">
          <Col md="10">
            <p>If we have a bail system that is supposed to release people from jail, with the assurance that they show up for trial, and they aren’t a risk to public safety, then why does this issue exist?</p>
            <p>We’ve created some resources to try and help you answer this question:</p>
          </Col>
        </Row>

        <Row className="justify-content-md-center mb-4">
          <Col md="4">
            <Link to="/system-map">
              <Card className="bg-dark text-dark">
                <Card.Img src="https://placehold.it/600x400" alt="Card image" />
                <Card.ImgOverlay>
                  <Card.Title>The Bail System</Card.Title>
                  <Card.Text>
                    This is a wider card with supporting text below as a natural lead-in to
                    additional content. This content is a little bit longer.
                  </Card.Text>
                </Card.ImgOverlay>
              </Card>
            </Link>
          </Col>
          <Col md="4">
            <Link to="/narrative">
              <Card className="bg-dark text-dark">
                <Card.Img src="https://placehold.it/600x400" alt="Card image" />
                <Card.ImgOverlay>
                  <Card.Title>The Human Experience</Card.Title>
                  <Card.Text>
                    This is a wider card with supporting text below as a natural lead-in to
                    additional content. This content is a little bit longer.
                  </Card.Text>
                </Card.ImgOverlay>
              </Card>
            </Link>
          </Col>
        </Row>

        <Row className="justify-content-md-center mb-5 text-center">
          <Col md="6">
            <p>Check out what the experts have to say in <Link to="/methodology">the Reports</Link>.</p>
          </Col>
        </Row>

        <Row className="justify-content-md-center mb-4 text-center">
          <Col md="4">
            <h3>What We Can Do</h3>
            <p>Ways to create momentum for bail reform.</p>
          </Col>
        </Row>

        <Row className="justify-content-md-center mb-5">
          <Col>
            <Link to="">
              <img src="https://placehold.it/400x300" className="img-fluid" alt=""/>
            </Link>
          </Col>
          <Col>
            <Link to="">
              <img src="https://placehold.it/400x300" className="img-fluid" alt=""/>
            </Link>
          </Col>
          <Col>
            <Link to="">
              <img src="https://placehold.it/400x300" className="img-fluid" alt=""/>
            </Link>
          </Col>
        </Row>

      </Container>
    </Layout>
  )
}

export default IndexPage;