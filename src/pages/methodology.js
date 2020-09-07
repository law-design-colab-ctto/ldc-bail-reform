import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/layout"
import Head from '../components/head';
import DocumentCard from '../components/document-card';

import { graphql } from "gatsby"
import { Container, Row, Col, Form } from "react-bootstrap"
import NoMobile from "../components/NoMobile";

const MethodologyPage = ({data}) => {

  //slugify, move to helper
  function slugify (str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
  
    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to   = "aaaaeeeeiiiioooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
  }

  const dataByYear = data.documents.nodes.reduce(function (r, a) {
    
    const year = a.data.Publish__or_Start_Date_.split('-')[0];
    r[ year ] = r[ year ] || [];
    r[ year ].push(a);
    return r;
    }, Object.create(null)
  );

  const categories = data.documents.nodes.reduce(function (r, a) {
    const category = a.data.Type_of_Content;

    let cat;

    if (category === null) {
      cat = 'None'
    } else {
      cat = category[0];
    }

    
    r[ cat ] = r[ cat ] || [];
    r[ cat ].push(a);
    return r;
    }, Object.create(null)
  );
  
  console.log(categories);

  // scroller
  const timeline = useRef(null);

  const [state, setState] = useState({
    data: 0,
    steps: [10, 20, 30],
    progress: 0
  });

  const [documents, setDocuments] = useState({})
  const [filter, setFilter] = useState({})

  useEffect(() => {

    Object.keys(categories).forEach((category, index) => {
      const id = slugify(category);
      setFilter( prevState => {
        return {
          ...prevState,
          [id] : false
        }
      })
    })
    
    Object.entries(dataByYear).forEach((yearData) => {
      const year = yearData[0];

      dataByYear[year].forEach( (doc, index ) => {
        const newKey = `${year}-card-${index}`;
        
        setDocuments(prevState => {
          return {
            ...prevState,
            [newKey]: index > 0 ? false : true
          }
        });
      });
    })
    
  }, []); 

  //Handle Scrollama
  const handleScrollStepEnter = ({element, index, direction}) => {
    const data = state.steps[index];
    element.classList.add('active');
    setState({data});
  }

  const handleScrollStepExit = ({element, index, direction}) => {
    element.classList.remove('active');
  }

  const handleProgress = ({progress}) => {
    setState({progress});
  }

  useEffect(()=> {
    if (typeof window === 'undefined') return;

    const scrollama = require('scrollama')
    const scrollThreshold = 0.5;
    const scrollOffset = 0.5;
    const scroller = scrollama()

    scroller.setup({
      step: '.timeline-year',
      threshold: scrollThreshold,
      progress: true,
      offset: scrollOffset,
      // debug: true
    })
    .onStepEnter(handleScrollStepEnter)
    .onStepExit(handleScrollStepExit)
    .onStepProgress(handleProgress)

    // setup resize event
    window.addEventListener("resize", scroller.resize);
    return () => {
      scroller.destroy();
      window.removeEventListener('resize', scroller.resize)
    };
  }, [])

  const indicatorClickHandler = (e) => {
    const id = e.target.dataset.id;
    updateActiveDocumentCard(id);
  }

  const updateActiveDocumentCard = (id) => {
    const year = id.split('-')[0];
    const newDocuments = { ...documents}

    Object.keys(newDocuments).forEach(v => {
      if ( v.includes(year) ) {
        newDocuments[v] = false
      }
    });

    newDocuments[id] = true;
    setDocuments({...newDocuments});
  }

  const updateActiveCategories = (id) => {

    setFilter(prevState => {
      return {
        ...prevState,
        [id] : !filter[id]
      }
    });

  }

  useEffect(()=> {
    const indicators = timeline.current.querySelectorAll('.timeline-card-indicator');
    let filterActive = false;

    Object.keys(filter).forEach( (key, index) => {
      if ( filter[key] ) {
        filterActive = true;
      }
    })

    if ( filterActive ) {
      for (const indicator of indicators) {
        indicator.classList.add('disabled');
      }
      Object.keys(filter).forEach( (key, index) => {
        for (const indicator of indicators) {
          if ( filter[key] && indicator.dataset.cat === key) {
            indicator.classList.remove('disabled');
          }
        }
      })
      
    }  else {
      for (const indicator of indicators) {
        indicator.classList.remove('disabled');
      }
    }

  }, [filter])

  return (
    <Layout>
      <Head title="Methodology"/>

      <NoMobile>
      <Container className="my-5 pt-5">
        <Row className="justify-content-center text-center">
          <Col md="8">
            <h1 className="text-rust">LOREM IPSUM DOLOR SIT AMET</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem commodo at rhoncus, vitae. Consequat, condimentum convallis nisl hac. Et a, sed suscipit egestas fringilla. Eu non tristique facilisi fringilla facilisi arcu urna sociis nibh. Volutpat gravida tincidunt ut venenatis egestas in tellus. Ridiculus commodo vel arcu, facilisis velit, mattis fermentum pellentesque.</p>
          </Col>
        </Row>

        <Row className="">
          <Col md="3" className="">
            
            <div className="legend">
              <p className="text-uppercase mb-2">Legend</p>
              <ul className="list-unstyled">
              { Object.keys(categories).map((category, index) => {
                const bg = "blue";
                // console.log(bg);
                return (
                  <li key={`category-${index}`}>

                  <div className="form-check">
                    <Form.Check
                      custom 
                      onClick={ () => updateActiveCategories( slugify(category) )}
                      className="form-check-input" 
                      type="checkbox" 
                      value="" 
                      id={`defaultCheck-${index}`}
                      label={ category }
                    />
                    
                  </div>
                  </li>
                )
              }
              )}
              </ul>

              <p className="text-uppercase mb-2">Timeline</p>
              <ul className="list-unstyled">
              { Object.keys(dataByYear).map(key => (
                <li key={`legend-${key}`}>
                  <a href={`#year-${key}`}>{ key }</a>
                </li>
              ))}
              </ul>
            </div>

          </Col>
          <Col md="9" className="h-100 p-md-4 p-xl-5">
            
            <div ref={timeline} className="timeline-wrapper mr-1 mr-md-5">
            { Object.entries(dataByYear).map(yearData => {
              const year = yearData[0];
              let margin = 0;
              const indicators = {};
              const sortedDocs = [ ...dataByYear[year] ];
              sortedDocs.sort((a,b) => (a.data.Publish__or_Start_Date_ > b.data.Publish__or_Start_Date_) ? 1 : ((b.data.Publish__or_Start_Date_ > a.data.Publish__or_Start_Date_) ? -1 : 0));
              
              return (
                
              <div key={year} className="timeline-year mb-5" data-index={year}>
                <div className="anchor" id={`year-${ year }`}></div>

                <div className="timeline-year-content position-relative">
                  <div className="timeline-year-content-header d-md-flex pb-2 mb-5">
                    <h1 className="pr-3 timeline-year-label"><strong>{year}</strong></h1>
                 
                    <div className="timeline-year-header-meta mt-3 pr-2 pr-md-5 pb-3">
                      {/* <p className="mb-0"><strong>{item.node.headline}</strong></p> */}
                      {/* <p className="mb-0">{item.node.description.description}</p> */}
                    </div>

                    <div className="timeline-year-indicators">          
                      { sortedDocs.map((doc, index) => {
                        
                        const month = parseFloat(doc.data.Publish__or_Start_Date_.split('-')[1]) - 1;

                        //set indicator counts
                        indicators[doc.data.Publish__or_Start_Date_] = indicators[doc.data.Publish__or_Start_Date_] || [];
                        indicators[doc.data.Publish__or_Start_Date_].push([doc.data.Publish__or_Start_Date_]);
                        
                        margin = indicators[doc.data.Publish__or_Start_Date_].length * 25;
                        console.log(margin);
                      

                        const offsetTop = (indicators[doc.data.Publish__or_Start_Date_].length - 1) * 25;
                        const offsetLeft = (month / 12) * 100;
                        const bg = doc.category ? doc.category.hexCode : '#888';

                        return (
                          <div 
                            key={index} 
                            className="timeline-card-indicator" 
                            data-id={`${year}-card-${index}`} 
                            data-cat={doc.data.Type_of_Content ?  slugify(doc.data.Type_of_Content[0]) : ''}
                            role="button" 
                            style={{ left: offsetLeft + '%', top: offsetTop + 'px', backgroundColor: bg}}
                            onClick={ indicatorClickHandler }
                          >
                            {year}-document-{index}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  {/* <div className="timeline-year-events">
                  { item.node.events.map((event, index) => {

                    const month = parseFloat(event.eventDate.split('-')[1]) - 1;
                    const offsetTop = (month / 12) * 100;

                    return (
                      <div key={index} className="timeline-event" style={{top: offsetTop + "%"}}>
                        <h6 className="timeline-event-title text-rust mb-0">{event.eventDate}</h6>
                        <p>{event.eventTitle}</p>
                      </div>
                    )
                  })}
                  </div> */}
                  <div className="timeline-year-docs mr-3 mr-md-5">
                    { sortedDocs.map((doc, index) => {
                      const bg = doc.category ? doc.category.hexCode : '#888';
                      let id = `${year}-card-${index}`;
                      // console.log(documents[id]);

                      return(
                        <DocumentCard 
                          key={index} 
                          bg={bg}
                          index={index} 
                          doc={doc} 
                          item={ dataByYear[year] } 
                          active={documents[id]}
                        />
                      )
                    })}
                  </div>
                </div>
              </div>
              
            )})
          }
            </div>  
          
          </Col>
        </Row>
      </Container>
      </NoMobile>
    </Layout>
  )
}

//@TODO figure out view
export default MethodologyPage

export const query = graphql`
query {
  allContentfulTimelineCategory {
    edges {
      node {
        id
        title
        hexCode
      }
    }
  }
  allContentfulTimelineYear {
    edges {
      node {
        year
        headline
        description {
          description
        }
        events {
          eventTitle
          eventDate
        }
        documents {
          title
          date
          author
          quote
          url
          category {
            id
            title
            hexCode
          }
        }

      }
    }
  }

  documents: allAirtable (
    filter: {
      data: {
        Include_in_Interactive_Bibliography:{ eq: "Yes"}
      }
    }
  ) {
    nodes {
      data {
        Title
        Author_s_
        Publish__or_Start_Date_
        Biblio_Annotation
        Type_of_Content
        Include_in_Interactive_Bibliography
        Tag
        URL
      }
      recordId
    }
  }
}

`