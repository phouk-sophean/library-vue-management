<template>
  <div class="category bg-blue-50 min-h-screen py-10 px-4">
    <h1 class="text-center text-3xl text-blue-800 font-bold mb-8">Welcome to Category Page</h1>

    <!-- Categories Grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
      <div
        v-for="(category, index) in categories"
        :key="index"
        class="bg-white text-blue-700 border border-blue-200 rounded-lg py-4 px-3 shadow hover:bg-blue-100 transition cursor-pointer"
      >
        {{ category }}
      </div>
    </div>
  </div>
</template>

<script setup>
const categories = [
  "Fiction",
  "Non-Fiction",
  "Mystery",
  "Fantasy",
  "Science Fiction",
  "Romance",
  "Biography",
  "History",
  "Horror",
  "Self-Help",
  "Children's Books",
  "Young Adult",
  "Comics & Graphic Novels",
  "Travel",
  "Cookbooks",
  "Poetry",
  "Business",
  "Health & Wellness",
  "Religion & Spirituality",
  "Education"
];
</script>



<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>