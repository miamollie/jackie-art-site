import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { HTMLContent } from '../components/Content'
import Img from "gatsby-image"


export const AboutPageTemplate = ({ title, content, bios, image }) => (
  <>
    <div
      className="full-width-image margin-top-0"
      style={{
        backgroundImage: `url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
          })`,
        backgroundPosition: `top left`,
        backgroundAttachment: `fixed`,
      }
      }
    >
      <div
        style={{
          display: 'flex',
          height: '150px',
          lineHeight: '1',
          justifyContent: 'space-around',
          alignItems: 'left',
          flexDirection: 'column',
        }}
      >
        <h1 className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen title-on-image">
          {title}
        </h1>
      </div>
    </div >
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-half-desktop is-half-mobile is-offset-1">
            <HTMLContent className="content" content={content} />
          </div>
          <div className="column is-one-third-desktop is-half-mobile is-offset-1">
            {/* TODO Bios should wrap on mobile */}
            {bios.map(b => (
              <article className="box has-text-centered" key={b.name} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
                <Img className="image is-rounded" fluid={b.image.childImageSharp.fluid} style={{ marginBottom: "15px" }} />
                <h3 className="title is-size-5 has-text-weight-semibold is-bold-light">{b.name}</h3>
                <p>{b.blurb}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  </>
)

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
}

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <AboutPageTemplate
        title={post.frontmatter.title}
        image={post.frontmatter.image}
        bios={post.frontmatter.bios}
        content={post.html}
      />
    </Layout>
  )
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        bios {
          name
          blurb
          image {
            childImageSharp {
              fluid(maxWidth: 100, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
