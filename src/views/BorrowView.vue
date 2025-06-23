<template>
  <div class="borrow bg-blue-50 min-h-screen py-10 px-6">
    <h1 class="text-3xl text-center text-blue-800 font-bold mb-6">Welcome to the Borrow Page</h1>

    <!-- Library Information Section -->
    <div class="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 text-left text-blue-900">
      <h2 class="text-2xl font-semibold mb-4">📚 Library Borrowing Information</h2>

      <ul class="list-disc pl-6 space-y-3">
        <li><strong>Borrowing Limit:</strong> You can borrow up to 5 books at a time.</li>
        <li><strong>Loan Period:</strong> Books can be borrowed for 14 days and renewed once.</li>
        <li><strong>Late Fees:</strong> $0.25 per day after due date.</li>
        <li><strong>Opening Hours:</strong> Monday - Friday, 8:00 AM to 6:00 PM</li>
        <li><strong>Membership Required:</strong> Yes. Please sign up at the front desk or online.</li>
        <li><strong>Contact:</strong> library@example.com | (012) 345-678</li>
        <li><strong>Location:</strong> 123 Library Street, Phnom Penh</li>
      </ul>

      <div class="mt-6">
        <p class="text-sm text-gray-600">Need help? Ask our librarian or visit the help desk.</p>
      </div>
    </div>
  </div>
</template>



<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
