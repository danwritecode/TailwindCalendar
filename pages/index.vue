<template>
  <div class="mx-auto p-4">
    <div class="mx-auto">
      <div class="bg-white shadow rounded-lg">
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
                  <h3 v-if="currentCalendarLayout !== 'Day'" class="text-xl leading-6 font-medium text-gray-900">
                    {{ monthString }} {{ year }}
                  </h3>
                  <h3 v-else class="text-xl leading-6 font-medium text-gray-900">
                    {{ monthString }} {{ currentDayOfMonth }}, {{ year }}
                  </h3>
                </div>
              </div>
            </div>
            <div class="ml-4 mt-4 flex-shrink-0 flex items-center">
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
                  <div v-if="showCalendarTypeDropdown" class="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg z-10">
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
              <div class="ml-6">
                <span class="inline-flex rounded-full shadow-sm">
                  <button type="button" class="inline-flex items-center px-2.5 py-2.5 border border-transparent text-xs leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray active:bg-gray-700 transition ease-in-out duration-150">
                    <svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <transition name="fade" mode="out-in">
            <div :key="currentCalendarLayout" v-if="currentCalendarLayout === 'Month'" class="grid grid-cols-7 gap-0">
              <div :key="weekday" v-for="weekday in weekdaysAbv" class="p-0.5 flex justify-center">
                <p class="text-xs uppercase font-semibold text-gray-500">{{ weekday }}</p>
              </div>
              <div :key="n" v-for="n in 42" :class="determineBorder(n)" class="relative p-2 w-full border-gray-200" style="height: 10.8rem;" @mouseover="currentHoveringDay = n" @mouseleave="currentHoveringDay = 0">
                <transition name="fade" mode="out-in">
                  <div v-if="currentHoveringDay === n && (n - firstDayOfMonth) + 1 > 0 && (n - firstDayOfMonth) + 1 <= daysInMonth" class="relative w-4">
                    <div class="absolute">
                      <span class="inline-flex rounded-full shadow-sm">
                        <button @click="showQuickAddDropDown = !showQuickAddDropDown" type="button" class="inline-flex items-center px-0.5 py-0.5 border border-transparent text-xs leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray active:bg-gray-700 transition ease-in-out duration-150">
                          <svg class="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
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
                      <div v-if="showQuickAddDropDown" class="mt-7 origin-top-right absolute left-0 w-56 rounded-md shadow-lg bg-white z-10">
                        <div class="rounded-md bg-white shadow-xs">
                          <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <a href="#" class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">Account settings</a>
                            <a href="#" class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">Support</a>
                            <a href="#" class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">License</a>
                            <form method="POST" action="#">
                              <button type="submit" class="block w-full text-left px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">
                                Sign out
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </transition>
                  </div>
                </transition>
                <div class="text-center">
                  <div>
                    <span v-if="(n - firstDayOfMonth) + 1 > 0 && (n - firstDayOfMonth) + 1 <= daysInMonth && !highlightCurrentDay((n - firstDayOfMonth) + 1)">
                      <button @click="setCurrentDay((n - firstDayOfMonth) + 1)" class="px-3 py-0.5 rounded-full text-sm font-semibold leading-5 bg-white hover:bg-gray-200 transition ease-in-out duration-300 focus:outline-none">
                        {{ (n - firstDayOfMonth) + 1 }}
                      </button>
                    </span>
                    <span v-if="highlightCurrentDay((n - firstDayOfMonth) + 1)" class="inline-flex items-center">
                      <button @click="setCurrentDay((n - firstDayOfMonth) + 1)" class="px-3 py-0.5 rounded-full text-sm font-semibold leading-5 text-white bg-gray-700 hover:bg-gray-300 transition ease-in-out duration-300 focus:outline-none">
                        {{ (n - firstDayOfMonth) + 1 }}
                      </button>
                    </span>
                  </div>
                </div>
                <div class="mt-1.5">
                  <ul class="grid grid-cols-1">
                    <li :key="event.Title" v-for="event in mappedEvents((n - firstDayOfMonth) + 1, true)" class="mb-1.5 col-span-1 flex shadow-sm rounded-md">
                      <div :class="determineEventColorClass(event.Type)" class="flex-shrink-0 flex items-center justify-center w-5 text-white text-sm leading-3 font-medium rounded-l-md">
                        {{ event.Type[0] }}
                      </div>
                      <div class="pl-1 flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                        <div class="flex-1 text-sm leading-3 truncate">
                          <a href="#" class="text-xs text-gray-900 font-medium hover:text-gray-600 transition ease-in-out duration-150">{{ event.Title }}</a>
                          <p class="text-xs text-gray-500">{{ event.Time }}</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div v-if="numOfEventsByDay((n - firstDayOfMonth) + 1) > 3" class="mt-1">
                  <button @click="setCurrentDay((n - firstDayOfMonth) + 1)" type="button" class="w-full px-2.5 py-1 border border-transparent text-xs leading-4 font-medium rounded text-gray-700 bg-gray-100 hover:bg-gray-50 focus:outline-none focus:border-gray-300 focus:shadow-outline-gray active:bg-gray-200 transition ease-in-out duration-150">
                    View All ({{ numOfEventsByDay((n - firstDayOfMonth) + 1) }})
                  </button>
                </div>
              </div>
            </div>

            <div :key="currentCalendarLayout" v-if="currentCalendarLayout === 'Week'" class="grid grid-cols-7 gap-0">
              <div :key="weekday" v-for="(weekday, index) in weekdaysAbv" class="flex justify-center">
                <span v-if="index !== currentDayOfWeek" class="p-1 text-xs uppercase font-semibold text-gray-500">{{ weekday }}</span>
                <span v-if="index === currentDayOfWeek" class="p-1 text-xs uppercase font-semibold text-white bg-gray-600 w-full text-center">{{ weekday }}</span>
              </div>
              <div :key="n" v-for="n in 7" :class="determineBorder(n)" class="p-2 h-screen w-full border-gray-200">
                <span>{{ (n + currentDayOfMonth) - currentDayOfWeek - 1 }}</span>
                <div class="mt-1.5">
                  <ul class="grid grid-cols-1">
                    <li :key="event.Title" v-for="event in mappedEvents((n + currentDayOfMonth) - currentDayOfWeek - 1, false )" class="mb-1.5 col-span-1 flex shadow-sm rounded-md">
                      <div :class="determineEventColorClass(event.Type)" class="flex-shrink-0 flex items-center justify-center w-5 text-white text-sm leading-3 font-medium rounded-l-md">
                        {{ event.Type[0] }}
                      </div>
                      <div class="pl-1 flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                        <div class="flex-1 text-sm leading-5 truncate">
                          <a href="#" class="text-xs text-gray-900 font-medium hover:text-gray-600 transition ease-in-out duration-150">{{ event.Title }}</a>
                          <p class="text-xs text-gray-500">{{ event.Time }}</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div :key="currentCalendarLayout" v-if="currentCalendarLayout === 'Day'" class="p-4">
              <div>
                <ul class="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2">
                  <li class="col-span-1 flex shadow-sm rounded-md" :key="event.Title" v-for="event in eventsForCurrentDay">
                    <div :class="determineEventColorClass(event.Type)" class="flex-shrink-0 flex items-center justify-center w-16 text-white text-xs leading-5 font-semibold rounded-l-md">
                      {{ event.Type }}
                    </div>
                    <div class="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                      <div class="flex-1 px-4 py-2 text-sm leading-5 truncate">
                        <a href="#" class="text-gray-900 font-medium hover:text-gray-600 transition ease-in-out duration-150">{{ event.Title }}</a>
                        <p class="text-gray-500">{{ event.Time }}</p>
                      </div>
                      <div class="flex-shrink-0 pr-2">
                        <button class="w-8 h-8 inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition ease-in-out duration-150">
                          <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </transition>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      currentDayOfMonth: new Date().getDate(),
      currentDayOfWeek: new Date().getDay(),
      months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
      weekdaysAbv: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
      showCalendarTypeDropdown: false,
      showQuickAddDropDown: false,
      currentCalendarLayout: 'Month',
      
      calendarData: [
        {'Type': 'Meeting', 'Title': 'Get coffee with Dave', 'DateTime':'September 20, 2020 12:00:00', 'Year': 2020, 'Month': 9, 'Day':10, 'Time': '12:00:00'},
        {'Type': 'Workout', 'Title': 'Go for a bike ride', 'DateTime':'September 20, 2020 14:00:00', 'Year': 2020, 'Month': 9, 'Day':10, 'Time': '14:00:00'},
        {'Type': 'Meeting', 'Title': 'Get coffee with Jane', 'DateTime':'September 20, 2020 12:00:00', 'Year': 2020, 'Month': 9, 'Day':20, 'Time': '12:00:00'},
        {'Type': 'Workout', 'Title': 'Go for a bike ride', 'DateTime':'September 20, 2020 14:00:00', 'Year': 2020, 'Month': 9, 'Day':20, 'Time': '14:00:00'},
        {'Type': 'Meeting', 'Title': 'Catch up with John', 'DateTime':'September 20, 2020 12:00:00', 'Year': 2020, 'Month': 9, 'Day':20, 'Time': '16:00:00'},
        {'Type': 'Event', 'Title': 'Drinks for fundraiser', 'DateTime':'September 20, 2020 14:00:00', 'Year': 2020, 'Month': 9, 'Day':20, 'Time': '17:00:00'},
        {'Type': 'Event', 'Title': 'Golf with Clients', 'DateTime':'September 20, 2020 14:00:00', 'Year': 2020, 'Month': 9, 'Day':20, 'Time': '17:00:00'}
      ],

      currentHoveringDay: 0
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
    },
    currentWeek: function() {
      return Math.floor(this.currentDayOfMonth/7)
    },
    currentDate: function() {
      const currentTimeStamp = new Date()
      const dayOfMonth = currentTimeStamp.getDate()

      return new Date(new Date().getFullYear(), new Date().getMonth(), dayOfMonth)
    },
    currentlySelectedDate: function() {
      return new Date(this.year,this.month -1, this.currentDayOfMonth)
    },
    eventsForCurrentDay: function() {
      return this.calendarData.filter(item => new Date(item.Year, item.Month - 1, item.Day).getTime() === this.currentlySelectedDate.getTime())
    }
  },
  watch: {
    currentHoveringDay: function() {
      if(this.currentHoveringDay === 0) {
        this.showQuickAddDropDown = false
      }
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
    },
    setCurrentDay(day) {
      const dateSelected = new Date(this.year, this.month -1, day)
      this.currentDayOfMonth = day
      this.currentDayOfWeek = dateSelected.getDay()
      this.currentCalendarLayout = 'Day'
    },
    highlightCurrentDay(day){
      const date = new Date(this.year, this.month -1, day)
      return(date.getTime() === this.currentDate.getTime() ? true:false)
    },
    mappedEvents(day, limitArrayLength) {
      const date = new Date(this.year, this.month -1, day)

      if(limitArrayLength) {
        return this.calendarData.filter(item => new Date(item.Year, item.Month - 1, item.Day).getTime() === date.getTime()).slice(0, 3)
      } else {
        return this.calendarData.filter(item => new Date(item.Year, item.Month - 1, item.Day).getTime() === date.getTime())
      }
    },
    numOfEventsByDay(day) {
      const date = new Date(this.year, this.month -1, day)
      return this.calendarData.filter(item => new Date(item.Year, item.Month - 1, item.Day).getTime() === date.getTime()).length
    },
    determineEventColorClass(eventType) {
      const calendarEventColorMapping = [{'Type':'Meeting', 'Class':'bg-pink-600'}, {'Type':'Workout','Class':'bg-orange-500'}, {'Type':'Event','Class':'bg-green-400'}]
      return(calendarEventColorMapping.find(type => type.Type === eventType).Class)
    }
  }
}
</script>

<style>
.fade-enter-active {
  transition-duration: 0.6s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-leave-active {
  transition-duration: 0.15s;
  transition-property: opacity;
  transition-timing-function: ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>