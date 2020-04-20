import React from 'react'
import PropTypes from 'prop-types'

export const PreviewCompatibleContent = ({ content, className, fromQuery = false }) => {
  return fromQuery ? <div className={className} dangerouslySetInnerHTML={{ __html: content }} /> : <div className={className}>{content}</div>
}

PreviewCompatibleContent.propTypes = {
  content: PropTypes.node,
  className: PropTypes.string,
  fromQuery: PropTypes.bool,
}

export default PreviewCompatibleContent
