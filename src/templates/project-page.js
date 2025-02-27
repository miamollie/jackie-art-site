import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import PreviewCompatibleContent from "../components/PreviewCompatibleContent";
import PreviewCompatibleGallery from "../components/PreviewCompatibleGallery";
import { getSrc } from "gatsby-plugin-image";

export const ProjectPageTemplate = ({
  mainImage,
  title,
  content,
  gallery,
  fromQuery,
  videoUrl,
}) => (
  <div className="content">
    <div
      className="full-width-image-container margin-top-0"
      style={{
        backgroundImage: `url(${fromQuery ? getSrc(mainImage) : mainImage})`,
      }}
    >
      <h2 className="has-text-weight-bold is-size-1 title-on-image">{title}</h2>
    </div>
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-half-desktop is-offset-1">
            <PreviewCompatibleContent content={content} fromQuery={fromQuery} />
          </div>
          {videoUrl ? (
            <div className="column is-one-third-desktop is-offset-1">
              <div className="videoWrapper">
                <iframe
                  src={videoUrl}
                  title={"TODO - video title"}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  webkitallowfullscreen="true"
                  mozallowfullscreen="true"
                  width="560"
                  height="349"
                />
              </div>
            </div>
          ) : (
            <>
              <div className="column" />
              <div className="column" />
            </>
          )}
        </div>
      </div>
    </section>
    <section className="section section--gradient">
      <div className="container gallery">
        <h3>View images from the project</h3>
        <PreviewCompatibleGallery fromQuery={fromQuery} images={gallery} />
      </div>
    </section>
  </div>
);

ProjectPageTemplate.propTypes = {
  mainImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  content: PropTypes.node.isRequired,
  gallery: PropTypes.array,
};

const ProjectPage = ({ data }) => {
  const { markdownRemark: post } = data;

  const { mainImage, title, gallery, videoUrl } = post.frontmatter;
  return (
    <Layout>
      <ProjectPageTemplate
        mainImage={mainImage}
        title={title}
        content={post.html}
        gallery={gallery}
        videoUrl={videoUrl}
        fromQuery
      />
    </Layout>
  );
};

ProjectPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default ProjectPage;

export const ProjectPageQuery = graphql`
  query ProjectPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        videoUrl
        mainImage {
          name
          childImageSharp {
            gatsbyImageData(width: 2048, quality: 100, layout: FULL_WIDTH)
          }
        }
        gallery {
          image {
            childImageSharp {
              full: gatsbyImageData(layout: FULL_WIDTH)
              thumb: gatsbyImageData(
                width: 400
                height: 400
                quality: 100
                placeholder: BLURRED
              )
            }
          }
        }
      }
    }
  }
`;
