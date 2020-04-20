import React from 'react'
import PropTypes from 'prop-types'
import { ProjectPageTemplate } from '../../templates/project-page'

const ProjectPagePreview = ({ entry, getAsset, widgetFor }) => {
  const data = entry.getIn(['data']).toJS()
  const galleryImages = data.gallery.map(i => {
    return { image: getAsset(i.image), alt: i.alt }
  })
  return (
    <ProjectPageTemplate
      mainImage={getAsset(data.mainImage)}
      title={data.title}
      content={widgetFor('body')}
    // gallery={galleryImages} //TODO
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
