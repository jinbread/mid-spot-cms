import React from 'react'
import PropTypes from 'prop-types'
import { ExhibitionPostTemplate } from '../../templates/exhibition-post'

const ExhibitionPostPreview = ({ entry, widgetFor }) => (
  <ExhibitionPostTemplate
    content={widgetFor('body')}
    description={entry.getIn(['data', 'description'])}
    tags={entry.getIn(['data', 'tags'])}
    title={entry.getIn(['data', 'title'])}
  />
)

ExhibitionPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default ExhibitionPostPreview
