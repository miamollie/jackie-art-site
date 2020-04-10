import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'


export const SingleProjectPageTemplate = ({
  mainImage,
  title,
  heading,
  description,
  content
}) => (
    <div className="content">
      <div
        className="full-width-image-container margin-top-0"
        style={{
          backgroundImage: `url(${
            !!mainImage.childImageSharp ? mainImage.childImageSharp.fluid.src : mainImage
            })`,
        }}
      >
        <h2
          className="has-text-weight-bold is-size-1"
          style={{
            boxShadow: '0.5rem 0 0 #1a4148, -0.5rem 0 0 #1a4148',
            backgroundColor: '#1a4148',
            color: 'white',
            padding: '1rem',
          }}
        >
          {title}
        </h2>
      </div>
      <section className="section section--gradient">
        <div className="container">
          <div className="section">
            <div className="columns">
              <div className="column is-7 is-offset-1">
                <h3 className="has-text-weight-semibold is-size-2">{heading}</h3>
                <p>{description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <HTMLContent content={content} />
    </div>
  )

SingleProjectPageTemplate.propTypes = {
  mainImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
  content: PropTypes.node.isRequired,
  // main: PropTypes.shape({
  //   heading: PropTypes.string,
  //   description: PropTypes.string,
  //   image1: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  //   image2: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  //   image3: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  // }),
  // fullImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
}

const SingleProjectPage = ({ data }) => {
  console.log(data)
  const { markdownRemark: post } = data
  const { frontmatter } = post
  return (
    <Layout>
      <SingleProjectPageTemplate
        mainImage={frontmatter.mainImage}
        title={frontmatter.title}
        heading={frontmatter.heading}
        description={frontmatter.description}
        intro={frontmatter.intro}
        content={post.html}
      // main={frontmatter.main}
      // fullImage={frontmatter.full_image}
      />
    </Layout>
  )
}

SingleProjectPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default SingleProjectPage

export const SingleProjectPageQuery = graphql`
  query SingleProjectPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        mainImage {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        description
      }
    }
  }
`
