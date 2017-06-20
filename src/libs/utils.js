export function isHidpiScreen() {
  return window.devicePixelRatio && window.devicePixelRatio > 1
}

export default {
  isHidpiScreen
}
