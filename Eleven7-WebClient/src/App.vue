<template>
  <v-app>
    <Toolbar></Toolbar>
    <Navdrawer></Navdrawer>
    <v-content>
      <router-view></router-view>
    </v-content>
    <Snackbar/>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Toolbar from './components/Toolbar'
import Navdrawer from './components/Navdrawer'
import Footer from './components/Footer'
import Snackbar from './components/Snackbar'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    Toolbar, Footer, Snackbar, Navdrawer
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
