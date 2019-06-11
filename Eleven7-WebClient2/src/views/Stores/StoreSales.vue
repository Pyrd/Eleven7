<template>
  <v-container>
    <v-layout
      wrap
      justify-center>
      <v-flex xs12>
        <material-card
          color="purple"
          title="Sales Overview">
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
              sm2
              style="display: flex;justify-content: right">
              <v-select
                v-model="mode"
                :items="items"/>
            </v-flex>
            <v-flex
              xs12
              sm2
              style="display: flex;justify-content: right">
              <v-btn
                flat
                color="grey darken-2"
                @click="loadSales">
                <v-icon>mdi-refresh</v-icon>Refresh
              </v-btn>
            </v-flex>
          </v-layout>
          <v-data-table
            :headers="headers"
            :items="sales"
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
              <td class="text-xs-center">{{ props.item.sale_id }}</td>
              <td class="text-xs-center">{{ props.item.store_id }}</td>
              <td class="text-xs-center">{{ props.item.sale_date }}</td>
              <td class="text-xs-center">{{ props.item.total_price }}</td>
              <td class="text-xs-center">{{ props.item.total_item }}</td>
              <td class="text-xs-center">
                <v-tooltip left>
                  <v-btn
                    slot="activator"
                    flat
                    icon
                    class="green"
                    @click="Seecart(props.item.sale_id)"
                  >
                    <v-icon>mdi-cart</v-icon>
                  </v-btn>
                  <span>See sale info</span>
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
import * as services from '../../services/storeService'
export default {
  name: 'Sales',
  data: () => ({
    filter_nav: false,
    showAdvanced: false,
    showFilters: false,
    isLoading: true,
    filters: {
      search: ''
    },
    headers: [
      { text: 'Sale ID', align: 'center', value: 'sale_id' },
      { text: 'Store ID', align: 'center', value: 'store_id' },
      { text: 'Sale Date', align: 'center', value: 'sale_date' },
      { text: 'Total Price', align: 'center', value: 'total_price' },
      { text: 'Total Items', align: 'center', value: 'total_items' }
    ],
    defaultSet: {
      descending: true,
      page: 1,
      rowsPerPage: 50,
      sortBy: '',
      totalItems: 200
    },
    sales: [],
    items: ['All', 'Last Week', 'Last 24h'],
    mode: 'All'
  }),
  methods: {
    ...mapActions(['setSnackbar']),
    setSnack: function (txt) {
      var payload = { text: txt }
      this.setSnackbar(payload)
    },
    Seecart: function (id) {
      this.$router.push({ name: 'Cart', params: { id: id } })
    },
    loadSales: async function () {
      this.isLoading = true
      this.sales = []
      switch (this.mode) {
        case 'All':
          this.sales = await services.getAllSales()
          break
        case 'Last Week':
          // this.sales = await services.getWeekSales();
          break
        case 'Last 24h':
          // this.sales = await services.getDaySales();
          break
      }
      // console.log("Sales : " + JSON.stringify(this.sales, null, 4));
      this.isLoading = false
      this.setSnack('Loaded succesfuly')
    },
    goBack: function () {
      this.$router.go(-1)
      // this.$router.push({ name: "Store Management" });
    }
  },
  mounted () {
    this.loadSales()
  }
}
</script>
<style>
.v-input__append-outer .v-icon,
.v-input__prepend-outer .v-icon {
  color: white;
}
</style>
