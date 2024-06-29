<template>
      <FlangeModel />
      <HelloWorld />
</template>

<script>
import FlangeModel from './components/FlangeModel.vue'; // Import your FlangeModel component here
import HelloWorld from './components/flangeInfo/flangeInfo.vue'; // Import your FlangeModel component here

export default {
  name: 'App',
  components: {
        FlangeModel, // Register FlangeModel component
HelloWorld
  }
}
</script>

<style>
#app {
 overflow: hidden !important; 
 margin:-20px;
 height:103%;
 width: 101.4%;
}
</style>
