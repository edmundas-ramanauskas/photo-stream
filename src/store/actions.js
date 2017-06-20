import { ADD_PHOTOS, SAVE_PHOTO, DROP_PHOTO } from './types'

export const addPhotos = (photos) =>
  ({
    type: ADD_PHOTOS,
    photos
  })

export const savePhoto = (id) =>
  ({
    type: SAVE_PHOTO,
    id
  })

export const dropPhoto = (id) =>
  ({
    type: DROP_PHOTO,
    id
  })
