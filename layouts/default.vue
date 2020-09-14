<template>
  <div>
    <transition name="fade" mode="out-in">
      <nuxt />
    </transition>

    <ViewEventSidePanel v-if="sidePanelType === 'ViewEvent'" class="z-20"/>
    <EditEventSidePanel v-if="sidePanelType === 'EditEvent'" />
    
  </div>
</template>

<script>
import ViewEventSidePanel from '~/components/SidePanels/ViewEvent'
import EditEventSidePanel from '~/components/SidePanels/EditEvent'

export default {
  components: {
    ViewEventSidePanel,
    EditEventSidePanel
  },
  computed: {
    sidePanelType: function() {
      return this.$store.getters['SidePanel/sidePanelType']
    },
  }
  
}
</script>

<style>
html {
  font-family: 'Roboto', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif ;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.4s;
  transition-property: opacity;
  transition-timing-function: ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0
}

</style>
