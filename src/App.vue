<template>
  <div class="flex h-screen overflow-hidden bg-gray-50">
    <!-- Sidebar -->
    <aside
      :class="[
        'fixed md:static z-10 w-64 shadow-lg border-r bg-white flex flex-col',
        'transition-transform duration-300 ease-in-out',
        'h-screen',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      ]"
    >
      <NavbarView />

      <!-- Sidebar Header -->
      <div class="border-b px-6 py-4 bg-white flex-shrink-0">
        <div class="flex items-center gap-3">
          <div
            class="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div>
            <h2 class="text-lg font-semibold text-gray-900">Library System</h2>
            <p class="text-xs text-gray-500">Management Portal</p>
          </div>
        </div>
      </div>

      <!-- Sidebar Navigation (Just Below Header) -->
      <div class="flex-1 overflow-y-auto py-4">
        <nav class="px-4 space-y-2">
          <RouterLink
            to="/"
            class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium group"
            :class="navClass('/')"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Dashboard
          </RouterLink>

          <RouterLink
            to="/book"
            class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium group"
            :class="navClass('/book')"
          >
            📘 Books
          </RouterLink>

          <RouterLink
            to="/borrow"
            class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium group"
            :class="navClass('/borrow')"
          >
            📦 Borrow
          </RouterLink>

          <RouterLink
            to="/category"
            class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium group"
            :class="navClass('/category')"
          >
            🗂 Categories
          </RouterLink>

          <RouterLink
            to="/member"
            class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium group"
            :class="navClass('/member')"
          >
            🧑‍🤝‍🧑 Members
          </RouterLink>
        </nav>
      </div>
    </aside>

    <!-- Mobile Menu Toggle -->
    <div class="md:hidden fixed top-4 left-4 z-20">
      <button
        @click="sidebarOpen = !sidebarOpen"
        class="p-2 rounded-lg bg-white shadow-md border border-gray-200 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>

    <!-- Overlay on mobile -->
    <div
      v-if="sidebarOpen"
      @click="sidebarOpen = false"
      class="fixed inset-0 z-5 bg-black bg-opacity-50 md:hidden"
    ></div>

    <!-- Main content area -->
    <NavbarView />
    <div class="flex-1 flex flex-col h-screen overflow-hidden">
      <!-- Top Navbar (Optional) -->

      <!-- Scrollable content -->
      <main class="flex-1 overflow-y-auto p-6 pt-16">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import NavbarView from "./views/NavbarView.vue";

const sidebarOpen = ref(false);
const route = useRoute();

// Dynamic class helper for active/inactive nav links
const navClass = (path) =>
  route.path === path
    ? "bg-blue-50 text-blue-700 border-r-4 border-blue-700 shadow-sm"
    : "text-gray-700 hover:bg-blue-50 hover:text-blue-700";
</script>

<style scoped>
/* Scrollbar style (optional) */
main::-webkit-scrollbar {
  width: 6px;
}
main::-webkit-scrollbar-track {
  background: #f1f1f1;
}
main::-webkit-scrollbar-thumb {
  background-color: #cbd5e0;
  border-radius: 10px;
}
</style>
