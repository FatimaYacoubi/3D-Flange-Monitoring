<template>
      <FlangeModel />
      <Docks />
      <AppFooter />
</template>

<script>
import FlangeModel from './components/3DModel/FlangeModel.vue'; 
import Docks from './components/flangeInfo/flangeInfo.vue'; 
import AppFooter from './components/footer/AppFooter.vue'
export default {
  name: 'App',
  components: {
        FlangeModel, 
Docks ,
AppFooter }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
        background: linear-gradient(to bottom, #000028, #00898D);
        }

#app {
  margin: 0; /* Ensure no margin on #app */
  height: 100%;
  width: 100%;
          background: linear-gradient(to bottom, #000028, #00898D);

}

</style>
