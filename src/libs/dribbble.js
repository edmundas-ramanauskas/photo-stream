import axios from 'axios'

const ACCESS_TOKEN = 'fb5e4bb2a8d06a3b4aa4036fdb13bd32c369b6f5cc0296a0507691d7e2ac9251'
const DEFAULT_PAGE_SIZE = 24

function request(path, params) {
  return axios.get(`https://api.dribbble.com/v1/${path}`, {
    params: {
      ...params,
      access_token: ACCESS_TOKEN
    }
  })
}

export function fetchPhotos(size, page) {
  return request('shots', { per_page: size, page })
    //extract data from response
    .then(({ data }) => data)
}

export function makePhotosIterator(size = DEFAULT_PAGE_SIZE) {
  let page = 1
  return () => fetchPhotos(size, page).then(data => {
    page++
    return data
  })
}
