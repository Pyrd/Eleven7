<template>
  <v-navigation-drawer
    id="app-drawer"
    :value="drawer"
    app
    dark
    floating
    persistent
    mobile-break-point="991"
    width="260"
    class="grey darken-3 pb-0 white--text"
  >
    <v-toolbar flat height="80px" class="white--text grey darken-3">
      <v-menu bottom origin="center center" transition="scale-transition" min-width="250px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" flat icon class="white--text" v-on="on">
            <v-avatar size="32px" color="grey lighten-4">
              <img :src="user_info.avatar" alt="avatar">
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="blue white--text">
            <v-layout align-center justify-center row fill-height>
              <v-flex style="margin-right:10px">
                <v-avatar size="64px" color="grey lighten-4">
                  <img :src="user_info.avatar" alt="avatar">
                </v-avatar>
              </v-flex>
              <v-flex>
                <div class="headline" style="width:100%">
                  <b>Hello</b>
                </div>
                <div class="headline" style="width:100%">
                  <span v-if="authentified">{{user_info.first_name}} {{user_info.last_name}}</span>
                  <span v-else>Please login</span>
                </div>
              </v-flex>
            </v-layout>
          </v-card-title>

          <v-card-text style="padding:0px">
            <v-list v-if="authentified">
              <v-list-tile v-for="(item, i) in authTrue" :key="i" @click="menuCall(item.action)">
                <v-list-tile-avatar>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-title class="text-xs-left ">{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
            <v-list v-else>
              <v-list-tile v-for="(item, i) in authFalse" :key="i" @click="menuCall(item.action)">
                <v-list-tile-avatar>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-title class="text-xs-left">{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-card-text>
        </v-card>
      </v-menu>
      <v-toolbar-title>
        <v-layout column align-center justify-center>
          <div v-if="authentified">
            <div style="width:100%">
              <span
                class="title font-weight-medium white--text"
              >{{user_info.first_name}} {{user_info.last_name}}</span>
            </div>
            <span
              class="body-2 font-weight-regular ml-2 white--text"
              style="width:100%"
            >{{user_info.email_address}}</span>
          </div>

          <span v-else>Please login</span>
        </v-layout>
      </v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-list dense class="pt-0 white--text">
      <v-list-tile
        v-for="(item) in singles"
        :key="item.name"
        :class="[ route_name == item.route_name ? 'selected' : '' ]"
        @click="reDirect(item.route_name)"
      >
        <v-list-tile-action>
          <v-icon
            :class="[ route_name == item.route_name ? 'selected' : 'white--text' ]"
          >{{item.icon}}</v-icon>
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
      </v-list-group>-->
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters , mapActions, mapState} from "vuex";

export default {
  name: "Navdrawer",
  data: () => ({
    mini: false,
    route_name: "home",
    authFalse: [{ icon: "account_circle", title: "Login", action: "login" }],
    authTrue: [
      { icon: "account_box", title: "Manage my account", action: "settings" },
      { icon: "exit_to_app", title: "Logout", action: "logout" }
    ],
    menus: [
      {
        name: "Management",
        icon: "people_outline",
        children: [
          {
            name: "Employees",
            route_name: "employees",
            icon: "people_outline"
          },
          { name: "Register", route_name: "register", icon: "people_outline" }
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
      { name: "Dashboard", route_name: "home", icon: "dashboard" },
      {
        name: "Employees Management",
        route_name: "employees",
        icon: "people_outline"
      },
      { name: "Store Management", route_name: "stores", icon: "store" }
    ]
  }),
  computed: {
    ...mapGetters({
      drawer: "getDrawerState",
      authentified: "UserModule/getAuth",
      user_info: "UserModule/getUserInfo"
    }),
  },
  watch: {
    $route(to, from) {
      let t = false;
      let i = 0;
      while (!t && i < this.singles.length) {
        if (this.singles[i].route_name == to.name) {
          this.route_name = to.name;
          this.t = true;
        }
        i += 1;
      }
    }
  },
  methods: {
    reDirect: function(name) {
      this.$router.push({ name: name, params: { fromNav: true } });
      //console.log(this.$route.name)
    },
    menuCall: function(action) {
      switch (action) {
        case "login":
          this.$router.push({ name: "login" });
          break;
        case "settings":
          this.$router.push({ name: "AccountSettings" });
          break;
        case "logout":
          this.logout();
          this.$router.push({ name: "login" });
          break;
      }
    }
  }
};
</script>

<style lang="scss">
  #app-drawer {
    .v-list__tile {
      border-radius: 4px;

      &--buy {
        margin-top: auto;
        margin-bottom: 17px;
      }
    }

    .v-image__image--contain {
      top: 9px;
      height: 60%;
    }

    .search-input {
      margin-bottom: 30px !important;
      padding-left: 15px;
      padding-right: 15px;
    }

    div.v-responsive.v-image > div.v-responsive__content {
      overflow-y: auto;
    }
  }
.v-toolbar__title:not(:first-child) {

    margin-left: 0px !important;

}
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

  .selected {
  color: #4abfff !important;
}
</style>