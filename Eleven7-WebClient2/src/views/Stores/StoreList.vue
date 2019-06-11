<template>
  <v-container>
    <v-layout
      wrap
      justify-center>
      <v-flex xs12>
        <material-card
          color="green"
          title="Store Overview">
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
                @click="loadStores">
                <v-icon>mdi-refresh</v-icon>Refresh
              </v-btn>
            </v-flex>
          </v-layout>
          <v-data-table
            :headers="headers"
            :items="stores"
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
              <td class="text-xs-center">{{ props.item.store_id }}</td>
              <td class="text-xs-center">{{ props.item.size }}</td>
              <td class="text-xs-center">{{ props.item.city_name }}</td>
              <td class="text-xs-center">{{ props.item.country }}</td>
              <td class="text-xs-center">
                <v-tooltip left>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      flat
                      icon
                      class="green"
                      @click="Seestore(props.item.store_id)">
                      <v-icon>mdi-store</v-icon>
                    </v-btn>
                  </template>
                  <span>See Store</span>
                </v-tooltip>

                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      flat
                      icon
                      class="green"
                      @click="SeeInventory(props.item.store_id)">
                      <v-icon>mdi-buffer</v-icon>
                    </v-btn>
                  </template>
                  <span>See Inventory</span>
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
  name: 'StoreList',
  data: () => ({
    filter_nav: false,
    showAdvanced: false,
    showFilters: false,
    isLoading: true,
    filters: {
      search: ''
    },
    headers: [
      { text: 'ID', align: 'center', value: 'store_id' },
      { text: 'Effectif', align: 'center', value: 'size' },
      { text: 'City Name', align: 'center', value: 'city_name' },
      { text: 'Country', align: 'center', value: 'Country' },
      { text: 'Action', align: 'center', value: '' }
    ],
    defaultSet: {
      descending: true,
      page: 1,
      rowsPerPage: 50,
      sortBy: '',
      totalItems: 200
    },
    stores: []
  }),
  methods: {
    ...mapActions(['setSnackbar']),
    setSnack: function (txt) {
      var payload = { text: txt }
      this.setSnackbar(payload)
    },
    Seestore: function (id) {
      this.$router.push({ name: 'Store Profile', params: { id: id } })
    },
    SeeInventory: function (id) {
      this.$router.push({ name: 'Inventory', params: { id: id } })
    },
    loadStores: async function () {
      this.stores = await services.getAll()
      this.isLoading = false
      this.setSnack('Loaded succesfuly')
    },
    goBack: function () {
      this.$router.go(-1)
      // this.$router.push({ name: "Store Management" });
    }
  },
  mounted () {
    this.loadStores()
  }
}
</script>
<style>
.v-input__append-outer .v-icon,
.v-input__prepend-outer .v-icon {
  color: white;
}
</style>
