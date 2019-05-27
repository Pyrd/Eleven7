<template>
  <v-navigation-drawer app clipped :value="drawer" class="grey lighten-4 pb-0">
    <v-toolbar flat height="80px">
      <v-toolbar-title>
        <v-layout column align-center justify-center>
          <div v-if="authentified" >
            <div style="width:100%">
              <span class="title font-weight-medium" >{{user_info.first_name}} {{user_info.last_name}} </span>
              <span class="subheading font-weight-light">ID: {{user_info.employee_id}}</span>
            </div>
            <span class="body-2 font-weight-regular ml-2" style="width:100%">{{user_info.email_address}}</span>
          </div>
          
          <span v-else>Please login</span>
        </v-layout>
      </v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-list dense class="pt-0">
      <v-list-tile v-for="(item) in singles" :key="item.name" @click="reDirect(item.route_name)">
        <v-list-tile-action>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>{{item.name}}</v-list-tile-title>
      </v-list-tile>
      <v-divider></v-divider>
      <!-- <v-list-group v-for="menu in menus" :key="menu.name" no-action sub-group value="true">
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-title>
              <v-icon v-text="menu.icon"></v-icon>
              <span class="ml-2">
                <b>{{menu.name}}</b>
              </span>
            </v-list-tile-title>
          </v-list-tile>
        </template>
        <v-list-tile v-for="(item, i) in menu.children" :key="i" @click="reDirect(item.route_name)">
          <v-list-tile-title>{{item.name}}</v-list-tile-title>
          <v-list-tile-action>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list-group> -->
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Navdrawer",
  data: () => ({
    menus: [

      {
        name: "Management",
        icon: "people_outline",
        children: [
          { name: "Employees", route_name: "employees", icon: "people_outline"},
          { name: "Register", route_name: "register", icon: "people_outline" },
          
        ]
      },
      {
        name: "My Store",
        icon: "store",
        children: [
          { name: "Inventory WIP", route_name: "", icon: "reorder" },
          { name: "Schedule WIP", route_name: "", icon: "calendar_today" },
          { name: "Sales WIP", route_name: "", icon: "attach_money" },
          { name: "Stats WIP", route_name: "", icon: "bar_chart" }
        ]
      }
    ],
    singles: [
        { name: "Dashboard", route_name: "home", icon: "dashboard"},
        { name: "Employees Management", route_name: "employees", icon: "people_outline"},
        { name: "Store Management", route_name: "employees", icon: "store"},
    ]
  }),
  computed: 
  mapGetters({
    drawer: "getDrawerState",
    authentified : 'UserModule/getAuth',
    user_info : 'UserModule/getUserInfo',
  }),
  methods: {
    reDirect: function(name) {
      this.$router.push({ name: name, params: {fromNav:true}});
    }
  }
};
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
