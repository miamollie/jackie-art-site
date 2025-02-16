import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import PreviewCompatibleContent from "../components/PreviewCompatibleContent";
import ProjectPreviews from "../components/ProjectPreviews";

export const ProjectsPageTemplate = ({ image, title, content, fromQuery }) => (
  <div className="content">
    <div
      className="full-width-image-container margin-top-0"
      style={{
        backgroundImage: `url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
        })`,
      }}
    >
      <h2 className="has-text-weight-bold is-size-1 title-on-image">{title}</h2>
    </div>
    <section className="section section--gradient">
      <div className="container">
        <div class="columns">
          <div class="column is-8">
            <PreviewCompatibleContent content={content} fromQuery={fromQuery} />
          </div>
          <div class="column is-4">
            <span />
          </div>
        </div>
      </div>
    </section>
    <section className="section section--gradient">
      <div className="container">
        <ProjectPreviews />
      </div>
    </section>
  </div>
);

ProjectsPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  content: PropTypes.string,
};

const ProjectsPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <ProjectsPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        content={data.markdownRemark.html}
        fromQuery
      />
    </Layout>
  );
};

ProjectsPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default ProjectsPage;

export const ProjectsPageQuery = graphql`
  query ProjectsPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        image {
          name
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
