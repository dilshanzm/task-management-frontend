<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="w-full max-w-md p-8 text-center bg-white rounded-lg shadow-lg">
        <h1 class="mb-4 text-4xl font-bold text-red-500">Access Denied</h1>
        <p class="mb-6 text-xl text-gray-700">You do not have permission to view this page.</p>
        <p class="mb-6 text-lg text-gray-500">If you believe this is an error, please contact support.</p>
        <router-link
          to="/"
          class="text-blue-500 underline transition duration-300 ease-in-out hover:text-blue-700"
        >
          Go back to Home
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ErrorPage",
  };
  </script>
  
  <style scoped>
  </style>
  