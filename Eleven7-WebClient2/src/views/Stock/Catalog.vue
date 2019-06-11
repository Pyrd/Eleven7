<template>
  <v-container>
    <v-layout
      wrap
      justify-center>
      <v-flex xs12>
        <material-card
          color="green"
          title="Catalog Overview">
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
              sm4>
              <v-text-field
                v-model="filters.search"
                flat
                width="10%"
                color="blue"
                solo
                prepend-icon="mdi-magnify"
                label="Search in Table"
              />
              <v-select
                v-model="filters.category_id"
                :items="filters_categories"
                label="Filter by Category"
                outline
                item-value="category_id"
                item-text="name"
                @input="filterByCat()"
              />
            </v-flex>
            <v-flex
              xs12
              sm7
              style="display: flex;justify-content: right">
              <v-btn
                flat
                color="grey darken-2"
                @click="addProduct">
                <v-icon>mdi-plus</v-icon>Add a product
              </v-btn>
              <v-btn
                flat
                color="grey darken-2"
                @click="refresh">
                <v-icon>mdi-refresh</v-icon>Refresh
              </v-btn>
            </v-flex>
          </v-layout>
          <v-data-table
            :headers="headers"
            :items="displayProduct"
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
              <td class="text-xs-center">{{ props.item.price_tag }}</td>
              <td class="text-xs-center">{{ props.item.description }}</td>
              <td class="text-xs-center">

                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      flat
                      icon
                      class="green"
                      @click="Seeitem(props.item.product_id)">
                      <v-icon>mdi-alert-box</v-icon>
                    </v-btn>
                  </template>
                  <span>See Item</span>
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
  name: 'Catalog',
  data: () => ({
    isLoading: true,
    filters: {
      search: '',
      category_id: -1
    },
    headers: [
      { text: 'Product ID', align: 'center', value: 'store_id' },
      { text: 'Name', align: 'center', value: 'first_name' },
      { text: 'Category', align: 'center', value: 'last_name' },
      { text: 'Price Tag ($)', align: 'center', value: 'birthdate' },
      { text: 'Description', align: 'center', value: 'email' },
      { text: 'Action', align: 'center', value: '' }
    ],
    defaultSet: {
      descending: true,
      page: 1,
      rowsPerPage: 50,
      sortBy: '',
      totalItems: 200
    },
    products: [],
    displayProduct: [],
    filters_categories: [],
    categories: []
  }),
  methods: {
    ...mapActions(['setSnackbar']),
    setSnack: function (txt) {
      var payload = { text: txt }
      this.setSnackbar(payload)
    },
    Seeitem: function (id) {
      this.$router.push({ name: 'Product', params: { id: id } })
    },
    loadProducts: async function () {
      this.products = await services.getAll()
      this.displayProduct = this.products
      var cat = await services.getCategories()
      if (cat) this.categories = [...cat]
      this.filters_categories = [{ category_id: -1, name: 'All' }, ...cat]
      this.isLoading = false
    },
    refresh: async function () {
      this.products = []
      this.isLoading = true
      this.products = await services.getAll()
      this.isLoading = false
    },
    addProduct: function () {
      this.$router.push({ name: 'Add Product' })
    },
    filterByCat () {
      if (this.filters.category_id != -1) {
        this.displayProduct = []
        let tmp = []
        for (var i = 0; i < this.products.length; i++) {
          if (this.products[i].category_id == this.filters.category_id) {
            tmp.push(this.products[i])
          }
        }
        this.displayProduct = tmp
      } else {
        this.displayProduct = this.products
      }
    },
    goBack: function () {
      this.$router.go(-1)
    }
  },
  mounted () {
    this.loadProducts()
  }
}
</script>
<style>
.v-input__append-outer .v-icon,
.v-input__prepend-outer .v-icon {
  color: white;
}
</style>
