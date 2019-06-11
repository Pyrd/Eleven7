<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    app
    dark
    floating
    persistent
    mobile-break-point="991"
    width="260"
  >
    <v-img
      :src="image"
      :gradient="sidebarOverlayGradiant"
      height="100%">
      <v-layout
        class="fill-height"
        tag="v-list"
        column>
        <v-list-tile avatar>
          <v-list-tile-avatar color="white">
            <v-menu
              bottom
              origin="center center"
              transition="scale-transition"
              min-width="250px">
              <template v-slot:activator="{ on }">
                <v-btn
                  color="primary"
                  flat
                  icon
                  class="white--text"
                  v-on="on">
                  <v-avatar
                    size="32px"
                    color="grey lighten-4">
                    <img
                      :src="user_info.avatar"
                      alt="avatar">
                  </v-avatar>
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="blue white--text">
                  <v-layout
                    align-center
                    justify-center
                    row
                    fill-height>
                    <v-flex style="margin-right:10px">
                      <v-avatar
                        size="64px"
                        color="grey lighten-4">
                        <img
                          :src="user_info.avatar"
                          alt="avatar">
                      </v-avatar>
                    </v-flex>
                    <v-flex>
                      <div
                        class="headline"
                        style="width:100%">
                        <span v-if="authentified">{{ user_info.first_name }} {{ user_info.last_name }}</span>
                        <span v-else>Please login</span>
                      </div>
                      <div style="color:#ececec; width:100%">
                        <span v-if="authentified">{{ user_info.email_address }}</span>
                      </div>
                    </v-flex>
                  </v-layout>
                </v-card-title>

                <v-card-text style="padding:0px">
                  <v-list v-if="authentified">
                    <v-list-tile
                      v-for="(item, i) in authTrue"
                      :key="i"
                      @click="menuCall(item.action)"
                    >
                      <v-list-tile-avatar>
                        <v-icon>{{ item.icon }}</v-icon>
                      </v-list-tile-avatar>
                      <v-list-tile-title class="text-xs-left">{{ item.title }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                  <v-list v-else>
                    <v-list-tile
                      v-for="(item, i) in authFalse"
                      :key="i"
                      @click="menuCall(item.action)"
                    >
                      <v-list-tile-avatar>
                        <v-icon>{{ item.icon }}</v-icon>
                      </v-list-tile-avatar>
                      <v-list-tile-title class="text-xs-left">{{ item.title }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-menu>
          </v-list-tile-avatar>
          <v-list-tile-title
            v-if="authentified"
            class="title"
          >{{ user_info.first_name }} {{ user_info.last_name }}</v-list-tile-title>
          <v-list-tile-title
            v-else
            class="title">Please login</v-list-tile-title>
        </v-list-tile>
        <v-divider/>
        <v-list-tile
          v-for="link in displayLinks"
          :key="link.to"
          :class="{'primary--text' : isActive == link.to}"
          avatar
          class="v-list-item "
          @click="reDirect(link.to, link.param)"
        >
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title v-text="link.text"/>
        </v-list-tile>
      </v-layout>
    </v-img>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapMutations, mapActions, mapState, mapGetters } from 'vuex'

export default {
  data: () => ({
    links: [
      {
        to: 'Dashboard',
        icon: 'mdi-view-dashboard',
        text: 'Dashboard',
        param: -1,
        AuthLevel: 1
      },
      {
        to: 'Account Settings',
        icon: 'mdi-account',
        text: 'My Profile',
        param: -1,
        AuthLevel: 1
      },
      {
        to: 'Store Profile',
        icon: 'mdi-bank',
        text: 'My Store',
        param: 0,
        AuthLevel: 1
      },
      {
        to: 'Management',
        icon: 'mdi-settings',
        text: 'Management',
        param: -1,
        AuthLevel: 2
      },
      // {
      //   to: "Employees Management",
      //   icon: "mdi-account-multiple",
      //   text: "Employees Management",
      //   param : -1,
      //   AuthLevel : 2
      // },
      // {
      //   to: "Store Management",
      //   icon: "mdi-store",
      //   text: "Store Management",
      //   param : -1,
      //   AuthLevel : 2
      // },
      // {
      //   to: "Stock Management",
      //   icon: "mdi-apps",
      //   text: "Stock Management",
      //   param : -1,
      //   AuthLevel : 2
      // },
      {
        to: 'Admin',
        icon: 'mdi-alert-decagram',
        text: 'Admin',
        param: -1,
        AuthLevel: 4
      }
    ],
    authFalse: [{ icon: 'mdi-account', title: 'Login', action: 'login' }],
    authTrue: [
      { icon: 'mdi-account-box-outline', title: 'Manage my account', action: 'settings' },
      { icon: 'mdi-exit-to-app', title: 'Logout', action: 'logout' }
    ],
    responsive: false
  }),
  computed: {
    ...mapState('app', ['color']),
    ...mapGetters({
      drawer: 'getDrawerState',
      authentified: 'UserModule/getAuth',
      user_info: 'UserModule/getUserInfo'
    }),
    image(){
      return require('../../../public/img/w2.jpg')
    },
    inputValue: {
      get () {
        return this.$store.state.app.drawer
      },
      set (val) {
        this.setDrawer(val)
      }
    },
    isActive () {
      return this.$route.name
    },
    items () {
      return this.$t('Layout.View.items')
    },
    sidebarOverlayGradiant () {
      return `${this.$store.state.app.sidebarBackgroundColor}, ${
        this.$store.state.app.sidebarBackgroundColor
      }`
    },
    displayLinks () {
      let tmp = []
      for (let i = 0; i < this.links.length; i++) {
        if (this.user_info.job_level >= this.links[i].AuthLevel) {
          tmp.push(this.links[i])
        }
      }
      return tmp
    }
  },
  mounted () {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },
  methods: {
    ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
    ...mapActions('UserModule', ['logout']),
    onResponsiveInverted () {
      if (window.innerWidth < 991) {
        this.responsive = true
      } else {
        this.responsive = false
      }
    },
    reDirect: function (name, id) {
      if (id == 0) {
        this.$router.push({ name: name, params: { id: this.user_info.store_id } })
      } else {
        this.$router.push({ name: name })
      }
    },
    menuCall: function (action) {
      switch (action) {
        case 'login':
          this.$router.push({ name: 'Login' })
          break
        case 'settings':
          this.$router.push({ name: 'Account Settings' })
          break
        case 'logout':
          this.logout()
          this.$router.push({ name: 'Login' })
          break
      }
    }
  }
}
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
</style>
