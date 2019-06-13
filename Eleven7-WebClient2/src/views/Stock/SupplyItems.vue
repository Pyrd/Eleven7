<template>
  <v-container>
    <v-layout
      wrap
      justify-center>
      <v-flex xs12>
        <material-card
          :title="supplyName"
          color="blue">
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
              <v-flex xs2>
                <span class="subheading ">Items  : </span>
                <span class="ml-3 title grey--text text--darken-3">{{ supply.total_item }} </span>
              </v-flex>
              <v-flex xs2>
                <span class="subheading ">Date  : </span>
                <span class="ml-3 title grey--text text--darken-3">{{ supply.supply_date }} </span>
              </v-flex>
            </v-layout>
          </v-card-actions>
          <v-data-table
            :headers="headers"
            :items="supplies_products"
            :search="filters.search"
            :pagination.sync="defaultSet"
            :loading="isLoading"
            class="elevation-1"
          >
            <v-progress-linear
              v-slot:progress
              color="blue"
              indeterminate/>
              <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="font-weight-light blue--text text--darken-3"
                v-text="header.text"
              />
            </template>
            <template v-slot:items="props">
              <td class="text-xs-center">{{ props.item.product_id }}</td>
              <td class="text-xs-center">{{ props.item.name }}</td>
              <td class="text-xs-center">{{ props.item.quantity }}</td>
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
  name: 'SupplyItem',
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
      { text: 'Actions', align: 'center', value: 'Actions' }
    ],
    defaultSet: {
      descending: true,
      page: 1,
      rowsPerPage: 50,
      sortBy: '',
      totalItems: 200
    },
    item: [],
    supply: {},
    supplies_products: []
  }),
  computed: {
    supplyName () {
      return 'Shipement #' + this.id
    }
  },
  mounted () {
    this.id = this.$route.params.id
    this.loadsupplies(this.id)
  },
  methods: {
    Seeitem: function (id) {
      this.$router.push({ name: 'Product', params: { id: id } })
    },
    loadsupplies: async function (id) {
      this.isLoading = true
      let tmp = await services.getSupplyById(id)
      if (tmp) this.supply = tmp[0]
      let res = await this.loadItem()
      this.isLoading = false
    },
    loadItem: async function () {
      this.supplies_products = await services.getSupplyItemById(this.id)
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
