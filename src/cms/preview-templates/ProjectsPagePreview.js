import React from 'react'
import PropTypes from 'prop-types'
import { ProjectsPageTemplate } from '../../templates/projects-page'

const ProjectsPagePreview = ({ entry, getAsset, widgetFor }) => {

  return (
    <ProjectsPageTemplate
      image={getAsset(entry.getIn(['data', 'image']))}
      title={entry.getIn(['data', 'title'])}
      content={widgetFor('body')}
    />
  )
}

ProjectsPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default ProjectsPagePreview
