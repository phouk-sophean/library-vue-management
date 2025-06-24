<template>
  <section class="min-h-screen bg-gray-50 p-6">
    <!-- Page Title & Add Button -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">🗂 Categories</h1>
      <button
        @click="toggleForm"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm shadow"
      >
        {{ showForm ? "Close" : "+ Add Category" }}
      </button>
    </div>

    <!-- Add/Edit Category Form -->
    <div v-if="showForm" class="bg-white p-4 rounded-lg shadow mb-6">
      <form @submit.prevent="isEditing ? updateCategory() : addCategory()">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          {{ isEditing ? "Edit Category" : "Category Name" }}
        </label>
        <input
          v-model="newCategory"
          type="text"
          required
          class="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring focus:border-blue-400"
        />
        <button
          type="submit"
          class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          {{ isEditing ? "Update" : "Save" }}
        </button>
        <button
          type="button"
          @click="cancelEdit"
          class="ml-2 text-gray-600 hover:text-black text-sm"
        >
          Cancel
        </button>
      </form>
    </div>

    <!-- Category List -->
    <div class="bg-white shadow rounded-xl border overflow-x-auto">
      <table class="min-w-full text-sm text-left">
        <thead class="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th class="px-4 py-3">#</th>
            <th class="px-4 py-3">Category Name</th>
            <th class="px-4 py-3">Created At</th>
            <th class="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr
            v-for="(cat, index) in categories"
            :key="cat.id"
            class="hover:bg-gray-50"
          >
            <td class="px-4 py-3">{{ index + 1 }}</td>
            <td class="px-4 py-3 font-medium text-blue-600">{{ cat.name }}</td>
            <td class="px-4 py-3 text-gray-600">
              {{ formatDate(cat.created_at) }}
            </td>
            <td class="px-4 py-3 text-right space-x-2">
              <button
                class="text-sm text-blue-600 hover:underline"
                @click="startEdit(cat)"
              >
                Edit
              </button>
              <button
                class="text-sm text-red-600 hover:underline"
                @click="deleteCategory(cat.id)" 
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/plugins/axios";

// Refs
const categories = ref([]);
const showForm = ref(false);
const newCategory = ref("");
const isEditing = ref(false);
const editingCategory = ref(null);

// Fetch data
const fetchCategories = async () => {
  try {
    const response = await api.get("/v1/category");
    categories.value = response.data.Data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

// Format created_at
const formatDate = (dateStr) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Date(dateStr).toLocaleDateString("en-US", options);
};

// Toggle form display
const toggleForm = () => {
  showForm.value = !showForm.value;
  if (!showForm.value) cancelEdit();
};

// Add new category
const addCategory = async () => {
  try {
    await api.post("/v1/category", {
      name: newCategory.value,
    });
    newCategory.value = "";
    showForm.value = false;
    fetchCategories();
  } catch (error) {
    console.error("Add failed:", error);
  }
};

// Start editing
const startEdit = (category) => {
  newCategory.value = category.name;
  editingCategory.value = category;
  isEditing.value = true;
  showForm.value = true;
};

// Cancel editing
const cancelEdit = () => {
  isEditing.value = false;
  editingCategory.value = null;
  newCategory.value = "";
};

// Update existing category
const updateCategory = async () => {
  try {
    await api.put(`/v1/category/${editingCategory.value.id}`, {
      name: newCategory.value,
    });
    cancelEdit();
    showForm.value = false;
    fetchCategories();
  } catch (error) {
    console.error("Update failed:", error);
  }
};

// Init
onMounted(() => {
  fetchCategories();
});

const deleteCategory = async (id) => {
  if (!confirm("Are you sure you want to delete this category?")) return;
  
  try {
    await api.delete(`/v1/category/${id}`);
    fetchCategories(); // Refresh the list
  } catch (error) {
    console.error("Delete failed:", error);
  }
};
</script>

<style scoped>
/* Add styles if needed */
</style>
