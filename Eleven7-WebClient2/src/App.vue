<template>
  <v-app>
    <core-filter />
    <core-toolbar />
    <core-drawer />
    <core-view />
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  methods: {
    ...mapActions('UserModule', ['InitUser'])
  },
  created () {
    console.log('APP CREATED')
    // this.InitUser();
  }
}
</script>
<style lang="scss">
@import '@/styles/index.scss';

/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
</style>
