<template>
  <div class="home min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 py-10 px-6">
    <!-- Page Title -->
    <h1 class="text-4xl font-extrabold text-center text-blue-900 mb-12 drop-shadow">📖 Library Dashboard</h1>

    <!-- Hero Banner -->
    <div class="max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-xl mb-12">
      <img
        src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80"
        alt="Library Image"
        class="w-full h-80 object-cover"
      />
    </div>

    <!-- Grid Panels -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <!-- Left Info Card -->
      <div class="lg:col-span-2 bg-white/70 backdrop-blur-md p-6 rounded-3xl shadow-md">
        <h2 class="text-2xl font-semibold text-blue-900 mb-4">📚 Discover Your Library</h2>
        <p class="text-blue-800 mb-4">
          Our library is more than just books — it’s a vibrant space for learning, creativity, and connection.
          Explore thousands of physical and digital resources in a peaceful environment that supports your journey.
        </p>
        <p class="text-gray-700 text-sm italic">✨ Visit us today and find your next great read!</p>
      </div>

      <!-- Dashboard Stats Card -->
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-white/70 backdrop-blur-md rounded-xl p-4 shadow-md flex flex-col items-center justify-center text-center">
          <div class="text-3xl mb-2">📖</div>
          <div class="text-xl font-bold text-blue-800">12,000+</div>
          <p class="text-sm text-gray-700">Books Available</p>
        </div>
        <div class="bg-white/70 backdrop-blur-md rounded-xl p-4 shadow-md flex flex-col items-center justify-center text-center">
          <div class="text-3xl mb-2">👤</div>
          <div class="text-xl font-bold text-blue-800">2,300+</div>
          <p class="text-sm text-gray-700">Active Members</p>
        </div>
        <div class="bg-white/70 backdrop-blur-md rounded-xl p-4 shadow-md flex flex-col items-center justify-center text-center">
          <div class="text-3xl mb-2">🕐</div>
          <div class="text-xl font-bold text-blue-800">Mon–Fri</div>
          <p class="text-sm text-gray-700">8:00 AM – 6:00 PM</p>
        </div>
        <div class="bg-white/70 backdrop-blur-md rounded-xl p-4 shadow-md flex flex-col items-center justify-center text-center">
          <div class="text-3xl mb-2">📬</div>
          <div class="text-sm text-blue-800 font-medium">library@example.com</div>
          <p class="text-sm text-gray-700">Contact Us</p>
        </div>
      </div>
    </div>
  </div>
</template>
