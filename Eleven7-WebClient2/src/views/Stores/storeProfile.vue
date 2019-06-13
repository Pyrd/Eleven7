<template>
  <v-content style="padding: 0px">
    <material-card
      class="card-tabs"
      color="green">
      <v-flex slot="header">
        <v-tabs
          v-model="tabs"
          color="transparent"
          slider-color="white">
          <v-btn
            color="transparent"
            icon
            style="margin:0px 1px"
            @click="goBack()">
            <v-icon color="white">mdi-arrow-left</v-icon>
          </v-btn>
          <span
            class="subheading font-weight-light ml-2 mr-3"
            style="align-self: center">
            Store ID
            <span style="color=orange">{{ id }}</span>
          </span>
          <v-tab class="mr-3">
            <v-icon class="mr-2">chart-bubble</v-icon>Infos
          </v-tab>
          <v-tab class="mr-3">
            <v-icon class="mr-2">mdi-account-group</v-icon>Staff
          </v-tab>
          <v-tab class="mr-3">
            <v-icon class="mr-2">mdi-buffer</v-icon>Inventory
          </v-tab>
          <v-tab class="mr-3">
            <v-icon class="mr-2">mdi-cash-usd</v-icon>Sales
          </v-tab>
          <v-tab class="mr-3">
            <v-btn  class="mr-2" flat icon @click="SeeStats"><v-icon >chart-timeline-variant</v-icon>Stats</v-btn>
          </v-tab>
        </v-tabs>
      </v-flex>

      <v-tabs-items v-model="tabs">
        <v-tab-item key="1">
          <material-card
            color="red"
            title="About this store">
            <v-card-text>
              Total staff : <span class="title">{{ store.size }}</span>
              <br>
              Address :
              <span
                class="title"
              >{{ store.street_num }} {{ store.address_1 }}{{ store.address_2 }}, {{ store.zip_code }} {{ store.city_name }},{{ store.country }}</span>
            </v-card-text>
          </material-card>
        </v-tab-item>
        <v-tab-item key="2">
          <material-card
            color="blue"
            title="Staff">
            <v-data-table
              :headers="headers"
              :items="employees"
              :pagination.sync="defaultSet"
              :loading="isLoading"
              class="elevation-1"
            >
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
                <td>{{ props.item.employee_id }}</td>
                <td class="text-xs-center">{{ props.item.job }}</td>
                <td class="text-xs-center">{{ props.item.first_name }}</td>
                <td class="text-xs-center">{{ props.item.last_name }}</td>
                <td class="text-xs-center">{{ props.item.email_address }}</td>
                <td class="text-xs-center">{{ props.item.phone_number }}</td>
                <td class="text-xs-center">
                  <v-tooltip right>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        flat
                        icon
                        class="green"
                        @click="Seeprofile(props.item.employee_id)">
                        <v-icon>mdi-account-box</v-icon>
                      </v-btn>
                    </template>
                    <span>See profile</span>
                  </v-tooltip>
                </td>
              </template>
              <template v-slot:no-results>
                <v-alert
                  :value="true"
                  color="error"
                  icon="warning"
                >Your search for "{{ filters.search }}" found no results.</v-alert>
              </template>
            </v-data-table>
          </material-card>
        </v-tab-item>

        <v-tab-item key="3">
          <material-card
            color="warning"
            title="Inventory Overview">
            <v-layout
              row
              align-center
              justify-end>
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
              :headers="headers3"
              :items="inventory"
              :search="filters.search"
              :pagination.sync="defaultSet"
              :loading="isLoading"
              class="elevation-1"
            >
              <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="font-weight-light orange--text text--darken-2"
                v-text="header.text"
              />
            </template>
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
        </v-tab-item>
        <v-tab-item key="4">
          <material-card
            color="purple"
            title="Sales Overview">
            <v-layout
              row
              align-center
              justify-space-between>
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
              :headers="headers2"
              :items="sales"
              :search="filters.search"
              :pagination.sync="defaultSet"
              :loading="isLoading"
              class="elevation-1"
            >
              <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="font-weight-light purple--text text--darken-3"
                v-text="header.text"
              />
            </template>
              <template v-slot:items="props">
                <td class="text-xs-center">{{ props.item.sale_date }}</td>
                <td class="text-xs-center">{{ props.item.total_price }}</td>
                <td class="text-xs-center">{{ props.item.total_item }}</td>
                <td class="text-xs-center">
                  <v-tooltip right>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        flat
                        icon
                        class="green"
                        @click="Seecart(props.item.sale_id)">
                        <v-icon>mdi-cart</v-icon>
                      </v-btn>
                    </template>
                    <span>See Cart</span>
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
        </v-tab-item>
        <v-tab-item key="5"/>
      </v-tabs-items>
    </material-card>
  </v-content>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as store_services from '../../services/storeService'
import * as employee_services from '../../services/employeeService'
import * as stock_services from '../../services/stockService'
export default {
  name: 'StoreProfile',
  data: () => ({
    tabs: 1,
    display: true,
    id: -1,
    edit: false,
    valid_one: false,
    store: {},
    employees: [],
    sales: [],
    inventory: [],
    headers: [
      {
        text: 'ID',
        align: 'left',
        sortable: true,
        value: 'id'
      },
      { text: 'Status', align: 'center', value: 'job' },
      { text: 'First name', align: 'center', value: 'first_name' },
      { text: 'Last name', align: 'center', value: 'last_name' },
      { text: 'Email', align: 'center', value: 'email' },
      { text: 'Phone', align: 'center', value: 'phone' },
      { text: 'Action', align: 'center', value: '' }
    ],

    headers2: [
      { text: 'Sale Date', align: 'center', value: 'sale_date' },
      { text: 'Total Price', align: 'center', value: 'total_price' },
      { text: 'Total Items', align: 'center', value: 'total_items' }
    ],
    headers3: [
      { text: 'ID', align: 'center', value: 'product_id' },
      { text: 'Product Name', align: 'center', value: 'name' },
      { text: 'Category', align: 'center', value: 'category_name' },
      { text: 'Quantity', align: 'center', value: 'quantity' },
      { text: 'Action', align: 'center', value: '' }
    ],
    isLoading: true,
    filters: {
      search: '',
      firstname: '',
      rating: { active: false, mask: 0 },
      price: { active: false, min: 0, max: 2000000 }
    },
    defaultSet: {
      descending: true,
      page: 1,
      rowsPerPage: 50,
      sortBy: 'job',
      totalItems: 200
    },
    items: [
      'All', 'Last Week', 'Last 24h'
    ],
    mode: 'All'
  }),
  methods: {
    ...mapActions(['setSnackbar']),
    async init (id) {
      var store = await store_services.getStoreById(id)
      if (store) this.store = store[0]
      var staff = await employee_services.getEmployeesByStoreId(id)
      if (staff) this.employees = staff
      var sales = await this.loadSales(id)
      if (sales) this.sales = sales
      var inventory = await this.loadInventory(id)
      if (inventory) this.inventory = inventory
      this.isLoading = false
    },
    setSnack: function (txt) {
      var payload = { text: txt }
      this.setSnackbar(payload)
    },
    goBack: function () {
      this.$router.go(-1)
      // this.$router.push({ name: "Store Management List" });
    },
    Seecart: function (id) {
      this.$router.push({ name: 'Cart', params: { id: id } })
    },
    SeeStats: function () {
      this.$router.push({ name: 'Store Stats', params: { id: this.id } })
    },
    Seeprofile: function (id) {
      this.$router.push({ name: 'Employee Profile', params: { id: id } })
    },
    loadSales: async function (id) {
      this.isLoading = true
      this.sales = []
      var tsales = []
      switch (this.mode) {
        case 'All':
          tsales = await store_services.getAllSales()
          break
        case 'Last Week':
          // tsales = await store_services.getWeekSales();
          this.setSnack('Feature not implemented')
          break
        case 'Last 24h':
          // tsales = await store_services.getDaySales();
          this.setSnack('Feature not implemented')
          break
      }
      //console.log('Sales : ' + JSON.stringify(tsales, null, 4))
      if (tsales) this.sales = tsales
      this.isLoading = false
      this.setSnack('Loaded succesfuly')
    },
    Seeitem: function (id) {
      this.$router.push({ name: 'Product', params: { id: id } })
    },
    loadInventory: async function (id) {
      this.inventory = await stock_services.getInventoryById(id)
      this.isLoading = false
    }
  },
  created () {
    this.id = this.$route.params.id
    this.init(this.$route.params.id)
  }
}
</script>
<style>
.disable-events {
  pointer-events: none;
}

.form {
  width: 80%;
  border: 1px solid #424242;
  border-radius: 15px;
  padding: 20px;
  margin: 0px auto;
}
.formedit {
  border: 1px solid rgba(9, 113, 248, 0.87) !important;
}
</style>
