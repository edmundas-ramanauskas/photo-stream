import { ADD_PHOTOS, SAVE_PHOTO, DROP_PHOTO } from './types'

const emptyState = {
  photos: [],
  saved: []
}

export default (state = emptyState, action) => {
  switch (action.type) {
    case ADD_PHOTOS:
      return {
        ...state,
        photos: state.photos.concat(action.photos)
      }
    case DROP_PHOTO:
      return {
        ...state,
        saved: state.saved.filter(id => id !== action.id)
      }
    case SAVE_PHOTO:
      return {
        ...state,
        saved: state.saved.concat([action.id])
      }
    default:
      return state
  }
}
