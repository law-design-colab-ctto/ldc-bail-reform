/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `Bail Reform`,
    author: 'Law & Design CoLab',
  
    methodology : [
    {
      year: "2011",
      headline : "Lorem Ipsum",
      copy : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris scelerisque orci nec tellus elementum fermentum. Nulla vestibulum libero est, sodales condimentum enim lacinia in. Duis neque ipsum, commodo sit amet leo et, dignissim volutpat sem.",
      docs : [
        {
          date: "some-date",
          tags: [ "mental health", "some tag"],
          author: "Nicole Myers",
          title: "Creating Criminality: The Intensification of Institutional Risk Aversion Strategies and the Decline of the Bail Process",
          quote: "Direct quote from the document goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
          date: "another-date",
          tags: [ "mental health", "another tag"],
          author: "another author",
          title: "another title",
          quote: "another quote"
        }
      ]
    },
    {
      year: "2012",
      headline : "Lorem Ipsum",
      copy : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris scelerisque orci nec tellus elementum fermentum. Nulla vestibulum libero est, sodales condimentum enim lacinia in. Duis neque ipsum, commodo sit amet leo et, dignissim volutpat sem.",
      docs : [
        {
          date: "some-date",
          tags: [ "mental health", "some tag"],
          author: "some author",
          title: "some title",
          quote: "some quote"
        },
        {
          date: "another-date",
          tags: [ "mental health", "another tag"],
          author: "another author",
          title: "another title",
          quote: "another quote"
        },
        {
          date: "another-date",
          tags: [ "mental health", "another tag"],
          author: "another author",
          title: "another title",
          quote: "another quote"
        }
      ]
    },
    {
      year: "2013",
      headline : "Lorem Ipsum",
      copy : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris scelerisque orci nec tellus elementum fermentum. Nulla vestibulum libero est, sodales condimentum enim lacinia in. Duis neque ipsum, commodo sit amet leo et, dignissim volutpat sem.",
      docs : [
        {
          date: "some-date",
          tags: [ "mental health", "some tag"],
          author: "some author",
          title: "some title",
          quote: "some quote"
        },
        {
          date: "another-date",
          tags: [ "mental health", "another tag"],
          author: "another author",
          title: "another title",
          quote: "another quote"
        },
        {
          date: "another-date",
          tags: [ "mental health", "another tag"],
          author: "another author",
          title: "another title",
          quote: "another quote"
        }
      ]
    }
  ],
},
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      }
    },
    {
      resolve: 'gatsby-source-airtable',
      options: {
        apiKey: 'keyl3VyMD42AADPXx',
        tables: [
          {
            baseId: 'appToqMlXxkmbbwTr',
            tableName: 'Interactive Bibliography'
          },
          {
            baseId: 'appToqMlXxkmbbwTr',
            tableName: 'Colours'
          }
        ]
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`
      }
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          exclude: /system-map/
        }
      }
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-relative-images',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 750,
              linkImagesToOriginal: false
            }
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-180594039-1",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: true
      },
    }
  ]
}
