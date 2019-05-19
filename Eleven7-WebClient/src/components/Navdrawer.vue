<template>
  <v-navigation-drawer app clipped :value="drawer" class="grey lighten-4 pb-0">
    <v-toolbar flat>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            <b>Dashboard</b>
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-divider></v-divider>
    <v-list dense class="pt-0">
      <v-list-tile v-for="menu in menus" :key="menu.name" @click="reDirect(menu.path)">
        <v-list-tile-action>
          <v-icon>{{menu.icon}}</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>{{menu.name}}</v-list-tile-title>
      </v-list-tile>
    </v-list>

  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Navdrawer',
  data: () => ({
      menus: [
        {name:'Employees', path:'employees',icon:'people_outline'},
      ],
    }),
  computed: mapGetters({
    	drawer: 'getDrawerState',
    }),
  methods: {
    reDirect: function(valPath){
      this.$router.push({path:valPath})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
