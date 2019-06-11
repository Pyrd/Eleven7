<template>
  <v-card>
    <v-toolbar dense class="grey darken-2 white--text">
      <v-toolbar-title class="white--text subtitle" style="margin-left:20px">Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container fluid grid-list-sm>
      <v-layout wrap row>
        <v-flex v-for="menu in menus" :key="menu.name" xs12 sm6 md4 lg3>
          <v-hover>
            <v-card
              hover
              slot-scope="{ hover }"
              :class="`elevation-${hover ? 12 : 2} ${hover ? 'focusCH' : 'tileH'}`" 
              height="150" width="150" style="margin: auto;"
              @click="reDirect(menu.route_name)"
            >
              <v-layout column fill-height justify-center align-center>
                <span class="title" style="text-align:center">
                  <b>{{menu.name}}</b>
                </span>
              </v-layout>
            </v-card>
          </v-hover>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Home",
  data: () => ({
    menus: [
      { name: "Employees Management", route_name: "employees" },
      { name: "Store Management", route_name: "stores" },
      { name: "My Profile", route_name: "AccountSettings" }
    ]
  }),
  methods: {
    ...mapActions(["setSnackbar"]),
    setSnack: function(txt) {
      var payload = { text: txt };
      this.setSnackbar(payload);
    },
    reDirect: function(name) {
      this.$router.push({ name: name });
    }
  }
};
</script>
<style>
.v-input__append-outer .v-icon,
.v-input__prepend-outer .v-icon {
  color: white;
}
.tileH {
  color: #424242 !important;
  caret-color: #424242 !important;
  background-color: #e6e5e5 !important;
  border: 3px solid #424242!important;
  border-radius: 20px;
}
.focusCH {
  color: #0599fb !important;
  caret-color: #0599fb !important;
  background-color: #ffffff !important;
  border: 3px solid #0599fb !important;
  border-radius: 20px;
}
</style>
