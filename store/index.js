export const state = () => ({
    user: '',
    role: '',
    token: ''
  })
  
  export const mutations = {
    setStore(state, user, role, token) {
      state.user = user
      state.role = role
      state.token = token
    }
  }