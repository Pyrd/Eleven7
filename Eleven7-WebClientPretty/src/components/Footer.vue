<template>
  <v-footer app inset class="pa-3 grey--text text--darken-3 white">
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
