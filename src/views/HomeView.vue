<script setup>
import { ref, onMounted, computed } from "vue";
import { getBorrow } from "@/api/borrow";
import { getBooks } from "@/api/book";
import { getMember } from "@/api/member";
import { getCategory } from "@/api/category";

// Reactive refs for counts
const totalBorrow = ref(0);
const totalBooks = ref(0);
const totalMembers = ref(0);
const totalCategories = ref(0);

// Fetch borrow count
const fetchBorrowCount = async () => {
  try {
    const response = await getBorrow();
    totalBorrow.value = response.data.data?.length || response.data.length || 0;
  } catch (error) {
    console.error("Failed to fetch borrow data", error);
    totalBorrow.value = 0;
  }
};

// Fetch book count
const fetchBookCount = async () => {
  try {
    const response = await getBooks();
    totalBooks.value = response.data.Data?.length || response.data.data?.length || response.data.length || 0;
  } catch (error) {
    console.error("Failed to fetch book data", error);
    totalBooks.value = 0;
  }
};

// Fetch member count
const fetchMemberCount = async () => {
  try {
    const response = await getMember();
    totalMembers.value = response.data.data?.length || response.data.length || 0;
  } catch (error) {
    console.error("Failed to fetch member data", error);
    totalMembers.value = 0;
  }
};

// Fetch category count
const fetchCategoryCount = async () => {
  try {
    const response = await getCategory();
    totalCategories.value = response.data.Data?.length || response.data.data?.length || response.data.length || 0;
  } catch (error) {
    console.error("Failed to fetch category data", error);
    totalCategories.value = 0;
  }
};

// On mounted, fetch all counts
onMounted(() => {
  fetchBorrowCount();
  fetchBookCount();
  fetchMemberCount();
  fetchCategoryCount();
});

// Pie chart data
const dataItems = computed(() => [
  { label: "Books", value: totalBooks.value, color: "#3b82f6" },       // Blue
  { label: "Borrowed", value: totalBorrow.value, color: "#facc15" },   // Yellow
  { label: "Members", value: totalMembers.value, color: "#22c55e" },   // Green
  { label: "Categories", value: totalCategories.value, color: "#ef4444" }, // Red
]);

// Calculate total for percentages
const totalValue = computed(() => dataItems.value.reduce((sum, item) => sum + item.value, 0));

const circumference = 2 * Math.PI * 50; // radius=50

// Calculate each slice's start offset and length
const slices = computed(() => {
  let cumulative = 0;
  return dataItems.value.map(item => {
    const percent = totalValue.value === 0 ? 0 : item.value / totalValue.value;
    const length = percent * circumference;
    const offset = cumulative;
    cumulative += length;
    return { ...item, percent, length, offset };
  });
});
</script>

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
        <h2 class="text-sm text-gray-500">Books</h2>
        <p class="text-2xl font-bold text-blue-600">{{ totalBooks }}</p>
      </div>
      <div class="bg-white rounded-xl shadow p-4">
        <h2 class="text-sm text-gray-500">Borrowed</h2>
        <p class="text-2xl font-bold text-yellow-600">{{ totalBorrow }}</p>
      </div>
      <div class="bg-white rounded-xl shadow p-4">
        <h2 class="text-sm text-gray-500">Members</h2>
        <p class="text-2xl font-bold text-green-600">{{ totalMembers }}</p>
      </div>
      <div class="bg-white rounded-xl shadow p-4">
        <h2 class="text-sm text-gray-500">Categories</h2>
        <p class="text-2xl font-bold text-red-600">{{ totalCategories }}</p>
      </div>
    </div>

    <!-- Pie Chart aligned left -->
    <div
      class="mt-8 bg-white rounded-xl shadow p-6 max-w-md w-full flex flex-col items-start"
    >
      <h2 class="text-lg font-semibold text-gray-800 mb-4">📊 Data Overview</h2>

      <svg width="120" height="120" viewBox="0 0 120 120" class="mb-4">
        <!-- Background circle -->
        <circle
          r="50"
          cx="60"
          cy="60"
          fill="transparent"
          stroke="#e5e7eb"
          stroke-width="20"
        />
        <!-- Pie slices -->
        <template v-for="slice in slices" :key="slice.label">
          <circle
            r="50"
            cx="60"
            cy="60"
            fill="transparent"
            :stroke="slice.color"
            stroke-width="20"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="slice.offset"
            stroke-linecap="butt"
            transform="rotate(-90 60 60)"
          />
        </template>
      </svg>

      <!-- Legend -->
      <div class="grid grid-cols-2 gap-4 w-full max-w-xs">
        <template v-for="item in dataItems" :key="item.label">
          <div class="flex items-center space-x-2 w-full">
            <div
              class="w-5 h-5 rounded"
              :style="{ backgroundColor: item.color }"
            ></div>
            <span class="text-gray-700 font-medium">{{ item.label }}</span>
            <span class="ml-auto font-semibold">{{ item.value }}</span>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>
