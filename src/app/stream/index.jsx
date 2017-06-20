import React from 'react'
import PropTypes from 'prop-types'
import VisibilitySensor from 'react-visibility-sensor'
import debounce from 'lodash.debounce'

import { makePhotosIterator } from '../../libs/dribbble'
import { addPhotos, dropPhoto, savePhoto } from '../../store/actions'

import Photo from './photo'
import Loader from './loader'

const styles = require('./styles.css')

const loadNextPage = makePhotosIterator(50)

export default class PhotoStream extends React.Component {
  static propTypes = {
    photos: PropTypes.arrayOf(PropTypes.object),
    saved: PropTypes.arrayOf(PropTypes.number),
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    this.loadPhotos()
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  renderPhotos = () => {
    return this.props.photos.map((photo, i) =>
      <VisibilitySensor partialVisibility={true} key={i}>
        {({isVisible}) =>
          <Photo
            photo={photo}
            saved={this.props.saved.indexOf(photo.id) > -1}
            visible={isVisible}
            onSave={this.onSave}
            onDrop={this.onDrop}
          />
        }
      </VisibilitySensor>
    )
  }

  renderLoader = () => {
    return (
      <div style={{ paddingBottom: '28px' }}>
        <Loader />
      </div>
    )
  }

  onSave = (id) => {
    this.props.dispatch(savePhoto(id))
  }

  onDrop = (id) => {
    this.props.dispatch(dropPhoto(id))
  }

  onScroll = debounce((event) => {
    const THRESHOLD = 200
    const scrollTop = event.srcElement
      ? event.srcElement.body.scrollTop // chrome
      : document.documentElement.scrollTop // firefox
    // Distance left to the bottom
    const distance = document.documentElement.offsetHeight - (window.innerHeight + scrollTop)
    if (distance <= THRESHOLD) {
      this.loadPhotos()
    }
  }, 50)

  loadPhotos = () => {
    this.setState({ loading: true })
    loadNextPage().then(data => {
      this.setState({ loading: false })
      this.props.dispatch(addPhotos(data))
    }).catch(() => {
      this.setState({ loading: false })
      // TODO: show error message to user
    })
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {this.renderPhotos()}
        </div>
        {this.state.loading && this.renderLoader()}
      </div>
    )
  }
}
