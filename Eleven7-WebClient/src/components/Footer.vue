<template>
  <v-footer app  class="pa-3 grey darken-3 white--text">
    <v-spacer></v-spacer>
    <div><b>Eleven</b><b style="color:orange">7</b> &copy;{{ new Date().getFullYear() }}</div>
  </v-footer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Footer',
  data: () => ({
    //
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
