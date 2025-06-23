<template>
  <header class="bg-white shadow-sm border-b border-gray-200 fixed top-0 w-full z-30 h-16">
    <div class="flex justify-between items-center h-full px-4 sm:px-6 lg:px-8">
      <!-- Left section - Sidebar toggle and logo -->
      <div class="flex items-center gap-4">
        <!-- Sidebar Toggle Button -->
        <button 
          @click="$emit('toggle-sidebar')" 
          class="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all duration-200"
          aria-label="Toggle sidebar"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

        <!-- Enhanced Logo Section -->
        <div class="flex items-center gap-3">
          <!-- Logo Icon -->
          <div class="relative group">
            <div class="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div class="absolute inset-0 rounded-xl bg-blue-500 opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300"></div>
          </div>

          <!-- Logo Text -->
          <div class="hidden sm:block">
            <h1 class="text-xl font-bold text-gray-900 tracking-tight">
              {{ siteName }}
            </h1>
            <p class="text-xs text-gray-500 -mt-1">{{ siteTagline }}</p>
          </div>
        </div>

        <!-- Breadcrumb for desktop -->
        <div class="hidden lg:flex items-center text-sm text-gray-500 ml-4 pl-4 border-l border-gray-200">
          <span class="font-medium text-gray-900">{{ currentPageTitle }}</span>
          <svg class="w-4 h-4 mx-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <span>{{ currentSection }}</span>
        </div>
      </div>

      <!-- Center section - Search -->
      <div class="flex-1 max-w-lg mx-6">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search books, authors, members..."
            class="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            @focus="showSearchSuggestions = true"
            @blur="hideSearchSuggestions"
          />
          <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>

          <!-- Search Suggestions Dropdown -->
          <div 
            v-if="showSearchSuggestions && searchSuggestions.length > 0"
            class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto"
          >
            <div class="py-2">
              <div 
                v-for="suggestion in searchSuggestions" 
                :key="suggestion.id"
                class="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-3"
                @click="selectSuggestion(suggestion)"
              >
                <div class="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ suggestion.title }}</div>
                  <div class="text-xs text-gray-500">{{ suggestion.type }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right section - Notifications and User Menu -->
      <div class="flex items-center gap-4 relative">
        <!-- Notification Bell -->
        <div class="relative">
          <button
            @click="showNotifications = !showNotifications"
            class="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all duration-200"
            aria-label="Notifications"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 17h5l-5 5v-5zM11 19H6.5A2.5 2.5 0 014 16.5v-9A2.5 2.5 0 016.5 5h11A2.5 2.5 0 0120 7.5V11" />
            </svg>
            <span
              v-if="notificationCount > 0"
              class="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium animate-pulse"
            >
              {{ notificationCount }}
            </span>
          </button>

          <!-- Notifications Dropdown -->
          <div
            v-if="showNotifications"
            class="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-lg z-50"
          >
            <div class="p-4 border-b border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900">Notifications</h3>
            </div>
            <div class="max-h-64 overflow-y-auto">
              <div
                v-for="notification in notifications"
                :key="notification.id"
                class="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
              >
                <p class="text-sm font-medium text-gray-900">{{ notification.title }}</p>
                <p class="text-xs text-gray-500 mt-1">{{ notification.time }}</p>
              </div>
            </div>
            <div class="p-3 border-t border-gray-200 text-center">
              <button class="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All Notifications
              </button>
            </div>
          </div>
        </div>

        <!-- User Menu -->
        <div class="relative">
          <button
            @click="showUserMenu = !showUserMenu"
            class="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all duration-200"
            aria-haspopup="true"
            :aria-expanded="showUserMenu"
          >
            <div
              class="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm shadow-md"
            >
              {{ userInitials }}
            </div>
            <div class="hidden sm:block text-left">
              <div class="text-sm font-medium text-gray-900">{{ userName }}</div>
              <div class="text-xs text-gray-500">{{ userRole }}</div>
            </div>
            <svg
              class="w-4 h-4 text-gray-400 transition-transform duration-200"
              :class="{ 'rotate-180': showUserMenu }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          <!-- User Dropdown Menu -->
          <div
            v-if="showUserMenu"
            class="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50"
          >
            <div class="p-4 border-b border-gray-200 flex items-center gap-3">
              <div
                class="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-lg"
              >
                {{ userInitials }}
              </div>
              <div>
                <div class="text-sm font-medium text-gray-900">{{ userName }}</div>
                <div class="text-xs text-gray-500">{{ userEmail }}</div>
              </div>
            </div>
            <div class="py-2">
              <a
                href="#"
                class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Profile Settings
              </a>
              <a
                href="#"
                class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Preferences
              </a>
              <div class="border-t border-gray-200 my-2"></div>
              <a
                href="#"
                class="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                Sign Out
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  </header>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'

// Site info
const siteName = ref('LibraryHub')
const siteTagline = ref('Digital Library System')
const currentPageTitle = ref('Dashboard')
const currentSection = ref('Overview')

// Search
const searchQuery = ref('')
const showSearchSuggestions = ref(false)
const searchSuggestions = ref([
  { id: 1, title: '1984', type: 'Book' },
  { id: 2, title: 'George Orwell', type: 'Author' },
  { id: 3, title: 'Alice Johnson', type: 'Member' }
])
function selectSuggestion(suggestion) {
  searchQuery.value = suggestion.title
  showSearchSuggestions.value = false
}
function hideSearchSuggestions() {
  // Delay hiding to allow click event to register
  setTimeout(() => {
    showSearchSuggestions.value = false
  }, 150)
}

// Notifications and user menu state
const showNotifications = ref(false)
const showUserMenu = ref(false)
const notificationCount = ref(3)

const notifications = ref([
  { id: 1, title: 'Book "1984" is overdue', time: '2 hours ago' },
  { id: 2, title: 'New member registration', time: '4 hours ago' },
  { id: 3, title: 'System maintenance scheduled', time: '1 day ago' }
])

// User info (example)
const userName = ref('John Doe')
const userEmail = ref('john.doe@library.com')
const userRole = ref('Librarian')
const userInitials = computed(() => {
  return userName.value
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
})

// Close dropdowns when clicking outside
function onClickOutside(event) {
  const notificationsEl = document.getElementById('notifications-dropdown')
  const userMenuEl = document.getElementById('user-menu-dropdown')

  // We'll use refs inside template to manage this instead
  if (
    !event.target.closest('.notification-wrapper') &&
    !event.target.closest('.notification-button')
  ) {
    showNotifications.value = false
  }
  if (
    !event.target.closest('.user-menu-wrapper') &&
    !event.target.closest('.user-menu-button')
  ) {
    showUserMenu.value = false
  }
}

// Use a simpler approach: add global click handler and check refs
// or use Vue directives like v-click-outside in real app

// To keep this simple and focused, skip auto closing for now

</script>

<style scoped>
/* Custom logo animations */
.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}

/* Logo text gradient effect (optional) */
.logo-gradient {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
