<template>
  <div :class="quickAddEvent_DropdownClass(calendarIndex)" class="mt-7 sm:origin-top-right absolute rounded-md shadow-lg bg-white z-10" style="width:18rem;">
    <div class="p-3 rounded-md bg-white shadow-xs">
      <div class="flex-1 flex flex-col justify-between">
        <div class="divide-y divide-gray-200">
          <div class="space-y-2">
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label for="project_name" class="block text-sm font-medium leading-5 text-gray-900">
                  Date
                </label>
                <div class="relative">
                  <h6 class="mt-1 text-gray-600 text-sm leading-5">{{ $moment(currentlySelectedDate).format('MM/DD/YYYY') }}</h6>
                </div>
              </div>
              <div>
                <label for="start_time" class="block text-sm font-medium leading-5 text-gray-900">
                  Time
                </label>
                <div class="relative flex flex-no-wrap">
                  <!-- <input v-model="eventAdd_FormValues.Hour" :class="!validHourInput ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red':'focus:border-blue-300'" class="bg-white text-sm focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg px-2 block w-9 appearance-none leading-normal transition ease-in-out duration-150">
                  <span class="block mx-1 font-black">:</span>
                  <input v-model="eventAdd_FormValues.Minute" :class="!validMinuteInput ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red':'focus:border-blue-300'" class="bg-white text-sm focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg px-2 block w-9 appearance-none leading-normal transition ease-in-out duration-150"> -->
                  <div class="px-2 py-1 bg-white text-sm focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg block appearance-none leading-normal transition ease-in-out duration-150">
                    <div class="flex">
                      <select v-model="eventAdd_FormValues.Hour" name="hours" class="text-sm bg-transparent appearance-none outline-none">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                      </select>
                      <span class="text-sm font-black mx-2">:</span>
                      <select v-model="eventAdd_FormValues.Minute" name="minutes" class="text-sm bg-transparent appearance-none outline-none">
                        <option value="0">00</option>
                        <option value="15">15</option>
                        <option value="30">30</option>
                        <option value="45">45</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="space-y-1">
              <label for="event_type" class="block text-sm font-medium leading-5 text-gray-900">
                Type
              </label>
              <div class="relative rounded-md shadow-sm">
                <select v-model="eventAdd_FormValues.Type" id="location" class="mt-1 form-select block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5">
                  <option>Meeting</option>
                  <option>Event</option>
                  <option>Workout</option>
                </select>
              </div>
            </div>
            <div class="space-y-1">
              <label for="event_title" class="block text-sm font-medium leading-5 text-gray-900">
                Event Title
              </label>
              <div class="relative rounded-md shadow-sm">
                <input v-model="eventAdd_FormValues.Title" id="event_title" class="form-input block w-full sm:text-sm sm:leading-5 transition ease-in-out duration-150">
              </div>
            </div>
            <div class="space-y-1">
              <label for="description" class="block text-sm font-medium leading-5 text-gray-900">
                Body
              </label>
              <div class="relative rounded-md shadow-sm">
                <textarea v-model="eventAdd_FormValues.Body" id="description" rows="4" class="form-input block w-full sm:text-sm sm:leading-5 transition ease-in-out duration-150"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-end mt-2">
        <span class="inline-flex rounded-md shadow-sm">
          <button v-if="eventAddFormValidation" @click="addNewEvent(monthDay)" type="button" class="inline-flex items-center px-2 py-1 border border-transparent text-sm leading-6 font-medium rounded-md text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray active:bg-gray-700 transition ease-in-out duration-150">
            Save
          </button>
          <button disabled v-else type="button" class="inline-flex items-center px-2 py-1 border border-transparent text-sm leading-6 font-medium rounded-md text-white bg-gray-400 cursor-default">
            Save
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { uuid } from 'vue-uuid'


export default {
  props: ['currentlySelectedDate', 'monthDay', 'calendarIndex', 'year', 'month', 'calendarViewingState'],
  data() {
    return {
      eventAdd_FormValues: {
        'Date': null,
        'Time': null,
        'Hour': null,
        'Minute': null,
        'Type': null,
        'Title': null,
        'Body': null
      },
    }
  },
  computed: {
    eventAddFormValidation: function() {
      if(this.eventAdd_FormValues.Hour && this.eventAdd_FormValues.Minute && this.eventAdd_FormValues.Type && this.eventAdd_FormValues.Title && this.eventAdd_FormValues.Body) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    addNewEvent(day) {
      const eventDate = new Date(this.year, this.month-1, day, this.eventAdd_FormValues.Hour, this.eventAdd_FormValues.Minute)
      const eventObject = {
                            'Event_Id': uuid.v1(),
                            'Type': this.eventAdd_FormValues.Type, 
                            'Title': this.eventAdd_FormValues.Title, 
                            'Body': this.eventAdd_FormValues.Body,
                            'DateTime': eventDate, 
                            'Year': this.year, 
                            'Month': this.month, 
                            'Day':day, 
                            'Time': this.eventAdd_FormValues.Hour + ':' + this.eventAdd_FormValues.Minute + ':00'
                          }

      this.$store.dispatch('TestData/addEventData', eventObject)
      this.resetQuickAddForm()
    },
    quickAddEvent_DropdownClass(indexPos) {
      const rightIndexes = [7,14,21,28,35]
      const bottomWeeklyIndex = [5,6,7]

      if(this.calendarViewingState === 'Weekly') {
        if(bottomWeeklyIndex.indexOf(indexPos) !== -1) {
          return 'mr-2 bottom-0 right-0 origin-bottom-right weeklyBottomMargin'
        } else {
          return 'mr-2 right-0 origin-top-right'
        }
      } else  if(this.calendarViewingState === 'Day') {
        return 'right-0 mr-2'
      }
      else if(rightIndexes.indexOf(indexPos) !== -1) {
        return 'right-0'
      } else {
        return 'left-0'
      }
    },
    resetQuickAddForm() {
      this.eventAdd_FormValues.Date = null
      this.eventAdd_FormValues.Time = null
      this.eventAdd_FormValues.Hour = null
      this.eventAdd_FormValues.Minute = null
      this.eventAdd_FormValues.Type = null
      this.eventAdd_FormValues.Title = null
      this.eventAdd_FormValues.Body = null

      this.$emit('update:showQuickAddDropDown', false)
    },
  }
}
</script>

<style>
  .weeklyBottomMargin {
    margin-bottom: 5.6rem;
  }
</style>