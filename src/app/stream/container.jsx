import { connect } from 'react-redux'

import Photos from '.'

const mapStateToProps = state => {
  return {
    photos: state.app.photos,
    saved: state.app.saved
  }
}

const PhotosContainer = connect(mapStateToProps)(Photos)

export default PhotosContainer
