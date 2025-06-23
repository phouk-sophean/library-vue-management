<template>
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
      </div>
    </div>
  </div>
</template>

<script setup>
const books = [
  {
    title: "The Great Adventure",
    genre: "Fantasy",
    description: "Discover a journey through time, magic, and friendship in this unforgettable tale.",
    image: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Mystery of the Lost Island",
    genre: "Mystery",
    description: "Uncover secrets and ancient legends buried deep within a forgotten island.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Beyond the Stars",
    genre: "Science Fiction",
    description: "An epic science fiction story that takes you across galaxies and into unknown worlds.",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Love in the Library",
    genre: "Romance",
    description: "A quiet romance blooms between two book lovers in the heart of an old library.",
    image: "https://images.unsplash.com/photo-1519682577862-22b62b24e493?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "The Art of Peace",
    genre: "Philosophy",
    description: "Insights on mindfulness, balance, and life through ancient Eastern wisdom.",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "The Young Coder",
    genre: "Education / Technology",
    description: "An inspiring guide for young minds entering the world of programming and tech.",
    image: "https://images.unsplash.com/photo-1531497865144-0464ef8fb9c1?auto=format&fit=crop&w=800&q=80"
  }
]
</script>
