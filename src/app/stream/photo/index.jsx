import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { isHidpiScreen } from '../../../libs/utils'

const styles = require('./styles.css')

export default class Photo extends React.Component {
  static propTypes = {
    photo: PropTypes.shape({
      id: PropTypes.number,
      images: PropTypes.shape({
        hidpi: PropTypes.string,
        normal: PropTypes.string
      }),
      title: PropTypes.string,
      user: PropTypes.shape({
        name: PropTypes.string
      })
    }),
    saved: PropTypes.bool,
    visible: PropTypes.bool,
    onSave: PropTypes.func,
    onDrop: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentWillReceiveProps(props) {
    if (props.visible && !this.state.loaded) {
      this.setState({
        loaded: true
      })
    }
  }

  onClick = (event) => {
    event.preventDefault()
    if (this.props.onSave && !this.props.saved) {
      this.props.onSave(this.props.photo.id)
    }
    if (this.props.onDrop && this.props.saved) {
      this.props.onDrop(this.props.photo.id)
    }
  }

  getPhotoUrl = () => {
    // Pixel density check
    const type = isHidpiScreen() ? 'hidpi' : 'normal'
    return this.props.photo.images[type]
  }

  render() {
    const { photo } = this.props
    const url = this.getPhotoUrl()
    // Lazy loading
    const style = this.state.loaded ?
      { backgroundImage: `url('${url}')`} : null
    const className = classnames(styles.photo, {
      [styles.saved]: this.props.saved
    })
    return (
      <span className={className} style={style}>
        <div className={styles.cover}>
          <div className={styles.title}>{photo.title}</div>
          <span className={styles.separator}></span>
          <div className={styles.author}>{photo.user.name}</div>
          <button className={styles.favorite} onClick={this.onClick}>Favorite</button>
        </div>
      </span>
    )
  }
}
