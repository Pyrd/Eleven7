<template>
  <v-app>
    <Navdrawer/>
    <Toolbar></Toolbar>
    <VView/>
    <Snackbar/>
    <Footer/>
  </v-app>
</template>

<style lang="scss">
@import '@/styles/index.scss';

</style>


<script>
import Toolbar from './components/Toolbar'
import Navdrawer from './components/Navdrawer'
import Footer from './components/Footer'
import Snackbar from './components/Snackbar'
import VView from './components/View'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    Toolbar, Footer, Snackbar, Navdrawer, VView
  },
  data () {
    return {
      //
    }
  },
  methods : {
    ...mapActions('UserModule', ['InitUser']),
  }, 
  created(){
    console.log("APP CREATED");
    this.InitUser();
  }
}
</script>
