import React from 'react'
import PropTypes from 'prop-types'
import { SingleProjectPageTemplate } from '../../templates/single-project-page'

const SingleProjectPagePreview = ({ entry, getAsset }) => {
  return (
    <SingleProjectPageTemplate
      mainImage={getAsset(entry.getIn(['data', 'mainImage']))}
      title={entry.getIn(['data', 'title'])}
      description={entry.getIn(['data', 'description'])}
      content={entry.getIn(['data', 'content'])} //post.html
      gallery={entry.getIn(['data', 'gallery'])} TODO
    />
  )
}

SingleProjectPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default SingleProjectPagePreview
