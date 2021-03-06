import React from "react"
import { Row, Col } from "react-bootstrap"
import { useStaticQuery, graphql } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import Layout from "../components/layout"
import Head from '../components/head'
import IssuesHero from "../components/issues-hero"
import MomentumTabs from "../components/issues-momentum"
import ExplFirst from "../components/issues-expl-first"
import BottomButtons from "../components/bottom-buttons"

const Theme1Page = () => {
  const data = useStaticQuery(graphql `
    query {
      documents: allAirtable(
        filter: {
          data: { Momentum_Theme: { 
            in: "Theme 1 [Publish]"}
          }
        }
        sort: { fields: data___Momentum_Tab, order: ASC}
      ) {
        nodes {
          data {
            Momentum_Theme
            Momentum_Tab
            Title
            Author_s_
            URL
            Publish__or_Start_Date_
            Momentum_Annotation
            Image {
              url
            }
          }
        }
  	  }
      issueContent: allContentfulIssues (filter: {
        issueName: {eq: "Worsening the Lives of Marginalized People"}
      })
      {
        nodes {
          issueName
          issueImage {
            fluid (maxWidth: 400) {
              ...GatsbyContentfulFluid
            }
          }
          issueBlurb
          heroMomentum { heroMomentum }
          heroOpportunity { heroOpportunity }
          heroEE { heroEE }
          momentumBlurb { json }
          opportunityBlurb { json }
          sources {
            title
            fact { json }
          }
        }
      }
    }
  `)

  const issueContents = data.issueContent.nodes[0];

  // This splits our list of sources in half so we can list them in two columns
  const allSources = issueContents.sources
  const sourcesLeft = allSources.slice(0, Math.ceil(allSources.length / 2))
  const sourcesRight = allSources.slice(Math.ceil(allSources.length / 2), allSources.length)

  return (
    <Layout>
      <Head title={"Theme: " + issueContents.issueName}/>
      <IssuesHero 
        issueName={ issueContents.issueName }
        issueImg={ issueContents.issueImage.fluid }
        issueBlurb={ issueContents.issueBlurb }
        heroMomentum={ issueContents.heroMomentum.heroMomentum }
        heroOpportunity={ issueContents.heroOpportunity.heroOpportunity }
        heroEE={ issueContents.heroEE.heroEE }
      />

      <Row id="momentum" className="justify-content-center mx-0 pt-5 bg-light">
        <Col className="mb-2" xs="11" lg="10" xl="7">
          <h2 className="text-center uppercase">Momentum</h2>
          {documentToReactComponents(
            issueContents.momentumBlurb.json
          )}
        </Col>
      </Row>

      <Row className="justify-content-center mx-0 pb-5 bg-light">
        <Col>
          <MomentumTabs documents={ data.documents.nodes } />
        </Col>
      </Row>

      <Row id="opportunity" className="justify-content-center mx-0 pt-5 pb-5 pl-4 pr-4 bg-rust">
        <Col className="mb-2 pt-4 pb-4 crooked-box"  xs="11" lg="10" xl="7">
          <h2 className="text-center uppercase text-pink">Opportunity</h2>
          {documentToReactComponents(
            issueContents.opportunityBlurb.json
          )}
        </Col>
      </Row>

      <Row id="explanation" className="justify-content-center mx-0">
        <Col className="mt-5 mb-5" md="10">
          <h2 className="text-center uppercase text-rust">Explorable Explanation</h2>
          <ExplFirst></ExplFirst>
        </Col>
      </Row>

      <Row id="sources" className="mt-5 mx-0 py-5 bg-pink justify-content-center">
        <Col md="10" lg="8" className="p-2">
          <h2 className="text-white text-center uppercase">Sources</h2>
          <Row className="mt-4 pt-5 pb-3 crooked-box">
            <Col md="12" lg="6">
              <ul>
                {sourcesLeft.map(item => (
                  <li>
                    {documentToReactComponents(
                      item.fact.json
                    )}
                  </li>
                ))}
              </ul>
            </Col>

            <Col md="12" lg="6">
              <ul>
                {sourcesRight.map(item => (
                  <li>
                    {documentToReactComponents(
                      item.fact.json
                    )}
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
        </Col>
      </Row>

      <BottomButtons
          btn1={"Bail Denies Dignity"}
          btn1Url={"/theme2"}
          btn2={"Bail's Culture of Fear"}
          btn2Url={"/theme3"}
          ctaColor={"text-dark"}
        />
    </Layout>
  )
}

export default Theme1Page