<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h1 class="mb-6 text-3xl font-extrabold text-center text-gray-800">Sign In</h1>
      
      <!-- Sign-in form -->
      <form @submit.prevent="handleSignIn" class="space-y-4">
        <div>
          <label for="email" class="block text-lg font-medium text-gray-700">Email</label>
          <input
            id="email"
            v-model="credentials.username"
            type="text"
            required
            class="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Email/Phone Number or Username"
          />
        </div>

        <div>
          <label for="password" class="block text-lg font-medium text-gray-700">Password</label>
          <div class="relative">
            <input
              id="password"
              v-model="credentials.password"
              :type="passwordVisible ? 'text' : 'password'"
              required
              class="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Password"
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute text-gray-500 transform -translate-y-1/2 right-3 top-1/2"
            >
              <svg
                v-if="!passwordVisible"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.978 5 12 5s8.268 2.943 9.542 7c-.532 1.126-1.25 2.12-2.17 3.07"
                />
              </svg>
              <svg
                v-if="passwordVisible"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 3c4.28 0 8 3.72 8 8 0 4.28-3.72 8-8 8-4.28 0-8-3.72-8-8 0-4.28 3.72-8 8-8z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="w-full px-6 py-3 text-white transition duration-300 ease-in-out bg-blue-500 rounded-lg hover:bg-blue-700"
            :disabled="loading"
          >
            {{ loading ? 'Signing In...' : 'Sign In' }}
          </button>
        </div>
      </form>

      <!-- Create Account Button -->
      <div class="mt-6 text-center">
        <p class="text-gray-700">Don't have an account?</p>
        <router-link to="/auth/sign-up" class="text-blue-500 transition duration-300 hover:text-blue-700">
          Create Account
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      credentials: {
        username: '',
        password: '',
      },
      loading: false,
      passwordVisible: false,  // Add this property to manage password visibility
    };
  },
  methods: {
    ...mapActions('user', ['signIn']),
    async handleSignIn() {
      this.loading = true;
      try {
        await this.signIn(this.credentials);
        this.$router.push('/dashboard/tasks');
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible; // Toggle password visibility
    },
  },
};
</script>
