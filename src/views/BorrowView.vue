<template>
  <section class="min-h-screen bg-gray-50 p-6">
    <!-- Title -->
    <h1 class="text-2xl font-bold text-gray-800 mb-4">📦 Borrowing Records</h1>

    <!-- Borrowing Table -->
    <div class="overflow-x-auto bg-white rounded-xl shadow border">
      <table class="min-w-full text-sm text-left">
        <thead class="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th class="px-4 py-3">#</th>
            <th class="px-4 py-3">Book Title</th>
            <th class="px-4 py-3">Member</th>
            <th class="px-4 py-3">Borrow Date</th>
            <th class="px-4 py-3">Return Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="(item, index) in borrowings" :key="item.id" class="hover:bg-gray-50">
            <td class="px-4 py-3">{{ index + 1 }}</td>
            <td class="px-4 py-3 font-medium text-blue-600">{{ item.book }}</td>
            <td class="px-4 py-3">{{ item.member }}</td>
            <td class="px-4 py-3">{{ item.date }}</td>
            <td class="px-4 py-3">
              <span
                :class="[
                  'px-2 py-1 rounded-full text-xs font-medium',
                  item.returned ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                ]"
              >
                {{ item.returned ? 'Returned' : 'Pending' }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const borrowings = ref([
  { id: 1, book: 'The Alchemist', member: 'John Smith', date: '2025-06-20', returned: true },
  { id: 2, book: '1984', member: 'Alice Doe', date: '2025-06-21', returned: false },
  { id: 3, book: 'Atomic Habits', member: 'Mark Lee', date: '2025-06-19', returned: true },
])
</script>

<style scoped>
/* Optional custom styling */
</style>
