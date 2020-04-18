import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { HTMLContent } from '../components/Content'
import Img from "gatsby-image"


export const AboutPageTemplate = ({ title, content, bios }) => {

  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-6 is-offset-1">
            <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
              {title}
            </h2>
            <HTMLContent className="content" content={content} />
          </div>
          <div className="column is-3 is-offset-1">
            {/* Bios should wrap on mobile */}
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
  )
}

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <AboutPageTemplate
        title={post.frontmatter.title}
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
        bios {
          name
          image {
            childImageSharp {
              fluid(maxWidth: 100, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          blurb
        }
      }
    }
  }
`
