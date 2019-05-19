<template>
  <div>
    <h1>This is Admin Page</h1>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Admin',
  data: () => ({
  }),
  computed: {
     ...mapGetters({
        
     }),
  },
  methods : {
    ...mapActions([
   	 		'setSnackbar'
         ]),
    setSnack: function(txt){
      var payload = {text: txt}
      this.setSnackbar(payload);
    }
  }
}
</script>
<style>

</style>
