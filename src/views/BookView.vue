<template>
<<<<<<< HEAD
  <div class="home min-h-screen bg-gradient-to-br from-blue-200 via-purple-100 to-pink-200 p-6 relative overflow-hidden">
    <!-- Decorative blurred circles -->
    <div class="absolute top-0 left-0 w-72 h-72 bg-purple-400 rounded-full opacity-30 blur-3xl -z-10 animate-pulse"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full opacity-20 blur-3xl -z-10 animate-ping"></div>

    <!-- Title -->
    <h1 class="text-5xl font-extrabold text-center text-gray-800 drop-shadow mb-14">
      📚 Explore Our Book Collection
    </h1>

    <!-- Book Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
      <div
        v-for="(book, index) in books"
        :key="index"
        class="bg-white/60 backdrop-blur-md rounded-3xl shadow-xl border border-white/30 overflow-hidden transform transition hover:scale-105 hover:shadow-2xl"
      >
        <img
          :src="book.image"
          :alt="book.title"
          class="w-full h-60 object-cover"
        />
        <div class="p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-1 drop-shadow-sm">{{ book.title }}</h2>
          <p class="text-sm text-gray-600 mb-3 italic">📗 {{ book.genre }}</p>
          <p class="text-gray-700 text-base mb-4">{{ book.description }}</p>
          <button
            class="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg hover:from-purple-600 hover:to-blue-600 transition"
          >
            Read More
          </button>
        </div>
=======
  <section class="min-h-screen bg-gray-50 p-6">
    <!-- Page Title -->
    <h1 class="text-2xl font-bold text-gray-800 mb-4">📚 Book List</h1>

    <!-- Search Bar -->
    <div class="mb-6">
      <input
        type="text"
        v-model="search"
        placeholder="Search books..."
        class="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Book Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div
        v-for="book in filteredBooks"
        :key="book.id"
        class="bg-white rounded-xl p-4 shadow hover:shadow-md transition"
      >
        <h2 class="text-lg font-semibold text-blue-700">{{ book.title }}</h2>
        <p class="text-sm text-gray-600">Author: {{ book.author }}</p>
        <p class="text-xs text-gray-400 mt-1">Published: {{ book.year }}</p>
>>>>>>> a546a68f58e9d0166bbd02019572bc7c00fb9f4f
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const search = ref('')

const books = ref([
  { id: 1, title: 'The Alchemist', author: 'Paulo Coelho', year: 1988 },
  { id: 2, title: '1984', author: 'George Orwell', year: 1949 },
  { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
])

const filteredBooks = computed(() => {
  return books.value.filter((book) =>
    book.title.toLowerCase().includes(search.value.toLowerCase())
  )
})
</script>

<style scoped>
/* Optional custom styles */
</style>
