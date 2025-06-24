<template>
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
