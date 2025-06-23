<template>
  <div class="borrow min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 py-12 px-6 relative overflow-hidden">
    <!-- Decorative floating shapes -->
    <div class="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full opacity-30 blur-3xl -z-10 animate-pulse"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full opacity-20 blur-3xl -z-10 animate-ping"></div>

    <!-- Title -->
    <h1 class="text-4xl text-center font-extrabold text-blue-900 drop-shadow mb-12">
      📘 Borrowing Information
    </h1>

    <!-- Info Card -->
    <div class="max-w-3xl mx-auto bg-white/60 backdrop-blur-md border border-white/30 shadow-2xl rounded-3xl p-8 text-blue-900">
      <h2 class="text-2xl font-semibold mb-6 flex items-center gap-2">
        <span class="text-3xl">📖</span> Borrowing Rules & Services
      </h2>

      <ul class="space-y-5 text-base leading-relaxed">
        <li class="flex items-start gap-3">
          <span class="text-xl">🔢</span>
          <span><strong>Borrowing Limit:</strong> You can borrow up to <span class="text-purple-700 font-semibold">5 books</span> at once.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-xl">⏳</span>
          <span><strong>Loan Period:</strong> Books are loaned for <span class="text-purple-700 font-semibold">14 days</span> and can be renewed once.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-xl">💰</span>
          <span><strong>Late Fees:</strong> $0.25 per day after the due date.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-xl">🕒</span>
          <span><strong>Opening Hours:</strong> Monday–Friday, <span class="text-purple-700 font-semibold">8:00 AM – 6:00 PM</span></span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-xl">🪪</span>
          <span><strong>Membership:</strong> Required. Sign up at the front desk or <span class="underline text-blue-600 cursor-pointer hover:text-blue-800">online</span>.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-xl">📧</span>
          <span><strong>Contact:</strong> <a href="mailto:library@example.com" class="text-blue-600 hover:underline">library@example.com</a> | (012) 345-678</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-xl">📍</span>
          <span><strong>Location:</strong> 123 Library Street, Phnom Penh</span>
        </li>
      </ul>

      <div class="mt-8 text-sm text-gray-700 italic text-center">
        Need help? Ask our librarian or visit the help desk. We're here for you!
      </div>
    </div>
  </div>
</template>
