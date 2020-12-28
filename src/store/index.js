import Vue from 'vue'
import Vuex from 'vuex'

// import {auth} from '@/firebase';
// import router from '@/router';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    enteredApp: false,
    myUser: {},
    loggedUser: false,
  },
  mutations: {
    setEnteredApp(state, payload) {
      state.enteredApp = payload;
    },
    setLoggedUser(state, payload) {
      state.loggedUser = payload;
    },
    setNewUser(state, payload){
      state.myUser = payload;
    },
    userState(state, payload){
      state.loggedUser = payload
    }
  },
  actions: {
    goApp({commit}) {
      commit("setEnteredApp", true)
    },
    setUser({commit}, user){
      const myuser = {
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        photo: user.photoURL,
      }
      commit('setNewUser', myuser)
      commit('userState', true)
      console.log(myuser)

    },
    signOut({commit}) {
      auth.signOut()
      commit('setNewUser', null)
      commit('userState', false)
      router.push("/main")
    }
  },
  modules: {
  }
})
