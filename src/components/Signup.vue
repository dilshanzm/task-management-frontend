<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h1 class="mb-6 text-3xl font-extrabold text-center text-gray-800">Create an Account</h1>

      <!-- Sign-up form -->
      <form @submit.prevent="handleSignUp" class="space-y-4">
        <div>
          <label for="first_name" class="block text-lg font-medium text-gray-700">First Name</label>
          <input
            id="first_name"
            v-model="first_name"
            type="text"
            required
            class="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter First Name"
          />
        </div>

        <div>
          <label for="last_name" class="block text-lg font-medium text-gray-700">Last Name</label>
          <input
            id="last_name"
            v-model="last_name"
            type="text"
            required
            class="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Last Name"
          />
        </div>

        <div>
          <label for="username" class="block text-lg font-medium text-gray-700">Username</label>
          <input
            id="username"
            v-model="username"
            type="text"
            required
            class="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Username"
          />
        </div>

        <div>
          <label for="email" class="block text-lg font-medium text-gray-700">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Email"
          />
        </div>

        <div>
          <label for="phone_number" class="block text-lg font-medium text-gray-700">Phone Number</label>
          <input
            id="phone_number"
            v-model="phone_number"
            type="tel"
            required
            class="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Phone Number"
          />
        </div>

        <div>
          <label for="password" class="block text-lg font-medium text-gray-700">Password</label>
          <div class="relative">
            <input
              id="password"
              v-model="password"
              :type="passwordVisible ? 'text' : 'password'"
              required
              class="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Password"
            />
            <button
              type="button"
              @click="togglePasswordVisibility('password')"
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
          <label for="confirmPassword" class="block text-lg font-medium text-gray-700">Confirm Password</label>
          <div class="relative">
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              :type="confirmPasswordVisible ? 'text' : 'password'"
              required
              class="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm Password"
            />
            <button
              type="button"
              @click="togglePasswordVisibility('confirmPassword')"
              class="absolute text-gray-500 transform -translate-y-1/2 right-3 top-1/2"
            >
              <svg
                v-if="!confirmPasswordVisible"
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
                v-if="confirmPasswordVisible"
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
          >
            Sign Up
          </button>
        </div>
      </form>

      <!-- Already have an account -->
      <div class="mt-6 text-center">
        <p class="text-gray-700">Already have an account?</p>
        <router-link
          to="/auth/sign-in"
          class="text-blue-500 transition duration-300 hover:text-blue-700"
        >
          Sign In
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification';
const toast = useToast();
export default {
  data() {
    return {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      phone_number: "",
      password: "",
      confirmPassword: "",
      passwordVisible: false,
      confirmPasswordVisible: false, // Add this to track confirm password visibility
    };
  },
  methods: {
    async handleSignUp() {
      if (this.password !== this.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      const userData = {
        first_name: this.first_name,
        last_name: this.last_name,
        username: this.username,
        email: this.email,
        phone_number: this.phone_number,
        password: this.password,
      };

      try {
        await this.$store.dispatch('user/signUp', userData);
        this.$router.push('/dashboard/tasks');
      } catch (error) {
        console.error("Sign-up failed:", error);
      }
    },
    togglePasswordVisibility(field) {
      if (field === 'password') {
        this.passwordVisible = !this.passwordVisible;
      } else if (field === 'confirmPassword') {
        this.confirmPasswordVisible = !this.confirmPasswordVisible;
      }
    },
  },
};
</script>
