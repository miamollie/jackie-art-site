import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { HTMLContent } from '../components/Content'
import Img from "gatsby-image"

// import Gallery from '@browniebroke/gatsby-image-gallery'
// import '@browniebroke/gatsby-image-gallery/dist/style.css'

export const SingleProjectPageTemplate = ({
  mainImage,
  title,
  heading,
  description,
  content,
  gallery,
}) => {
  console.log(gallery)
  // todo
  const images = gallery.map((i) => {
    console.log(i.image.childImageSharp.fluid.src)
    return i.image.childImageSharp.fluid.src
  })
  // const thumbs = gallery.map((i) => i.node.thumb.fluid)
  return (
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
      <section className="section section--gradient">
        <div className="container">
          <div className="section">
            <HTMLContent content={content} />
          </div>
        </div>
      </section>
      <section className="section section--gradient">
        <div className="container">
          {console.log(images)}
          {images.map((img, i) => <img src={img} key={i} />)}
          {/* <Gallery images={images} thumbs={images} /> */}
        </div>
      </section>
    </div>
  )
}

SingleProjectPageTemplate.propTypes = {
  mainImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
  content: PropTypes.node.isRequired,
  gallery: PropTypes.array,
}

const SingleProjectPage = ({ data }) => {
  const { markdownRemark: post } = data
  const { mainImage, title, heading, description, gallery } = post.frontmatter
  return (
    <Layout>
      <SingleProjectPageTemplate
        mainImage={mainImage}
        title={title}
        heading={heading}
        description={description}
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
        heading
        description
        gallery {
          image {
             childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
