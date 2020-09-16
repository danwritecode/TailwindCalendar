<template>
  <div class="fixed inset-0 overflow-hidden">
    <div class="absolute inset-0 overflow-hidden">
      <transition       
        enter-active-class="ease-in-out duration-500"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="ease-in-out duration-500"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="animationToggle" @click="toggleOffSidePanel()" class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      </transition>

      <section class="absolute inset-y-0 pl-16 max-w-full right-0 flex">
        <transition       
            enter-active-class="transform transition ease-in-out duration-500 sm:duration-700"
            enter-class="translate-x-full"
            enter-to-class="translate-x-0"
            leave-active-class="transform transition ease-in-out duration-500 sm:duration-700"
            leave-class="translate-x-0"
            leave-to-class="translate-x-full"
        >
          <div v-if="animationToggle" class="w-screen max-w-md">
            <div class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl">
              <div class="flex-1 h-0 overflow-y-auto">
                <header :class="determineEventColorClass(event.Type)"  class="space-y-1 py-6 px-4 sm:px-6">
                  <div class="flex items-center justify-between space-x-3">
                    <h2 class="text-lg leading-7 font-medium text-white">
                      {{ event.Type }} Details
                    </h2>
                    <div class="h-7 flex items-center">
                      <button @click="toggleOffSidePanel()" type="button" aria-label="Close panel" class="text-gray-200 hover:text-white transition ease-in-out duration-150">
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </header>
                <div v-if="formState === 'View'">
                  <div class="px-4 py-5">
                      <dl>
                        <div class="mt-4">
                          <dt class="text-sm leading-5 font-medium text-gray-500">
                            When
                          </dt>
                          <dd class="text-sm leading-5 text-gray-900">
                            {{ $moment(event.DateTime).format('lll') }}
                          </dd>
                        </div>
                        <div class="mt-4">
                          <dt class="text-sm leading-5 font-medium text-gray-500">
                            Title
                          </dt>
                          <dd class="text-sm leading-5 text-gray-900">
                            {{ event.Title }}
                          </dd>
                        </div>
                        <div class="mt-4">
                          <dt class="text-sm leading-5 font-medium text-gray-500">
                            Body
                          </dt>
                          <dd class="text-sm leading-5 text-gray-900">
                            {{ event.Body }}
                          </dd>
                        </div>
                      </dl>
                    </div>
                </div>
                <div v-if="formState === 'Edit'" class="flex-1 flex flex-col justify-between">
                  <div class="px-4 divide-y divide-gray-200 sm:px-6">
                    <div class="space-y-6 pt-6 pb-5">
                      <div>
                        <label for="start_time" class="block text-sm font-medium leading-5 text-gray-900">
                          Time
                        </label>
                        <div class="relative flex flex-no-wrap">
                          <div class="px-2 py-1 bg-white text-sm focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg block appearance-none leading-normal transition ease-in-out duration-150">
                            <div class="flex">
                              <select v-model="event.Hour" name="hours" class="text-sm bg-transparent appearance-none outline-none">
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
                              <select v-model="event.Minute" name="minutes" class="text-sm bg-transparent appearance-none outline-none">
                                <option value="0">00</option>
                                <option value="15">15</option>
                                <option value="30">30</option>
                                <option value="45">45</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="space-y-1">
                        <label for="event_type" class="block text-sm font-medium leading-5 text-gray-900">
                          Type
                        </label>
                        <div class="relative rounded-md shadow-sm">
                          <select v-model="event.Type" id="location" class="mt-1 form-select block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5">
                            <option>Meeting</option>
                            <option>Event</option>
                            <option>Workout</option>
                          </select>
                        </div>
                      </div>
                      <div class="space-y-1">
                        <label for="project_name" class="block text-sm font-medium leading-5 text-gray-900">
                          Title
                        </label>
                        <div class="relative rounded-md shadow-sm">
                          <input v-model="event.Title" id="project_name" class="form-input block w-full sm:text-sm sm:leading-5 transition ease-in-out duration-150">
                        </div>
                      </div>
                      <div class="space-y-1">
                        <label for="project_name" class="block text-sm font-medium leading-5 text-gray-900">
                          Body
                        </label>
                        <div class="relative rounded-md shadow-sm">
                          <input v-model="event.Body" id="project_name" class="form-input block w-full sm:text-sm sm:leading-5 transition ease-in-out duration-150">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex-shrink-0 px-4 py-4 space-x-4 flex justify-end">
                  <span class="inline-flex rounded-md shadow-sm">
                    <button type="button" class="py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
                      Delete
                    </button>
                  </span>
                  <span class="inline-flex rounded-md shadow-sm">
                    <button v-if="formState === 'View'" @click="formState = 'Edit'" type="submit" :class="determineEventColorClass(event.Type)"  class="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white focus:outline-none transition duration-150 ease-in-out">
                      Edit
                    </button>
                    <button v-if="formState === 'Edit'" @click="formState = 'View'" type="submit" :class="determineEventColorClass(event.Type)"  class="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white focus:outline-none transition duration-150 ease-in-out">
                      Save
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      event: null,
      animationToggle: false,
      formState: 'View'
    }
  },
  created() {
    // Simulate API call using the entity ID that is in the Store. Obviously we are just calling the test data in the store again.
    const entityId = this.$store.getters['SidePanel/sidePanelEntityId']

    // API call if we had one
    const calendarEvents = this.$store.getters['TestData/eventData']
    this.event = calendarEvents.filter(event => event.Event_Id === entityId)[0]
  },
  mounted() {
   this.animationToggle = true
  },
  methods: {
    toggleOffSidePanel() {
      this.animationToggle = false
      // Give time for animation to finish before actually changing value in store, otherwise it will just disappear with animating. 
      setTimeout(() => {this.$store.dispatch('SidePanel/setSidePanelType', null)}, 500)
    },
    determineEventColorClass(eventType) {
      const calendarEventColorMapping = [{'Type':'Meeting', 'Class':'bg-pink-600 hover:bg-pink-500 focus:border-pink-700 focus:shadow-outline-pink active:bg-pink-700'}, {'Type':'Workout','Class':'bg-orange-500 hover:bg-orange-400 focus:border-orange-600 focus:shadow-outline-orange active:bg-orange-600'}, {'Type':'Event','Class':'bg-green-400 hover:bg-green-300 focus:border-green-500 focus:shadow-outline-green active:bg-green-500'}]
      return(calendarEventColorMapping.find(type => type.Type === eventType).Class)
    },
  }

}
</script>

<style>

</style>