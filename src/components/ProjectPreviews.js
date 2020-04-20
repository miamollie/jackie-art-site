import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class ProjectPreviews extends React.Component {
    render() {
        const { data } = this.props
        const { edges: projects } = data.allMarkdownRemark

        return (
            <div className="columns is-multiline">
                {projects &&
                    projects.map(({ node: project }) => (
                        <div className="is-parent column" key={project.id}>
                            <article className="project-preview-item is-child box">
                                <div className="columns">
                                    <div className="column">
                                        <header>
                                            <Link
                                                className="title has-text-primary is-size-4"
                                                to={project.fields.slug}
                                            >
                                                {project.frontmatter.title}
                                            </Link>
                                        </header>
                                        <p>{project.excerpt}</p>
                                    </div>
                                    <div className="column">
                                        {project.frontmatter.mainImage ? (
                                            <PreviewCompatibleImage
                                                imageInfo={{
                                                    image: project.frontmatter.mainImage,
                                                    alt: `featured image thumbnail for project ${project.frontmatter.title}`,
                                                }}
                                            />
                                        ) : null}
                                        <p style={{ padding: "15px 0" }}>
                                            <Link className="button" to={project.fields.slug}>
                                                Read more →
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </article>
                        </div>
                    ))}
            </div>
        )
    }
}

ProjectPreviews.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            edges: PropTypes.array,
        }),
    }),
}

export default () => (
    <StaticQuery //TODO use hook instead
        query={graphql`
      query ProjectPreviewsQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "project-page" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 150)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                mainImage {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
        render={(data) => <ProjectPreviews data={data} />}
    />
)
