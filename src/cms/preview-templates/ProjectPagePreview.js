import React from 'react'
import PropTypes from 'prop-types'
import { ProjectPageTemplate } from '../../templates/project-page'

const ProjectPagePreview = ({ entry, getAsset, widgetFor }) => {
  const data = entry.getIn(['data']).toJS()
  const galleryImages = data.gallery.map(i => i.image)

  return (
    <ProjectPageTemplate
      mainImage={getAsset(data.mainImage)}
      title={data.title}
      videoUrl={data.videoUrl}
      content={widgetFor('body')}
      gallery={galleryImages}
    />
  )
}

ProjectPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default ProjectPagePreview
