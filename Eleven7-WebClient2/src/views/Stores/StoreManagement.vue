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
        lg3 >
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
        lg3 >
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Stores',
  data: () => ({
    menus: [
      { name: 'Store List', route_name: 'Store Management List', param: false },
      { name: 'Inventory', route_name: 'Inventory', param: true },
      { name: 'Sales', route_name: 'Sales', param: true },
      { name: 'Stats', route_name: 'Stats', param: true }
    ]
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
        this.$router.push({ name: name, params: { id: this.user_info.store_id } })
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
