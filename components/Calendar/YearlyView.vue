<template>
  <div class="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-0 md:gap-4">
    <div :key="year" v-for="year in 15" class="mb-2 w-full pb-8">
      <h3 class="leading-5 font-medium text-xl text-gray-800 border-b border-gray-200 pb-1">{{ startYear + (year-1) }} </h3>
      <div class="mt-3 grid grid-cols-3 gap-1.5">
        <button type="button" :key="month" v-for="month in 12" class="w-full text-gray-600 hover:text-black hover:font-medium hover:bg-gray-100 rounded-md transition ease-in-out duration-150" style="height:6.5rem;">
          <h6 class="text-left px-1 leading-5 text-xs font-medium">{{ months[month-1] }}</h6>
          <div class="-mt-2 grid grid-cols-7" style="grid-gap: 0.10rem; gap: 0.10rem;">
            <div :key="day" v-for="day in 37" class="text-center h-3">
              <span :class="highlightCurrentDay((day - firstDayOfMonth(startYear + (year-1), month)) + 1, month, startYear + (year-1)) ? 'text-red-500 font-black border border-red-500 rounded-full p-0.5':'text-black'" class="leading-none" style="font-size:0.51rem" v-if="((day - firstDayOfMonth(startYear + (year-1), month)) + 1) > 0 && ((day - firstDayOfMonth(startYear + (year-1), month)) + 1) <= daysInMonth(startYear + (year-1), month)">
                {{ (day - firstDayOfMonth(startYear + (year-1), month)) + 1 }}
              </span>
            </div>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['startMonth', 'startYear'],
  data() {
    return {
      months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    };
  },
  computed: {
    currentDate: function() {
      const currentTimeStamp = new Date()
      const dayOfMonth = currentTimeStamp.getDate()

      return new Date(new Date().getFullYear(), new Date().getMonth(), dayOfMonth)
    },
  },
  methods: {
    daysInMonth(year, month) {
      return new Date(year, month, 0).getDate()
    },
    firstDayOfMonth(year, month) {
      return new Date(year, month-1, 1).getDay() + 1
    },
    highlightCurrentDay(day, month, year){
      const date = new Date(year, month-1, day)
      return(date.getTime() === this.currentDate.getTime() ? true:false)
    }
  }
};
</script>

<style>
</style>