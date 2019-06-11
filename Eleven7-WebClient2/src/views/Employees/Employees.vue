<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout wrap>
      <v-flex
        sm6
        xs12
        md6
        lg3 >
        <v-hover>
          <material-stats-card
            v-if="user_lvl >= 1"
            color="orange"
            icon="mdi-account-box-outline"
            title="Personal"
            value="My profile"
            @click="reDirect('Account Settings')"
          />
        </v-hover>
      </v-flex>
      <v-flex
        sm6
        xs12
        md6
        lg3 >
        <material-stats-card
          v-if="user_lvl >= 2"
          color="green"
          icon="mdi-account-group"
          title="Overview"
          value="Employees"
          @click="reDirect('Employees Management List')"
        />
      </v-flex>
      <v-flex
        sm6
        xs12
        md6
        lg3 >
        <material-stats-card
          v-if="user_lvl >= 3"
          color="red"
          icon="mdi-account-search"
          title="Specific"
          value="Search"
          @click="reDirect('Employees Management Search')"
        />
      </v-flex>
      <v-flex
        sm6
        xs12
        md6
        lg3 >
        <v-hover>
          <material-stats-card
            v-if="user_lvl >= 3"
            color="info"
            icon="mdi-account-plus"
            title="Register"
            value="Add Staff"
            @click="reDirect('Register')"
          />
        </v-hover>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Employees',
  props: {
    fromNav: {
      default: false,
      type: Boolean
    }
  },
  data: () => ({
  }),
  computed: {
    ...mapGetters({
      user_lvl: 'UserModule/getAuthLvl'
    })
  },
  methods: {
    ...mapActions(['setSnackbar']),
    setSnack: function (txt) {
      var payload = { text: txt }
      this.setSnackbar(payload)
    },
    reDirect: function (name) {
      this.$router.push({ name: name })
    },
    goBack: function () {
      this.$router.push({ name: 'home' })
    }
  }
}
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
