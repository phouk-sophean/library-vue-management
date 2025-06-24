<template>
  <section class="min-h-screen bg-gray-50 p-6">
    <!-- Title -->
    <h1 class="text-2xl font-bold text-gray-800 mb-6">📦 Borrowing Records</h1>

    <!-- Table -->
    <div class="overflow-x-auto bg-white rounded-xl shadow border">
      <table class="min-w-full text-sm text-left">
        <thead class="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th class="px-4 py-3">#</th>
            <th class="px-4 py-3">Book Title</th>
            <th class="px-4 py-3">Member Name</th>
            <th class="px-4 py-3">Borrow Date</th>
            <th class="px-4 py-3">Return Status</th>
          </tr>
        </thead>
        <tbody v-if="borrowings.length > 0" class="divide-y divide-gray-200">
          <tr v-for="(item, index) in borrowings" :key="item.id" class="hover:bg-gray-50">
            <td class="px-4 py-3">{{ index + 1 }}</td>
            <td class="px-4 py-3 text-blue-600 font-medium">{{ item.book?.title || 'N/A' }}</td>
            <td class="px-4 py-3">{{ item.member?.name || 'N/A' }}</td>
            <td class="px-4 py-3">{{ formatDate(item.borrow_date) }}</td>
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
        <tbody v-else>
          <tr>
            <td colspan="5" class="text-center px-4 py-6 text-gray-500">No borrowings found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'

// Data state
const borrowings = ref([])

// Format date to readable string
const formatDate = (dateStr) => {
  const d = new Date(dateStr)
  return d.toLocaleDateString()
}

// Fetch from API
const fetchBorrows = async () => {
  try {
    const res = await api.get('/v1/borrowing')
    borrowings.value = res.data.data || res.data.Data || []
    console.log(borrowings);
    
  } catch (err) {
    console.error('Error loading borrowings:', err)
  }
}

onMounted(fetchBorrows)
</script>
