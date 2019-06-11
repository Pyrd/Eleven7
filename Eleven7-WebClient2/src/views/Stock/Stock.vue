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
        lg3 >
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
        lg3 >
        <material-stats-card
          v-if="user_info.job_level >= 2"
          color="orange"
          icon="mdi-cart-plus"
          title="Action"
          value="Supply"
          @click="reDirect('Supply', -1)"
        />
      </v-flex>
      <v-flex
        sm6
        xs12
        md6
        lg3 >
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Inventory',
  data: () => ({
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
