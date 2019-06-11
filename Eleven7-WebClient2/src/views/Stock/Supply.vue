<template>
  <v-container>
    <v-layout
      wrap
      justify-center>
      <v-flex xs12>
        <material-card
          color="green"
          title="Employee Overview">
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
                @click="loadEmployees">
                <v-icon>mdi-refresh</v-icon>Refresh
              </v-btn>
            </v-flex>
          </v-layout>
          <v-data-table
            :headers="headers"
            :items="employees"
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
              <td class="text-xs-center">{{ props.item.employee_id }}</td>
              <td class="text-xs-center">{{ props.item.store_id }}</td>
              <td class="text-xs-center">{{ props.item.first_name }}</td>
              <td class="text-xs-center">{{ props.item.last_name }}</td>
              <td class="text-xs-center">{{ props.item.birthdate }}</td>
              <td class="text-xs-center">{{ props.item.email_address }}</td>
              <td class="text-xs-center">{{ props.item.phone_number }}</td>
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
import * as services from '../../services/employeeService'
export default {
  name: 'Employees',
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
      {
        text: 'ID',
        align: 'center',
        sortable: true,
        value: 'id'
      },
      { text: 'Store ID', align: 'center', value: 'store_id' },
      { text: 'First name', align: 'center', value: 'first_name' },
      { text: 'Last name', align: 'center', value: 'last_name' },
      { text: 'Birthdate', align: 'center', value: 'birthdate' },
      { text: 'Email', align: 'center', value: 'email' },
      { text: 'Phone', align: 'center', value: 'phone' },
      { text: 'Action', align: 'center', value: '' }
    ],
    defaultSet: {
      descending: true,
      page: 1,
      rowsPerPage: 50,
      sortBy: '',
      totalItems: 200
    },
    employees: []
  }),
  methods: {
    ...mapActions(['setSnackbar']),
    ...mapActions('EmployeesModule', ['loadEmployees']),
    setSnack: function (txt) {
      var payload = { text: txt }
      this.setSnackbar(payload)
    },
    Seeprofile: function (id) {
      this.$router.push({ name: 'Employee Profile', params: { id: id } })
    },
    Seestore: function (id) {
      this.$router.push({ name: 'Store Profile', params: { id: id } })
    },
    loadEmployeees: async function () {
      this.employees = await services.getAll()
      this.isLoading = false
    },
    goBack: function () {
      this.$router.go(-1)
      // this.$router.push({ name: "Employees Management" });
    }
  },
  mounted () {
    this.loadEmployeees()
  }
}
</script>
<style>
.v-input__append-outer .v-icon,
.v-input__prepend-outer .v-icon {
  color: white;
}
</style>
