<template>
  <section class="min-h-screen bg-gray-50 p-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">🗂 Categories</h1>
      <button
        @click="toggleForm"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm shadow"
      >
        {{ showForm ? "Close" : "+ Add Category" }}
      </button>
    </div>

    <!-- Add/Edit Form -->
    <div v-if="showForm" class="bg-white p-4 rounded-lg shadow mb-6">
      <form @submit.prevent="isEditing ? handleUpdateCategory() : handleAddCategory()">
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

    <!-- Category Table -->
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
                @click="handleDeleteCategory(cat.id)"
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
import {
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/api/category";

// Refs
const categories = ref([]);
const newCategory = ref("");
const showForm = ref(false);
const isEditing = ref(false);
const editingCategory = ref(null);

// Fetch list
const fetchCategories = async () => {
  try {
    const response = await getCategory();
    categories.value = response.data.Data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

// Format date
const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// Toggle form
const toggleForm = () => {
  showForm.value = !showForm.value;
  if (!showForm.value) cancelEdit();
};

// Add
const handleAddCategory = async () => {
  try {
    await createCategory({ name: newCategory.value });
    newCategory.value = "";
    showForm.value = false;
    fetchCategories();
  } catch (error) {
    console.error("Add failed:", error);
  }
};

// Edit
const startEdit = (cat) => {
  newCategory.value = cat.name;
  editingCategory.value = cat;
  isEditing.value = true;
  showForm.value = true;
};

// Cancel
const cancelEdit = () => {
  newCategory.value = "";
  editingCategory.value = null;
  isEditing.value = false;
};

// Update
const handleUpdateCategory = async () => {
  try {
    console.log("Updating category:", editingCategory.value.id, newCategory.value);
    await updateCategory(editingCategory.value.id, {
      name: newCategory.value,
    });
    cancelEdit();
    showForm.value = false;
    fetchCategories();
  } catch (error) {
    console.error("Update failed:", error.response?.data || error.message);
  }
};


// Delete
const handleDeleteCategory = async (id) => {
  if (!confirm("Are you sure you want to delete this category?")) return;

  try {
    await deleteCategory(id);
    fetchCategories();
  } catch (error) {
    console.error("Delete failed:", error);
  }
};

// Init
onMounted(() => {
  fetchCategories();
});
</script>

<style scoped>
/* Optional custom styles */
</style>
