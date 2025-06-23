<template>
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
    </div>
  </div>
</template>

<script setup>
const categories = [
  { name: "Fiction", icon: "📘" },
  { name: "Non-Fiction", icon: "📗" },
  { name: "Mystery", icon: "🕵️‍♂️" },
  { name: "Fantasy", icon: "🐉" },
  { name: "Science Fiction", icon: "🚀" },
  { name: "Romance", icon: "💖" },
  { name: "Biography", icon: "👤" },
  { name: "History", icon: "🏛️" },
  { name: "Horror", icon: "👻" },
  { name: "Self-Help", icon: "🌱" },
  { name: "Children's Books", icon: "🧸" },
  { name: "Young Adult", icon: "🧑‍🎓" },
  { name: "Comics & Graphic Novels", icon: "🦸‍♂️" },
  { name: "Travel", icon: "🌍" },
  { name: "Cookbooks", icon: "🍳" },
  { name: "Poetry", icon: "✍️" },
  { name: "Business", icon: "💼" },
  { name: "Health & Wellness", icon: "💪" },
  { name: "Religion & Spirituality", icon: "🙏" },
  { name: "Education", icon: "📚" }
]
</script>
