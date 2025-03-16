import api from '../../utils/axios';
import { useToast } from 'vue-toastification';
const toast = useToast();
export default {
  namespaced: true,
  state: () => ({
    user: {
      first_name: localStorage.getItem('first_name') || null,
      email: localStorage.getItem('email') || null,
    },
    token: localStorage.getItem('token') || null,
  }),
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
    currentUser(state) {
      return state.user;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = {
        first_name: user.first_name,
        email: user.email,
      };
      localStorage.setItem('first_name', user.first_name);
      localStorage.setItem('email', user.email);
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    clearUser(state) {
      state.user = null;
      state.token = null;
      localStorage.clear();
    },
  },
  actions: {
   
    async signIn({ commit }, credentials) {
      try {
        const response = await api.post('/auth/sign-in', credentials);
        
        // Save token to localStorage
        const token = response.data.user_attributes.token;
        localStorage.setItem('token', token);
        
        commit('setUser', { 
          first_name: response.data.user_attributes.first_name, 
          email: response.data.user_attributes.email 
        });
        commit('setToken', token);
        
        toast.success('Signed in successfully!');
  
    
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.status);
        throw error;
      }
    },
    

    async signUp({ commit }, userData) {
      try {
        const response = await api.post('/auth/sign-up', userData);
        commit('setUser', { 
          first_name: response.data.user_attributes.first_name, 
          email: response.data.user_attributes.email 
        });
        commit('setToken', response.data.user_attributes.token);
        toast.success('Sign-up successful!');
        return response.data;
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.error);
        throw error;
      }
    },

    signOut({ commit }) {
      commit('clearUser');
      toast.success('Signed out successfully!');
    },
  },
};
