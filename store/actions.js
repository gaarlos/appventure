import firebaseApp from '~/firebaseapp'
import { firebaseAction } from 'vuexfire'

export default {
/**
  * @param {object} store
  * @param {object} newTournament
*/
  setLoginStatus ({commit, state}) {
    commit('setLoginStatus')
  },
  setArticleAppventure ({commit, state}, newTournament) {
    commit('setArticleAppventure', newTournament)
    if (state.configRef) {
      state.configRef.update({newTournament})
    } else {
      commit('setArticleAppventure', newTournament)
    }
  },
  /**
  * Binds firebase configuration database reference to the store's corresponding object
  * @param {object} store
  */
  bindFirebaseReferences: firebaseAction(({state, commit, dispatch}) => {
    let db = firebaseApp.database()
    let configRef = db.ref('/tournaments')

    dispatch('bindFirebaseReference', {reference: configRef, toBind: 'tournaments'}).then(() => {
      commit('setConfigRef', configRef)
    })
  }),
  /**
  * Generic binder of the firebase reference to the given key of the store's state
  * Checks if the value already exists in the database, otherwise will set it with the default store's state before binding
  * @param {object} store
  */
  bindFirebaseReference: firebaseAction(({bindFirebaseRef, state}, {reference, toBind}) => {
    return reference.once('value').then(snapshot => {
      if (!snapshot.val()) {
        reference.set(state[toBind])
      }
      bindFirebaseRef(toBind, reference)
    })
  }),
  /**
  * Undbinds firebase references
  */
  unbindFirebaseReferences: firebaseAction(({unbindFirebaseRef, commit}) => {
    commit('setConfigRef', null)
    try {
      unbindFirebaseRef('tournaments')
    } catch (error) {
      return
    }
  })
}
