<template>
  <v-snackbar
    v-model="snackbar"
    top
    color="white black--text text-xs-center">
    <span class="subheading">{{ text }}</span>
    <v-btn
      flat
      @click="snackbar = false">
      <span class="pink--text">Close</span>
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      snackbar: false,
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
