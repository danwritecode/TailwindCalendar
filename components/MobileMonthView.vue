<template>
  <div class="p-4">
    <div v-for="n in 12" class="mb-2 h-64 w-full rounded-md border shadow border-gray-100">
      {{ determineMonthYear(n) }} 
    </div>
  </div>
</template>

<script>
export default {
  props: ['startMonth', 'startYear'],
  data() {
    return {

    };
  },
  methods: {
    determineMonthYear(n) {
      if(this.startMonth + (n-1) > 12) {

      } else {
        return(this.startMonth + (n-1))
      }
    }
  }
};
</script>

<style>
</style>