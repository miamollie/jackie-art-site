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
                        <div className="is-parent column is-6" key={project.id}>
                            <article className="blog-list-item tile is-child box notification">
                                <header>
                                    {project.frontmatter.mainImage ? (
                                        <div className="featured-thumbnail">
                                            <PreviewCompatibleImage
                                                imageInfo={{
                                                    image: project.frontmatter.mainImage,
                                                    alt: `featured image thumbnail for project ${project.frontmatter.title}`,
                                                }}
                                            />
                                        </div>
                                    ) : null}
                                    <p className="project-meta">
                                        <Link
                                            className="title has-text-primary is-size-4"
                                            to={project.fields.slug}
                                        >
                                            {project.frontmatter.title}
                                        </Link>
                                    </p>
                                </header>
                                <p>
                                    {project.excerpt}
                                    <br />
                                    <br />
                                    <Link className="button" to={project.fields.slug}>
                                        Learn more →
                                    </Link>
                                </p>
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
    <StaticQuery
        query={graphql`
      query ProjectPreviewsQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "single-project-page" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
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
