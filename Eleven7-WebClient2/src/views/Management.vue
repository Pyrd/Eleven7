<template>
  <v-layout
    fill-height
    column>
    <v-card-title v-if="user_info.job_level >= authlvl1">
      <v-icon class="ml-2 grey--text text--darken-3">mdi-account-multiple</v-icon>
      <span class="title grey--text text--darken-3 ml-3">
        Staff Management
      </span>
    </v-card-title>
    <v-container
      v-if="user_info.job_level >= authlvl1"
      fill-height
      fluid
      grid-list-xl>
      <v-layout wrap>
        <v-flex
          sm6
          xs12
          md6
          lg3>
          <v-hover>
            <material-stats-card
              v-if="user_info.job_level >= 1"
              color="orange"
              icon="mdi-account-box-outline"
              title="Personal"
              value="My profile"
              @click="reDirect('Account Settings', -1)"
            />
          </v-hover>
        </v-flex>
        <v-flex
          sm6
          xs12
          md6
          lg3>
          <material-stats-card
            v-if="user_info.job_level >= 2"
            color="green"
            icon="mdi-account-group"
            title="Overview"
            value="Employees"
            @click="reDirect('Employees Management List', -1)"
          />
        </v-flex>
        <v-flex
          sm6
          xs12
          md6
          lg3>
          <material-stats-card
            v-if="user_info.job_level >= 3"
            color="red"
            icon="mdi-account-search"
            title="Specific"
            value="Search"
            @click="reDirect('Employees Management Search', -1)"
          />
        </v-flex>
        <v-flex
          sm6
          xs12
          md6
          lg3>
          <v-hover>
            <material-stats-card
              v-if="user_info.job_level >= 3"
              color="info"
              icon="mdi-account-plus"
              title="Register"
              value="Add Staff"
              @click="reDirect('Register', -1)"
            />
          </v-hover>
        </v-flex>
      </v-layout>
    </v-container>
    <v-card-title v-if="user_info.job_level >= authlvl2">
      <v-icon class="ml-2 grey--text text--darken-3">mdi-store</v-icon>
      <span class="title grey--text text--darken-3 ml-3">
        Store Management
      </span>
    </v-card-title>
    <v-container
      v-if="user_info.job_level >= authlvl2"
      fill-height
      fluid
      grid-list-xl>
      <v-layout wrap>
        <v-flex
          sm6
          xs12
          md6
          lg3>
          <material-stats-card
            v-if="user_info.job_level >= 2"
            color="red"
            icon="mdi-store"
            title="Specific"
            value="My Store"
            @click="reDirect('Store Profile', 0)"
          />
        </v-flex>
        <v-flex
          sm6
          xs12
          md6
          lg3>
          <material-stats-card
            v-if="user_info.job_level >= 3"
            color="blue"
            icon="mdi-format-list-bulleted"
            title="Overview"
            value="Stores"
            @click="reDirect('Store Management List', -1)"
          />
        </v-flex>
        <v-flex
          sm6
          xs12
          md6
          lg3>
          <v-hover>
            <material-stats-card
              v-if="user_info.job_level >= 3"
              color="purple"
              icon="mdi-currency-usd"
              title="Finance"
              value="Sales"
              @click="reDirect('Sales', -1)"
            />
          </v-hover>
        </v-flex>
      </v-layout>
    </v-container>
    <v-card-title v-if="user_info.job_level >= authlvl3">
      <v-icon class="ml-2 grey--text text--darken-3">mdi-apps</v-icon>
      <span class="title grey--text text--darken-3 ml-3">
        Stock Management
      </span>
    </v-card-title>
    <v-container
      v-if="user_info.job_level >= authlvl3"
      fill-height
      fluid
      grid-list-xl>
      <v-layout wrap>
        <v-flex
          sm6
          xs12
          md6
          lg3>
          <material-stats-card
            v-if="user_info.job_level >= 1"
            color="green"
            icon="mdi-barcode"
            title="Overview"
            value="Catalog"
            @click="reDirect('Product Catalog', -1)"
          />
        </v-flex>
        <v-flex
          sm6
          xs12
          md6
          lg3>
          <material-stats-card
            v-if="user_info.job_level >= 2"
            color="red"
            icon="mdi-buffer"
            title="Personal"
            value="My Inventory"
            @click="reDirect('Inventory', 0)"
          />
        </v-flex>
        <v-flex
          sm6
          xs12
          md6
          lg3>
          <material-stats-card
            v-if="user_info.job_level >= 2"
            color="orange"
            icon="mdi-package-variant"
            title="Action"
            value="Supply"
            @click="reDirect('Supply', -1)"
          />
        </v-flex>
        <v-flex
          sm6
          xs12
          md6
          lg3>
          <material-stats-card
            v-if="user_info.job_level >= 3"
            color="brown"
            icon="mdi-cart"
            title="Register"
            value="Add Product"
            @click="reDirect('Add Product', -1)"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Stores',
  data: () => ({
    authlvl1: 1,
    authlvl2: 2,
    authlvl3: 1
  }),
  computed: {
    ...mapGetters({
      user_info: 'UserModule/getUserInfo'
    })
  },
  methods: {
    ...mapActions(['setSnackbar']),
    setSnack: function (txt) {
      var payload = { text: txt }
      this.setSnackbar(payload)
    },
    reDirect: function (name, id) {
      if (id == 0) {
        this.$router.push({
          name: name,
          params: { id: this.user_info.store_id }
        })
      } else {
        this.$router.push({ name: name })
      }
    }
  }
}
</script>
<style>
.v-input__append-outer .v-icon,
.v-input__prepend-outer .v-icon {
  color: white;
}
.tileS {
  color: #424242 !important;
  caret-color: #424242 !important;
  background-color: #e6e5e5 !important;
  border: 3px solid #424242 !important;
  border-radius: 20px;
}
.focusCS {
  color: #d80a03 !important;
  caret-color: #d80a03 !important;
  background-color: #ffffff !important;
  border: 3px solid #d80a03 !important;
  border-radius: 20px;
}
</style>
