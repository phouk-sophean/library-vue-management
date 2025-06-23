<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <!-- Navbar -->
    <header class="bg-white shadow-md fixed top-0 w-full z-20 h-16">
      <div class="flex justify-between items-center h-full px-4 sm:px-6 lg:px-8">
        <div class="text-xl font-bold text-blue-600">Library System</div>

        <!-- Sidebar Toggle Button (Mobile) -->
        <div class="md:hidden">
          <button @click="toggleSidebar" class="text-blue-700 focus:outline-none">
            <svg v-if="!sidebarOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Layout -->
    <div class="flex flex-1 pt-16 overflow-hidden">
      <!-- Sidebar -->
      <aside
        :class="[
          'w-64 p-4 space-y-4 shadow-md fixed md:static z-10 transition-transform duration-300 ease-in-out',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
          'bg-blue-900 text-white'
        ]"
        class="h-[calc(100vh-4rem)] overflow-hidden"
      >
        <nav class="flex flex-col space-y-4 font-medium">
          <RouterLink to="/" class="hover:text-yellow-300">🏠 Home</RouterLink>
          <RouterLink to="/borrow" class="hover:text-yellow-300">📚 Borrow</RouterLink>
          <RouterLink to="/book" class="hover:text-yellow-300">📖 Book</RouterLink>
          <RouterLink to="/category" class="hover:text-yellow-300">📂 Category</RouterLink>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-4 md:ml-90 bg-blue-50 overflow-y-auto h-[calc(100vh-4rem)] rounded-tl-xl">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const sidebarOpen = ref(false)
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}
</script>
