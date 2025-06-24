<template>
  <section class="min-h-screen bg-gray-50 p-6">
    <!-- Page Title & Add Button -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">👥 Members</h1>
      <button
        @click="openForm()"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm shadow"
      >
        + Add Member
      </button>
    </div>

    <!-- Member Table -->
    <div class="bg-white shadow rounded-xl border overflow-x-auto">
      <table class="min-w-full text-sm text-left">
        <thead class="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th class="px-4 py-3">#</th>
            <th class="px-4 py-3">Name</th>
            <th class="px-4 py-3">Email</th>
            <th class="px-4 py-3">Phone</th>
            <th class="px-4 py-3">Updated At</th>
            <th class="px-4 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="(member, index) in members" :key="member.id" class="hover:bg-gray-50">
            <td class="px-4 py-3">{{ index + 1 }}</td>
            <td class="px-4 py-3 font-medium text-blue-600">{{ member.name }}</td>
            <td class="px-4 py-3">{{ member.email }}</td>
            <td class="px-4 py-3">{{ member.phone }}</td>
            <td class="px-4 py-3 text-gray-500">{{ formatDate(member.updated_at) }}</td>
            <td class="px-4 py-3 text-right space-x-2">
              <button class="text-sm text-blue-600 hover:underline" @click="startEdit(member)">Edit</button>
              <button class="text-sm text-red-600 hover:underline" @click="deleteMember(member.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Member Modal -->
    <div v-if="showForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <form
        @submit.prevent="isEditing ? updateMember() : addMember()"
        class="bg-white p-6 rounded-lg max-w-sm w-full shadow-lg"
      >
        <h2 class="text-lg font-bold mb-4 text-gray-800">{{ isEditing ? 'Edit Member' : 'Add Member' }}</h2>

        <div class="space-y-3">
          <input v-model="form.name" type="text" placeholder="Name" required class="w-full border px-3 py-2 rounded" />
          <input v-model="form.email" type="email" placeholder="Email" required class="w-full border px-3 py-2 rounded" />
          <input v-model="form.phone" type="text" placeholder="Phone" required class="w-full border px-3 py-2 rounded" />
        </div>

        <div class="flex justify-end gap-2 mt-4">
          <button type="button" @click="resetForm" class="px-4 py-2 border rounded hover:bg-gray-100 text-sm">Cancel</button>
          <button type="submit" class="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 text-sm">
            {{ isEditing ? 'Update' : 'Save' }}
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'

// States
const members = ref([])
const showForm = ref(false)
const isEditing = ref(false)
const editingId = ref(null)

const form = ref({
  name: '',
  email: '',
  phone: ''
})

// Load members
const loadMembers = async () => {
  try {
    const res = await api.get('/v1/member')
    members.value = res.data.data || []
  } catch (error) {
    console.error('Error loading members:', error)
  }
}

// Add member
const addMember = async () => {
  try {
    await api.post('/v1/member', form.value)
    resetForm()
    loadMembers()
  } catch (error) {
    console.error('Error adding member:', error)
  }
}

// Start editing
const startEdit = (member) => {
  form.value = { ...member }
  editingId.value = member.id
  isEditing.value = true
  showForm.value = true
}

// Update member
const updateMember = async () => {
  try {
    await api.put(`/v1/member/${editingId.value}`, form.value)
    resetForm()
    loadMembers()
  } catch (error) {
    console.error('Error updating member:', error)
  }
}

// Delete member
const deleteMember = async (id) => {
  if (!confirm('Are you sure you want to delete this member?')) return
  try {
    await api.delete(`/v1/member/${id}`)
    loadMembers()
  } catch (error) {
    console.error('Error deleting member:', error)
  }
}

// Reset form
const resetForm = () => {
  form.value = { name: '', email: '', phone: '' }
  isEditing.value = false
  editingId.value = null
  showForm.value = false
}

// Open form for add
const openForm = () => {
  resetForm()
  showForm.value = true
}

// Format date
const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Init
onMounted(() => {
  loadMembers()
})
</script>
