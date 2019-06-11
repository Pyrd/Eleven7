<template>
  <v-container>
    <v-layout
      wrap
      justify-center>
      <v-flex xs12>
        <material-card
          :title="InventoryTitle"
          color="green">
          <v-layout
            row
            align-center
            justify-space-between>
            <v-flex
              xs12
              sm1
              md1>
              <v-btn
                color="grey darken-2"
                icon
                @click="goBack()">
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
            </v-flex>
            <v-flex
              xs12
              sm6>
              <v-text-field
                v-model="filters.search"
                flat
                width="10%"
                color="blue"
                solo
                prepend-icon="mdi-magnify"
                label="Search in Table"
                @keyup="SearchFilter()"
              />
            </v-flex>
            <v-flex
              xs12
              sm4
              style="display: flex;justify-content: right">
              <v-btn
                flat
                color="grey darken-2"
                @click="loadInventory">
                <v-icon>mdi-refresh</v-icon>Refresh
              </v-btn>
            </v-flex>
          </v-layout>
          <v-data-table
            :headers="headers"
            :items="inventory"
            :search="filters.search"
            :pagination.sync="defaultSet"
            :loading="isLoading"
            class="elevation-1"
          >
            <v-progress-linear
              v-slot:progress
              color="blue"
              indeterminate/>
            <template v-slot:items="props">
              <td class="text-xs-center">{{ props.item.product_id }}</td>
              <td class="text-xs-center">{{ props.item.name }}</td>
              <td class="text-xs-center">{{ props.item.category_name }}</td>
              <td class="text-xs-center">{{ props.item.quantity }}</td>
              <td class="text-xs-center">
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      flat
                      icon
                      class="green"
                      @click="Seeitem(props.item.product_id)">
                      <v-icon>mdi-alert-circle-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>See Product</span>
                </v-tooltip>
              </td>
            </template>
            <template v-slot:no-results>
              <v-alert
                :value="true"
                color="error"
                icon="mdi-warning"
              >Your search for "{{ filters.search }}" found no results.</v-alert>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as services from '../../services/stockService'
export default {
  name: '',
  data: () => ({
    filter_nav: false,
    showAdvanced: false,
    showFilters: false,
    isLoading: true,
    filters: {
      search: '',
      firstname: '',
      rating: { active: false, mask: 0 },
      price: { active: false, min: 0, max: 2000000 }
    },
    headers: [
      { text: 'ID', align: 'center', value: 'product_id' },
      { text: 'Product Name', align: 'center', value: 'name' },
      { text: 'Category', align: 'center', value: 'category_name' },
      { text: 'Quantity', align: 'center', value: 'quantity' },
      { text: 'Action', align: 'center', value: '' }
    ],
    defaultSet: {
      descending: true,
      page: 1,
      rowsPerPage: 50,
      sortBy: '',
      totalItems: 200
    },
    inventory: [],
    id: null
  }),
  computed: {
    InventoryTitle () {
      return 'Inventory · Store ID n°' + this.$route.params.id
    }
  },
  methods: {
    ...mapActions(['setSnackbar']),
    setSnack: function (txt) {
      var payload = { text: txt }
      this.setSnackbar(payload)
    },
    Seeitem: function (id) {
      this.$router.push({ name: 'Product', params: { id: id } })
    },
    loadInventory: async function (id) {
      this.inventory = await services.getInventoryById(id)
      this.isLoading = false
    },
    goBack: function () {
      this.$router.go(-1)
    }
  },
  mounted () {
    this.id = this.$route.params.id
    this.loadInventory(this.id)
  }
}
</script>
<style>
.v-input__append-outer .v-icon,
.v-input__prepend-outer .v-icon {
  color: white;
}
</style>
