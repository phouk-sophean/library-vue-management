<template>
  <div class="p-6 min-h-screen bg-gray-100">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">👥 Members</h1>

    <!-- Search and Add -->
    <div class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search members..."
        class="w-full sm:w-1/3 px-4 py-2 border rounded shadow-sm focus:ring focus:border-blue-500"
      />
      <button
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        @click="openAddModal"
      >
        ➕ Add Member
      </button>
    </div>

    <!-- Member Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="member in filteredMembers"
        :key="member.id"
        class="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 border border-gray-200 bg-white"
      >
        <!-- Card Header -->
        <div class="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-4 flex items-center gap-4">
          <div class="bg-white text-blue-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow">
            {{ member.name.charAt(0).toUpperCase() }}
          </div>
          <div>
            <h2 class="text-xl font-semibold">{{ member.name }}</h2>
            <p class="text-sm text-blue-100">ID: #{{ member.id }}</p>
          </div>
        </div>

        <!-- Card Body -->
        <div class="p-4 space-y-3 text-gray-700">
          <div class="flex items-center gap-2">
            <span class="text-blue-500">📧</span>
            <span>{{ member.email }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-green-500">📞</span>
            <span>{{ member.phone }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-purple-500">📍</span>
            <span>{{ member.address }}</span>
          </div>
        </div>

        <!-- Card Footer -->
        <div class="p-4 bg-gray-50 text-right space-x-4">
          <button class="text-sm text-blue-600" @click="openEditModal(member)">Edit</button>
          <button class="text-sm text-red-600" @click="deleteMember(member.id)">Delete</button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div class="bg-white rounded-xl w-full max-w-md p-6 shadow-lg">
        <h2 class="text-xl font-semibold mb-4">{{ isEditing ? 'Edit Member' : 'Add New Member' }}</h2>
        <form @submit.prevent="submitMember" class="space-y-4">
          <input v-model="form.name" type="text" placeholder="Name" class="w-full px-4 py-2 border rounded" required />
          <input v-model="form.email" type="email" placeholder="Email" class="w-full px-4 py-2 border rounded" required />
          <input v-model="form.phone" type="text" placeholder="Phone" class="w-full px-4 py-2 border rounded" required />
          <input v-model="form.address" type="text" placeholder="Address" class="w-full px-4 py-2 border rounded" required />
          <div class="flex justify-end gap-3">
            <button type="button" @click="resetForm" class="text-gray-600 hover:text-black">Cancel</button>
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              {{ isEditing ? 'Update' : 'Save' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

// State
const showModal = ref(false)
const searchQuery = ref('')
const members = ref([])
const form = ref({ id: null, name: '', email: '', phone: '', address: '' })
const isEditing = ref(false)
const nextId = ref(100)

// Open Modal Handlers
function openAddModal() {
  isEditing.value = false
  resetForm()
  showModal.value = true
}

function openEditModal(member) {
  isEditing.value = true
  form.value = { ...member }
  showModal.value = true
}

// Submit Handler
function submitMember() {
  if (isEditing.value) {
    const index = members.value.findIndex((m) => m.id === form.value.id)
    if (index !== -1) {
      members.value[index] = { ...form.value }
    }
  } else {
    nextId.value++
    members.value.push({ id: nextId.value, ...form.value })
  }
  saveToLocalStorage()
  resetForm()
}

// Delete Handler
function deleteMember(id) {
  members.value = members.value.filter((m) => m.id !== id)
  saveToLocalStorage()
}

// Reset
function resetForm() {
  form.value = { id: null, name: '', email: '', phone: '', address: '' }
  showModal.value = false
}

// Filtered View
const filteredMembers = computed(() => {
  return members.value.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// LocalStorage
function saveToLocalStorage() {
  localStorage.setItem('members', JSON.stringify(members.value))
  localStorage.setItem('memberNextId', nextId.value.toString())
}

function loadFromLocalStorage() {
  const stored = localStorage.getItem('members')
  const storedId = localStorage.getItem('memberNextId')
  if (stored) members.value = JSON.parse(stored)
  if (storedId) nextId.value = parseInt(storedId)
}

// Init
onMounted(() => {
  loadFromLocalStorage()
})
</script>
