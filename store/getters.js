export default {
  /**
   * Tournament Getters
   */
  getTournaments: state => {
    delete state.tournaments['.key']
    return state.tournaments
  },
  getArrayTournaments: state => {
    const xs = []
    delete state.tournaments['.key']
    for (var i in state.tournaments) {
      xs.push(state.tournaments[i])
      xs[xs.length - 1]['key'] = i
    }
    return xs
  },
  getFilteredTournaments: state => state.tFiltered,
  /**
   * User Getters
   */
  getUser: state => state.user,
  getUserData: state => state.userData,
  getDarkTheme: state => state.userData ? state.userData.darkTheme : false,
  getDisplayName: state => state.userData ? state.userData.displayName : null,
  getUserPhoto: state => state.user ? state.user.photoURL : null,
  getUserTournaments: state => state.userData ? Object.keys(state.userData.participating) : null,
  /**
   * Aux data Getters
   */
  isAuthenticated: state => state.user && !state.user.isAnonymous,
  authError: state => state.authError,
  getProgress: state => state.uploadProgress
}
