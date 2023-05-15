import { Slot, component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
        <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div class="relative py-3 sm:max-w-xl sm:mx-auto">
                <div
                    class="absolute inset-0 bg-gradient-to-r from-red-300 to-blue-300 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div class="max-w-md mx-auto">
                        <div>
                            <h1 class="text-black text-2xl font-semibold">Login Form</h1>
                        </div>
                        <div class="divide-y divide-gray-200">
                            <Slot />
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
})