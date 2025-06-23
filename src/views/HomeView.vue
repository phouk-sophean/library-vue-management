<template>
  <section class="min-h-screen bg-gray-50 p-6">
    <!-- Page Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800">📊 Dashboard</h1>
      <p class="text-sm text-gray-500">Overview of your library system</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white rounded-xl shadow p-4">
        <h2 class="text-sm text-gray-500">Total Books</h2>
        <p class="text-2xl font-bold text-blue-600">1,245</p>
      </div>
      <div class="bg-white rounded-xl shadow p-4">
        <h2 class="text-sm text-gray-500">Borrowed</h2>
        <p class="text-2xl font-bold text-yellow-600">328</p>
      </div>
      <div class="bg-white rounded-xl shadow p-4">
        <h2 class="text-sm text-gray-500">Members</h2>
        <p class="text-2xl font-bold text-green-600">562</p>
      </div>
      <div class="bg-white rounded-xl shadow p-4">
        <h2 class="text-sm text-gray-500">Overdue</h2>
        <p class="text-2xl font-bold text-red-600">12</p>
      </div>
    </div>

    <!-- Recent Activity Placeholder -->
    <div class="mt-8 bg-white rounded-xl shadow p-6">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">📌 Recent Activity</h2>
      <ul class="space-y-3 text-sm text-gray-600">
        <li>• John borrowed “1984”</li>
        <li>• New member: Sophean Phouk</li>
        <li>• "Harry Potter" marked as returned</li>
        <li>• Maintenance scheduled for next week</li>
      </ul>
    </div>
  </section>
</template>

<script setup>
// Static values for now — you can replace with API data
</script>

<style scoped>
/* Add custom styles here if needed */
</style>
