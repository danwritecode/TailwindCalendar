<template>
  <div class="p-2">
    <div class="mb-2 w-full">
      <div class="mt-3">
        <div class="-mt-2 grid grid-cols-7 gap-4">
          <div :key="day" v-for="day in weekdaysAbv" class="text-center">
            <span class="text-xs text-gray-700 font-medium">{{ day }}</span>
          </div>
          <div :key="day" v-for="day in 37" class="text-center h-3">
            <span v-if="((day - firstDayOfMonth(startYear, startMonth)) + 1) > 0 && ((day - firstDayOfMonth(startYear, startMonth)) + 1) <= daysInMonth(startYear, startMonth) && !highlightCurrentDay((day - firstDayOfMonth(startYear, startMonth)) + 1)">
              <button @click="$emit('update:currentDayOfMonth', (day - firstDayOfMonth(startYear, startMonth)) + 1)" class="px-3 py-0.5 rounded-full text-sm font-medium text-gray-900 leading-none bg-white hover:bg-gray-200 transition ease-in-out duration-300 focus:outline-none">
                {{ (day - firstDayOfMonth(startYear, startMonth)) + 1 }}
              </button>
            </span>
            <span v-if="highlightCurrentDay((day - firstDayOfMonth(startYear, startMonth)) + 1)" class="inline-flex items-center">
              <button @click="$emit('update:currentDayOfMonth', (day - firstDayOfMonth(startYear, startMonth)) + 1)" class="px-3 py-0.5 rounded-full text-sm font-semibold leading-none text-white bg-gray-600 hover:bg-gray-500 transition ease-in-out duration-300 focus:outline-none">
                {{ (day - firstDayOfMonth(startYear, startMonth)) + 1 }}
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div @mouseover="showQuickAddButton = true" @mouseleave="showQuickAddDropDown = false, showQuickAddButton = false" class="relative">
      <transition name="fade" mode="out-in">
        <div v-if="showQuickAddButton" class="w-4">
          <div class="absolute right-0 mr-2 mt-1">
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
            <QuickAddEvent v-if="showQuickAddDropDown" :year="startYear" :month="startMonth" :currentlySelectedDate="currentlySelectedDate" :monthDay="currentDayOfMonth" :calendarIndex="currentDayOfMonth" :showQuickAddDropDown.sync="showQuickAddDropDown" :calendarViewingState="'Day'"/>
          </transition>
        </div>
      </transition>
      <div class="-mt-6 px-2 pt-10 pb-4">
        <ul v-if="events.length > 0" class="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2">
          <li class="col-span-1 flex shadow-sm rounded-md" :key="event.Title" v-for="event in events">
            <div :class="determineEventColorClass(event.Type)" class="flex-shrink-0 flex items-center justify-center w-16 text-white text-xs leading-5 font-semibold rounded-l-md">
              {{ event.Type }}
            </div>
            <div class="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
              <div class="flex-1 px-4 py-2 text-sm leading-5 truncate">
                <button @click="toggleSidePanel('ViewEvent', event.Event_Id)" class="text-gray-900 font-medium hover:text-gray-600 transition ease-in-out duration-150 focus:outline-none">{{ event.Title }}</button>
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
        <div v-else>
          <p class="text-center py-3 text-sm text-gray-300">Nothing scheduled</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import QuickAddEvent from '~/components/QuickAddEvent'

export default {
  props: ['startMonth', 'startYear', 'events', 'currentlySelectedDate', 'currentDayOfMonth', 'currentDate'],
  components: {
    QuickAddEvent
  },
  data() {
    return {
      months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      weekdaysAbv: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
      showQuickAddDropDown: false,
      showQuickAddButton: false,
    };
  },
  methods: {
    daysInMonth(year, month) {
      return new Date(year, month, 0).getDate()
    },
    determineEventColorClass(eventType) {
      const calendarEventColorMapping = [{'Type':'Meeting', 'Class':'bg-pink-600'}, {'Type':'Workout','Class':'bg-orange-500'}, {'Type':'Event','Class':'bg-green-400'}]
      return(calendarEventColorMapping.find(type => type.Type === eventType).Class)
    },
    firstDayOfMonth(year, month) {
      return new Date(year, month-1, 1).getDay() + 1
    },
    highlightCurrentDay(day){
      const date = new Date(this.startYear, this.startMonth -1, day)
      return(date.getTime() === this.currentlySelectedDate.getTime() ? true:false)
    },
    toggleSidePanel(panelType, entityId) {
      this.$store.dispatch('SidePanel/setSidePanelType', panelType)
      this.$store.dispatch('SidePanel/setSidePanelEntityId', entityId)
    },
  }
};
</script>

<style>
</style>