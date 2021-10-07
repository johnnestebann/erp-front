export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return {
      iri: state.auth.user['@id'],
      email: state.auth.user.email
    }
  }
}
