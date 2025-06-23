
<template>
  <div class="home min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6">
    <!-- Main Title -->
    <h1 class="text-4xl font-bold text-center text-gray-800 mb-10">Explore Our Book Collection</h1>

    <!-- Book Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      <div
        v-for="(book, index) in books"
        :key="index"
        class="bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-105"
      >
        <img
          :src="book.image"
          :alt="book.title"
          class="w-full h-60 object-cover"
        />
        <div class="p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ book.title }}</h2>
          <p class="text-gray-600 text-sm mb-4">{{ book.description }}</p>
          <button class="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg shadow hover:shadow-lg hover:from-purple-600 hover:to-blue-600 transition">
            Read More
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const books = [
  {
    title: "The Great Adventure",
    description: "Discover a journey through time, magic, and friendship in this unforgettable tale.",
    image: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Mystery of the Lost Island",
    description: "Uncover secrets and ancient legends buried deep within a forgotten island.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Beyond the Stars",
    description: "An epic science fiction story that takes you across galaxies and into unknown worlds.",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"
  }
]
</script>


