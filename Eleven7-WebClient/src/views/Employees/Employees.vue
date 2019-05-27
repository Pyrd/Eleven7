<template>
  <v-card>
    <v-toolbar dense class="grey darken-2 white--text">
      <v-btn v-if="!fromNav" icon class="white--text" large @click="goBack">
            <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="white--text subtitle" style="margin-left:20px">Management dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container fluid grid-list-sm>
      <v-layout  wrap align-space-around justify-space-between fill-height>
        <v-flex v-for="menu in menus" :key="menu.name" xs12 sm4 md3>
          <v-hover>
            <v-card
              hover
              slot-scope="{ hover }"
              :class="`elevation-${hover ? 12 : 2} ${hover ? 'focusCE' : 'tileE'}`" 
              height="300px"
              @click="reDirect(menu.route_name)"
            >
              <v-layout column fill-height justify-center align-center>
                <span class="display-1" style="text-align:center">
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
  props : {
    fromNav: {
      default: false,
      type : Boolean
    }
  },
  name: "Employees",
  data: () => ({
    menus: [
      { name: "Employees list", route_name: "EmployeesList" },
      { name: "Search", route_name: "EmployeesSearch" },
      { name: "Register", route_name: "register" }
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
    },
    goBack: function() {
      this.$router.push({ name: "home" });
    }
  }
};
</script>
<style>
.v-input__append-outer .v-icon,
.v-input__prepend-outer .v-icon {
  color: white;
}
.tileE {
  color: #424242 !important;
  caret-color: #424242 !important;
  background-color: #e6e5e5 !important;
  border: 3px solid #424242!important;
  border-radius: 20px;
}
.focusCE {
  color: #f77103 !important;
  caret-color: #f77103 !important;
  background-color: #ffffff !important;
  border: 3px solid #f77103 !important;
  border-radius: 20px;
}
</style>
