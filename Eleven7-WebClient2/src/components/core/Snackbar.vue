<template>
  <!-- <v-alert
    v-bind="$attrs"
    :class="[`elevation-6`]"
    :value="snackbar"
    class="v-alert--notification"
    type="sucess"
  >
    {{ text }} <v-btn color="orange" flat @click="snackbar = false">Close</v-btn>
  </v-alert> -->
  <p>hey</p>
  <!-- <v-snackbar v-model="snackbar" top left color="white black--text text-xs-center">
      <b>{{ text }}</b>
      <v-btn color="orange" flat @click="snackbar = false">Close</v-btn>
    </v-snackbar> -->
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      snackbar: true,
      text: ''
    }
  },
  computed: {
    ...mapGetters({
      msg: 'getSnackbarText'
    })
  },
  watch: {
    msg (newtext, oldtext) {
      this.text = newtext
      this.snackbar = true
    }
  }
}
</script>

<style>
.v-alert--notification {
  border-radius: 4px !important;
  border-top: none !important;
}
</style>
