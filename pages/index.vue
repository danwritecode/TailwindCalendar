<template>
  <div class="mx-auto p-4 sm:p-6 lg:p-8">
    <div class="mx-auto">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="bg-white px-4 py-5 border-b rounded-t-lg border-gray-200 sm:px-6">
          <div class="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-no-wrap">
            <div class="ml-4 mt-4">
              <div class="flex items-center">
                <div class="flex items-center">
                  <div class="mr-2 flex items-center">
                    <button @click="decrementMonth()" type="button" class="p-1 rounded-full bg-white hover:bg-gray-100 transition ease-in-out duration-300 focus:outline-none">
                      <svg class="h-5 w-5 text-gray-900 hover:text-gray-600 transition ease-in-out duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button @click="incrementMonth()" type="button" class="ml-1 p-1 rounded-full bg-white hover:bg-gray-100 transition ease-in-out duration-300 focus:outline-none">
                      <svg class="h-5 w-5 text-gray-900 hover:text-gray-600 transition ease-in-out duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  <h3 class="text-xl leading-6 font-medium text-gray-900">
                    {{ monthString }} {{ year }}
                  </h3>
                </div>
              </div>
            </div>
            <div class="ml-4 mt-4 flex-shrink-0 flex">
              <div class="relative inline-block text-left">
                <div>
                  <span class="rounded-md shadow-sm">
                    <button @click="showCalendarTypeDropdown = !showCalendarTypeDropdown" type="button" class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150" id="options-menu" aria-haspopup="true" aria-expanded="true">
                      {{ currentCalendarLayout }}
                      <svg class="-mr-1 ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </span>
                </div>

                <transition       
                    enter-active-class="transition ease-out duration-100"
                    enter-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                >
                  <div v-if="showCalendarTypeDropdown" class="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg">
                    <div class="rounded-md bg-white shadow-xs">
                      <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <button @click="currentCalendarLayout = 'Month', showCalendarTypeDropdown = false" type="button" class="block w-full text-left px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">Month</button>
                        <button @click="currentCalendarLayout = 'Week', showCalendarTypeDropdown = false" type="button" class="block w-full text-left px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">Week</button>
                        <button @click="currentCalendarLayout = 'Day', showCalendarTypeDropdown = false" type="button" class="block w-full text-left px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">Day</button>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="grid grid-cols-7 gap-0">
            <div :key="weekday" v-for="weekday in weekdaysAbv" class="p-0.5 flex justify-center">
              <p class="text-xs uppercase font-semibold text-gray-500">{{ weekday }}</p>
            </div>
            <div :key="n" v-for="n in 42" :class="determineBorder(n)" class="p-2 h-24 w-full border-gray-200">
              <span v-if="(n - (firstDayOfMonth)) + 1 > 0 && (n - (firstDayOfMonth)) + 1 <= daysInMonth">{{ (n - (firstDayOfMonth)) + 1 }}</span>
              <!-- <p>{{ n }}</p> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      month: 1,
      year: 2020,
      months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
      weekdaysAbv: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
      showCalendarTypeDropdown: false,
      currentCalendarLayout: 'Month'
    }
  },
  computed: {
    firstDayOfMonth: function() {
      return new Date(this.year, this.month-1, 1).getDay() + 1
    },
    daysInMonth: function() {
      return new Date(this.year, this.month, 0).getDate()
    },
    monthString: function() {
      return this.months[this.month - 1]
    }
  },
  methods: {
    determineBorder(day) {
      const borderLeftDays = [1,8,15,22,29,36]

      if(borderLeftDays.indexOf(day) !== -1) {
        return('border-l-0 border-t')
      } else {
        return('border-l border-t')
      }
    },
    incrementMonth() {
      if(this.month !== 12) {
        this.month += 1
      } else {
        this.month = 1
        this.year += 1
      }
    },
    decrementMonth() {
      if(this.month !== 1) {
        this.month += -1
      } else {
        this.month = 12
        this.year += -1
      }
    }
  }
}
</script>

<style>

</style>