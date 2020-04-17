import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { HTMLContent } from '../components/Content'

import Gallery from '@browniebroke/gatsby-image-gallery'
import '@browniebroke/gatsby-image-gallery/dist/style.css'

export const SingleProjectPageTemplate = ({
  mainImage,
  title,
  content,
  gallery,
}) => {
  const images = gallery.map(i => (i.image.full.fluid.src));
  const thumbs = gallery.map(i => (i.image.thumb.fluid));
  return (
    <div class="content">
      <div
        className="full-width-image-container margin-top-0"
        style={{
          backgroundImage: `url(${
            !!mainImage.childImageSharp ? mainImage.childImageSharp.fluid.src : mainImage
            })`,
        }}
      >
        <h2 className="has-text-weight-bold is-size-1 title-on-image">{title}</h2>
      </div>
      <section className="section section--gradient">
        <div className="container">
          <div class="columns">
            <div class="column is-9">
              <HTMLContent content={content} />
            </div>
            <div class="column" />
            <div class="column" />

          </div>
        </div>
      </section>
      <section className="section section--gradient">
        <div className="container">
          <h3>View images from the project</h3>
          <Gallery images={images} thumbs={thumbs} />
        </div>
      </section>
    </div>
  )
}

SingleProjectPageTemplate.propTypes = {
  mainImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  content: PropTypes.node.isRequired,
  gallery: PropTypes.array,
}

const SingleProjectPage = ({ data }) => {
  const { markdownRemark: post } = data
  const { mainImage, title, gallery } = post.frontmatter
  return (
    <Layout>
      <SingleProjectPageTemplate
        mainImage={mainImage}
        title={title}
        content={post.html}
        gallery={gallery}
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
        gallery {          
          image {
            full: childImageSharp {
                fluid(
                  maxWidth: 1024
                  quality: 85
                  srcSetBreakpoints: [576, 768, 992, 1200]
                ) {
                  ...GatsbyImageSharpFluid
                }
              }
            thumb: childImageSharp {
              fluid(maxWidth: 100, maxHeight: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
