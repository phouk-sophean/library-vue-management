<template>
  <section class="min-h-screen bg-gray-50 p-6">
    <div class="header flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">📦 Borrowing Records</h1>

      <button
        @click="openCreateForm"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm shadow transition duration-300"
      >
        + Add Borrow
      </button>
    </div>

    <!-- Borrowings Table -->
    <div class="overflow-auto rounded-xl shadow border bg-white max-w-full">
      <table class="min-w-full text-sm text-left">
        <thead class="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th class="px-4 py-3">#</th>
            <th class="px-4 py-3">Book Title</th>
            <th class="px-4 py-3">Member Name</th>
            <th class="px-4 py-3">Borrow Date</th>
            <th class="px-4 py-3">Due Date</th>
            <th class="px-4 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody v-if="borrowings.length > 0" class="divide-y divide-gray-200">
          <tr
            v-for="(item, index) in borrowings"
            :key="item.id"
            class="hover:bg-gray-50"
          >
            <td class="px-4 py-3">{{ index + 1 }}</td>
            <td class="px-4 py-3 text-blue-600 font-medium">
              {{ item.book?.title || "N/A" }}
            </td>
            <td class="px-4 py-3">{{ item.member?.name || "N/A" }}</td>
            <td class="px-4 py-3">{{ formatDate(item.borrow_date) }}</td>
            <td class="px-4 py-3">{{ formatDate(item.return_date) }}</td>
            <td class="px-4 py-3 text-right flex gap-2 justify-end">
              <button
                @click="openEditForm(item)"
                class="text-sm text-indigo-600 hover:underline"
              >
                Edit
              </button>
              <button
                @click="handleDeleteBorrow(item.id)"
                class="text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="6" class="text-center px-4 py-6 text-gray-500">
              No borrowings found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Toast Notification -->
    <div
      v-if="notification.show"
      class="fixed top-4 right-4 z-50 px-4 py-2 rounded shadow-lg text-white text-sm transition"
      :class="{
        'bg-green-600': notification.type === 'success',
        'bg-red-600': notification.type === 'error'
      }"
    >
      {{ notification.message }}
    </div>

    <!-- Modal -->
    <transition name="fade">
      <div
        v-if="showForm"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div
          class="bg-white p-6 rounded-xl shadow max-w-xl w-full relative"
        >
          <!-- Close button -->
          <button
            @click="resetForm"
            class="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
          >
            &times;
          </button>

          <h2 class="text-lg font-bold mb-4 text-gray-800">
            {{ isEdit ? "✏️ Edit Borrow" : "➕ Create Borrow" }}
          </h2>

          <!-- Form -->
          <form @submit.prevent="isEdit ? updateBorrowing() : createBorrowing()">
            <!-- Book -->
            <div class="mb-4">
              <label class="block mb-1 text-sm font-medium text-gray-700">📘 Book</label>
              <select
                v-model="form.book_id"
                required
                class="w-full border px-3 py-2 rounded-lg"
              >
                <option value="" disabled>Select Book</option>
                <option v-for="book in books" :key="book.id" :value="book.id">
                  {{ book.title }}
                </option>
              </select>
            </div>

            <!-- Member -->
            <div class="mb-4">
              <label class="block mb-1 text-sm font-medium text-gray-700">👤 Member</label>
              <select
                v-model="form.member_id"
                required
                class="w-full border px-3 py-2 rounded-lg"
              >
                <option value="" disabled>Select Member</option>
                <option v-for="member in members" :key="member.id" :value="member.id">
                  {{ member.name }}
                </option>
              </select>
            </div>

            <!-- Borrow Date -->
            <div class="mb-4">
              <label class="block mb-1 text-sm font-medium text-gray-700">📅 Borrow Date</label>
              <input
                type="date"
                v-model="form.borrow_date"
                required
                class="w-full border px-3 py-2 rounded-lg"
              />
            </div>

            <!-- Return Due Date -->
            <div class="mb-4">
              <label class="block mb-1 text-sm font-medium text-gray-700">📅 Return Due Date</label>
              <input
                type="date"
                v-model="form.return_date"
                required
                class="w-full border px-3 py-2 rounded-lg"
              />
            </div>

            <!-- Actions -->
            <div class="flex justify-end gap-2">
              <button
                type="button"
                @click="resetForm"
                class="px-4 py-2 border rounded hover:bg-gray-100 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded text-sm transition duration-300"
              >
                {{ isEdit ? "Update" : "Create" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  getBorrow,
  createBorrow,
  updateBorrow,
  deleteBorrow,
} from "@/api/borrow";
import { getBooks } from "@/api/book";
import { getMember } from "@/api/member";

// Refs
const borrowings = ref([]);
const books = ref([]);
const members = ref([]);
const showForm = ref(false);
const isEdit = ref(false);
const editId = ref(null);

const form = ref({
  book_id: "",
  member_id: "",
  borrow_date: "",
  return_date: "",
});

const notification = ref({
  show: false,
  message: "",
  type: "success",
});

const showNotification = (message, type = "success") => {
  notification.value = { show: true, message, type };
  setTimeout(() => {
    notification.value.show = false;
  }, 3000);
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const openCreateForm = () => {
  resetForm();
  showForm.value = true;
};

const openEditForm = (item) => {
  form.value = {
    book_id: item.book_id,
    member_id: item.member_id,
    borrow_date: item.borrow_date,
    return_date: item.return_date,
  };
  editId.value = item.id;
  isEdit.value = true;
  showForm.value = true;
};

const resetForm = () => {
  form.value = {
    book_id: "",
    member_id: "",
    borrow_date: "",
    return_date: "",
  };
  isEdit.value = false;
  editId.value = null;
  showForm.value = false;
};

const fetchAll = async () => {
  try {
    const borrowRes = await getBorrow();
    borrowings.value = borrowRes.data.data || borrowRes.data || [];

    const booksRes = await getBooks();
    books.value = Array.isArray(booksRes.data.Data) ? booksRes.data.Data : [];

    const membersRes = await getMember();
    members.value = membersRes.data.data || membersRes.data || [];
  } catch (err) {
    console.error("Failed to fetch data", err);
    showNotification("Failed to fetch data", "error");
  }
};

const createBorrowing = async () => {
  if (
    !form.value.book_id ||
    !form.value.member_id ||
    !form.value.borrow_date ||
    !form.value.return_date
  ) {
    showNotification("Please fill all required fields", "error");
    return;
  }

  try {
    await createBorrow({ ...form.value });
    showNotification("Borrowing created successfully!", "success");
    resetForm();
    await fetchAll();
  } catch (err) {
    console.error("Create failed", err);
    showNotification("Failed to create borrowing", "error");
  }
};

const updateBorrowing = async () => {
  if (!editId.value) return;

  try {
    await updateBorrow(editId.value, { ...form.value });
    showNotification("Borrowing updated!", "success");
    resetForm();
    await fetchAll();
  } catch (err) {
    console.error("Update failed", err);
    showNotification("Failed to update borrowing", "error");
  }
};

const handleDeleteBorrow = async (id) => {
  if (!confirm("Are you sure you want to delete this?")) return;

  try {
    await deleteBorrow(id);
    showNotification("Deleted successfully", "success");
    await fetchAll();
  } catch (err) {
    console.error("Delete failed", err);
    showNotification("Failed to delete", "error");
  }
};

onMounted(fetchAll);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
