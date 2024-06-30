<template>
      <FlangeModel />
      <Docks />
      <AppFooter />
</template>

<script>
import FlangeModel from './components/3DModel/FlangeModel.vue'; // Import your FlangeModel component here
import Docks from './components/flangeInfo/flangeInfo.vue'; // Import your FlangeModel component here
import AppFooter from './components/footer/AppFooter.vue'
export default {
  name: 'App',
  components: {
        FlangeModel, // Register FlangeModel component
Docks ,
AppFooter }
}
</script>

<style>
#app {
 overflow-y: hidden !important; 
 margin:-20px;
 height:103%;
 width: 101.4%;
}
</style>
