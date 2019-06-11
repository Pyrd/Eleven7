<template>
  <v-container>
    <v-layout
      wrap
      justify-center>
      <v-flex xs12>
        <material-card
          :title="saleName"
          color="orange">
          <v-card-actions>
            <v-layout
              wrap
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
                />
              </v-flex>
              <v-flex
                xs12
                sm4
                style="display: flex;justify-content: right; align-content:center">
                <v-btn
                  flat
                  color="grey darken-2"
                  @click="loadItem()">
                  <v-icon>mdi-refresh</v-icon>Refresh
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card-actions>
          <v-card-actions>
            <v-layout
              row
              align-center
              justify-space-between>
              <v-flex xs6>
                <span class="subheading ">Total Amount : </span>
                <span class="title green--text">{{ sale.total_price }} $</span>
              </v-flex>
              <v-flex xs2>
                <span class="subheading ">Items  : </span>
                <span class="ml-3 title grey--text text--darken-3">{{ sale.total_item }} </span>
              </v-flex>
            </v-layout>
          </v-card-actions>
          <v-data-table
            :headers="headers"
            :items="sales_products"
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
              <td class="text-xs-center">{{ props.item.quantity }}</td>
              <td class="text-xs-center">{{ props.item.price_tag }}</td>
              <td class="text-xs-center">
                <v-tooltip left>
                  <v-btn
                    slot="activator"
                    flat
                    icon
                    class="green"
                    @click="Seeitem(props.item.product_id)">
                    <v-icon>mdi-alert-circle</v-icon>
                  </v-btn>
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
import * as services from '../../services/storeService'
import { async } from 'q'
export default {
  name: 'Cart',
  data: () => ({
    id: -1,
    isLoading: true,
    filters: {
      search: ''
    },
    headers: [
      { text: 'Product ID', align: 'center', value: 'product_id' },
      { text: 'Product Name', align: 'center', value: 'name' },
      { text: 'Quantity', align: 'center', value: 'quantity' },
      { text: 'Price', align: 'center', value: 'price_tag' }
    ],
    defaultSet: {
      descending: true,
      page: 1,
      rowsPerPage: 50,
      sortBy: '',
      totalItems: 200
    },
    item: [],
    sale: {},
    sales_products: []
  }),
  computed: {
    saleName () {
      return 'Sale #' + this.id
    }
  },
  mounted () {
    this.id = this.$route.params.id
    this.loadSales(this.id)
  },
  methods: {
    Seeitem: function (id) {
      this.$router.push({ name: 'Product', params: { id: id } })
    },
    loadSales: async function (id) {
      this.isLoading = true
      let tmp = await services.getSaleById(id)
      if (tmp) this.sale = tmp[0]
      let res = await this.loadItem()
      this.isLoading = false
    },
    loadItem: async function () {
      this.sales_products = await services.getProductSalesById(this.id)
      return 1
    },
    goBack: function () {
      this.$router.go(-1)
    }
  }
}
</script>
<style>
.v-input__append-outer .v-icon,
.v-input__prepend-outer .v-icon {
  color: white;
}
</style>
