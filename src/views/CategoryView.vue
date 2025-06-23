<template>
<<<<<<< HEAD
  <div class="category min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 py-12 px-6 relative overflow-hidden">
    <!-- Decorative background blur -->
    <div class="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full opacity-30 blur-3xl -z-10 animate-pulse"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full opacity-20 blur-3xl -z-10 animate-ping"></div>

    <!-- Title -->
    <h1 class="text-4xl font-extrabold text-center text-blue-900 drop-shadow mb-12">
      🗂️ Book Categories
    </h1>

    <!-- Category Grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
      <div
        v-for="(category, index) in categories"
        :key="index"
        class="flex flex-col items-center justify-center bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer"
      >
        <div class="text-3xl mb-2">{{ category.icon }}</div>
        <div class="text-center text-blue-800 font-medium text-lg">{{ category.name }}</div>
      </div>
=======
  <section class="min-h-screen bg-gray-50 p-6">
    <!-- Page Title -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">🗂 Categories</h1>
      <button
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm shadow"
      >
        + Add Category
      </button>
>>>>>>> a546a68f58e9d0166bbd02019572bc7c00fb9f4f
    </div>

    <!-- Category List -->
    <div class="bg-white shadow rounded-xl border overflow-x-auto">
      <table class="min-w-full text-sm text-left">
        <thead class="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th class="px-4 py-3">#</th>
            <th class="px-4 py-3">Category Name</th>
            <th class="px-4 py-3">Description</th>
            <th class="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="(cat, index) in categories" :key="cat.id" class="hover:bg-gray-50">
            <td class="px-4 py-3">{{ index + 1 }}</td>
            <td class="px-4 py-3 font-medium text-blue-600">{{ cat.name }}</td>
            <td class="px-4 py-3 text-gray-600">{{ cat.description }}</td>
            <td class="px-4 py-3 text-right space-x-2">
              <button class="text-sm text-blue-600 hover:underline">Edit</button>
              <button class="text-sm text-red-600 hover:underline">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const categories = ref([
  { id: 1, name: 'Science Fiction', description: 'Books set in futuristic settings' },
  { id: 2, name: 'Biography', description: 'Life stories of famous people' },
  { id: 3, name: 'Children', description: 'Books suitable for kids' },
])
</script>

<style scoped>
/* Add your custom styles here if needed */
</style>
