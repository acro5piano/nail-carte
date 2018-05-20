const sidebar = (state = [], action) => {
  switch (action.type) {
    case 'OPEN_SIDEBAR':
      return { isOpened: true }
    case 'CLOSE_SIDEBAR':
      return { isOpened: false }
    default:
      return state
  }
}

export default sidebar
