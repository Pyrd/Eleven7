<template>
  <v-container>
    <v-layout
      wrap
      justify-center>
      <v-flex xs12>
        <material-card
          color="purple"
          title="Supplies Overview">
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
                @click="loadSupply">
                <v-icon>mdi-refresh</v-icon>Refresh
              </v-btn>
            </v-flex>
          </v-layout>
          <v-data-table
            :headers="headers"
            :items="supplies"
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
                class="font-weight-light grey--text text--darken-3"
                v-text="header.text"
              />
            </template>
            <template v-slot:items="props">
              <td class="text-xs-center">{{ props.item.supply_id }}</td>
              <td class="text-xs-center">{{ props.item.store_id }}</td>
              <td class="text-xs-center">{{ props.item.supply_date }}</td>
              <td class="text-xs-center">{{ props.item.total_item }}</td>
              <td class="text-xs-center">
                <v-tooltip left>
                  <v-btn
                    slot="activator"
                    flat
                    icon
                    class="blue"
                    @click="Seeitems(props.item.supply_id)"
                  >
                    <v-icon>mdi-package-variant</v-icon>
                  </v-btn>
                  <span>See supply</span>
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
  name: 'Supply',
  data: () => ({
    filter_nav: false,
    showAdvanced: false,
    showFilters: false,
    isLoading: true,
    filters: {
      search: ''
    },
    headers: [
      { text: 'Supply ID', align: 'center', value: 'sale_id' },
      { text: 'Store ID', align: 'center', value: 'store_id' },
      { text: 'Supply Date', align: 'center', value: 'supply_date' },
      { text: 'Total Items', align: 'center', value: 'total_items' },
      { text: 'Actions', align: 'center', value: 'actions' },
    ],
    defaultSet: {
      descending: true,
      page: 1,
      rowsPerPage: 50,
      sortBy: '',
      totalItems: 200
    },
    supplies: [],
    items: ['All', 'Last Week', 'Last 24h'],
    mode: 'All'
  }),
  methods: {
    ...mapActions(['setSnackbar']),
    setSnack: function (txt) {
      var payload = { text: txt }
      this.setSnackbar(payload)
    },
    Seeitems: function (id) {
      this.$router.push({ name: 'SupplyItems', params: { id: id } })
    },
    nowDate () {
      let date = new Date()
      let day = date.getDate()
      let h = date.getHours()
      let m = date.getMinutes()
      let s = date.getSeconds()
      let day_t = day < 10 ? '0' + day : '' + day
      let qdate = [day_t, date.getMonth(), date.getFullYear()]
      return qdate
    },
    loadSupply: async function () {
      this.isLoading = true
      this.supplies = []
      let parameters = {
        date : this.nowDate(),
        query_mode : 0,
        store_id : -1
      }
      switch (this.mode) {
        case 'Last Week':
          parameters.query_mode = 1
          break
        case 'Last 24h':
          parameters.query_mode = 2
          break
      }
      let res = await services.getSupply(parameters)
      console.log(JSON.stringify(res, null, 4))
      if(res.err){
        this.setSnack('An error occured : ' +  res.err)
      } else{
        this.setSnack('Loaded succesfully')
        this.supplies = res.result
      }
      this.isLoading = false
      
    },
    goBack: function () {
      this.$router.go(-1)
      // this.$router.push({ name: "Store Management" });
    }
  },
  mounted () {
    this.loadSupply()
  }
}
</script>
<style>
.v-input__append-outer .v-icon,
.v-input__prepend-outer .v-icon {
  color: white;
}
</style>
