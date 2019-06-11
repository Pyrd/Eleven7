<template>
  <v-toolbar
    id="core-toolbar"

    flat
    prominent
    style="background: #eee;"
  >
    <div class="v-toolbar-title">
      <v-toolbar-title
        class="tertiary--text font-weight-light"
      >
        <v-btn
          v-if="responsive"
          class="default v-btn--simple"
          dark
          icon
          @click.stop="onClickBtn"
        >
          <v-icon>mdi-view-list</v-icon>
        </v-btn>
        {{ title }}
      </v-toolbar-title>
    </div>

    <v-spacer />
    <v-toolbar-items>
      <v-flex
        align-center
        layout
        py-2
      >
        <router-link
          v-ripple
          class="toolbar-items"
          to="/"
        >
          <v-icon color="tertiary">mdi-view-dashboard</v-icon>
        </router-link>
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
                    <span>Hello</span>
                  </div>
                  <div
                    class="headline"
                    style="width:100%">
                    <span v-if="authentified">{{ user_info.first_name }} {{ user_info.last_name }}</span>
                    <span v-else>Please login</span>
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
      </v-flex>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>

import { mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  data: () => ({
    authFalse: [{ icon: 'mdi-account', title: 'Login', action: 'login' }],
    authTrue: [
      { icon: 'mdi-account-box-outline', title: 'Manage my account', action: 'settings' },
      { icon: 'mdi-exit-to-app', title: 'Logout', action: 'logout' }
    ],
    title: null,
    responsive: false,
    responsiveInput: false
  }),

  watch: {
    '$route' (val) {
      this.title = val.name
    }
  },
  computed: {
    ...mapGetters({
      drawer: 'getDrawerState',
      authentified: 'UserModule/getAuth',
      user_info: 'UserModule/getUserInfo'
    })
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
    onClickBtn () {
      this.setDrawer(!this.$store.state.app.drawer)
    },
    onClick () {
      //
    },
    reDirect: function (name) {
      this.$router.push({ name: name, params: { fromNav: true } })
      // console.log(this.$route.name)
    },
    onResponsiveInverted () {
      if (window.innerWidth < 991) {
        this.responsive = true
        this.responsiveInput = false
      } else {
        this.responsive = false
        this.responsiveInput = true
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

<style>
  #core-toolbar a {
    text-decoration: none;
  }
</style>
