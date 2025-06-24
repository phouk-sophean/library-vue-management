<template>
  <main class="min-h-screen bg-gray-50 p-6 max-w-7xl mx-auto">
    <!-- Header -->
    <header class="mb-8 flex justify-between items-center">
      <h1 class="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
        <span>📚</span>
        <span>Book List</span>
      </h1>
      <button
        @click="openForm()"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + Add Book
      </button>
    </header>

    <!-- Search -->
    <div class="mb-6 relative w-full sm:w-1/2">
      <input
        type="search"
        v-model="search"
        placeholder="Search books..."
        class="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        v-if="search"
        @click="search = ''"
        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700"
      >
        &times;
      </button>
    </div>

    <!-- Loading / Error / No Results -->
    <div v-if="loading" class="text-center py-12 text-gray-500">
      Loading books...
    </div>
    <div v-if="error" class="text-center py-12 text-red-600">
      Failed to load books.
    </div>
    <div
      v-if="!loading && !error && filteredBooks.length === 0"
      class="text-center py-12 text-gray-500"
    >
      No books found.
    </div>

    <!-- Book Cards -->
    <section
      v-if="!loading && !error && visibleBooks.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
    >
      <article
        v-for="book in visibleBooks"
        :key="book.id"
        class="bg-white rounded-xl p-6 shadow hover:shadow-lg transition relative"
      >
        <h2 class="text-xl font-semibold text-blue-700 mb-2">
          {{ book.title }}
        </h2>
        <p class="text-sm text-gray-600 mb-1">Author: {{ book.author }}</p>
        <p class="text-xs text-gray-400 mb-1">
          Published: {{ formatDate(book.updated_at) }}
        </p>
        <p class="text-xs text-gray-500 italic mb-3">
          Category:
          {{ book.categories.map((c) => c.name).join(", ") || "None" }}
        </p>

        <div class="absolute top-2 right-2 flex gap-2">
          <button
            @click="openForm(book)"
            class="text-blue-600 hover:text-blue-800"
          >
            ✏️
          </button>
          <button
            @click="confirmDelete(book.id)"
            class="text-red-600 hover:text-red-800"
          >
            🗑️
          </button>
        </div>
      </article>
    </section>

    <!-- Show More / Show Less -->
    <div v-if="filteredBooks.length > 6" class="text-center mt-6">
      <button
        @click="showAll = !showAll"
        class="text-blue-600 font-medium hover:underline"
      >
        {{ showAll ? "Show Less" : "Show More" }}
      </button>
    </div>

    <!-- Modal Form -->
    <div
      v-if="showForm"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2"
      role="dialog"
      aria-modal="true"
    >
      <form
        @submit.prevent="handleSubmit"
        class="bg-white p-4 rounded-lg max-w-sm w-full shadow-xl border"
      >
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-900">
            {{ form.id ? "✏️ Edit Book" : "➕ Add New Book" }}
          </h2>
          <button
            type="button"
            @click="closeForm"
            class="text-gray-400 hover:text-gray-600 text-lg focus:outline-none"
            aria-label="Close form"
          >
            &times;
          </button>
        </div>

        <div class="space-y-3">
          <label class="block">
            <span class="text-xs font-medium text-gray-700 mb-1 block"
              >📖 Title</span
            >
            <input
              v-model="form.title"
              required
              class="w-full border border-gray-300 px-2 py-1.5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </label>

          <label class="block">
            <span class="text-xs font-medium text-gray-700 mb-1 block"
              >👤 Author</span
            >
            <input
              v-model="form.author"
              required
              class="w-full border border-gray-300 px-2 py-1.5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </label>

          <label class="block">
            <span class="text-xs font-medium text-gray-700 mb-1 block"
              ># ISBN</span
            >
            <input
              v-model="form.isbn"
              required
              class="w-full border border-gray-300 px-2 py-1.5 rounded-md text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </label>

          <label class="block">
            <span class="text-xs font-medium text-gray-700 mb-1 block"
              >📦 Copies</span
            >
            <input
              type="number"
              min="1"
              v-model="form.copies"
              required
              class="w-full border border-gray-300 px-2 py-1.5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </label>

          <label class="block">
            <span class="text-xs font-medium text-gray-700 mb-1 block"
              >🏷️ Categories</span
            >
            <select
              v-model="form.category_ids"
              multiple
              size="4"
              class="w-full border border-gray-300 px-2 py-1.5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
          </label>
        </div>

        <div class="flex justify-end gap-2 mt-3 pt-1 border-t border-gray-200">
          <button
            type="button"
            @click="closeForm"
            class="px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-blue-600 text-white px-5 py-1.5 rounded-md hover:bg-blue-700 transition-colors font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {{ form.id ? "Update Book" : "Create Book" }}
          </button>
        </div>
      </form>
    </div>

    <!-- Delete Confirmation -->
    <div
      v-if="deleteId !== null"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-desc"
    >
      <div class="bg-white rounded-md shadow-lg max-w-sm w-full p-5">
        <h3
          id="delete-dialog-title"
          class="text-lg font-semibold text-gray-900 mb-3"
        >
          🗑️ Delete Book
        </h3>
        <p id="delete-dialog-desc" class="mb-5 text-gray-700">
          Are you sure you want to delete this book? This action cannot be
          undone.
        </p>

        <div class="flex justify-end gap-3">
          <button
            @click="deleteId = null"
            class="px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
          >
            Cancel
          </button>
          <button
            @click="deleteBook"
            class="px-4 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import api from "@/plugins/axios";

const books = ref([]);
const categories = ref([]);
const search = ref("");
const loading = ref(false);
const error = ref(false);

const showAll = ref(false);
const showForm = ref(false);
const deleteId = ref(null);

const form = ref({
  id: null,
  title: "",
  author: "",
  isbn: "",
  copies: 1,
  category_ids: [],
});

// Fetch books
const fetchBooks = async () => {
  loading.value = true;
  error.value = false;
  try {
    const res = await api.get("/v1/book");
    books.value = res.data.data || res.data.Data || [];
  } catch (err) {
    error.value = true;
    console.error("Error loading books:", err);
  } finally {
    loading.value = false;
  }
};

// Fetch categories
const fetchCategories = async () => {
  try {
    const res = await api.get("/v1/category");
    categories.value = res.data.data || res.data.Data || [];
  } catch (err) {
    console.error("Error loading categories:", err);
  }
};

// Filter + show more logic
const filteredBooks = computed(() => {
  return books.value.filter((book) =>
    book.title.toLowerCase().includes(search.value.toLowerCase())
  );
});

const visibleBooks = computed(() => {
  return showAll.value ? filteredBooks.value : filteredBooks.value.slice(0, 6);
});

// Utilities
function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function openForm(book = null) {
  if (book) {
    form.value = {
      id: book.id,
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      copies: book.copies,
      category_ids: book.categories.map((c) => c.id),
    };
  } else {
    form.value = {
      id: null,
      title: "",
      author: "",
      isbn: "",
      copies: 1,
      category_ids: [],
    };
  }
  showForm.value = true;
}

function closeForm() {
  showForm.value = false;
}

// Create or update book
const handleSubmit = async () => {
  try {
    if (form.value.id) {
      await api.put(`/v1/book/${form.value.id}`, { ...form.value });
    } else {
      await api.post("/v1/book", { ...form.value });
    }
    await fetchBooks();
    closeForm();
  } catch (err) {
    alert("Failed to save book. See console.");
    console.error(err);
  }
};

// Delete
function confirmDelete(id) {
  deleteId.value = id;
}

const deleteBook = async () => {
  try {
    await api.delete(`/v1/book/${deleteId.value}`);
    await fetchBooks();
    deleteId.value = null;
  } catch (err) {
    alert("Failed to delete book.");
    console.error(err);
  }
};

// Init
onMounted(() => {
  fetchBooks();
  fetchCategories();
});
</script>

<style scoped>
/* Add your custom styles if needed */
</style>
