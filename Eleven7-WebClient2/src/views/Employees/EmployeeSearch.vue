<template>
  <v-container>
    <v-layout
      wrap
      justify-center>
      <v-flex
        xs12
        md3>
        <material-card
          color="green"
          title="Filters">
          <v-form ref="form">
            <v-layout
              wrap
              align-center
              justify-space-between
              column>
              <v-flex
                v-for="filter in filters"
                :key="filter.name"
                xs12
                style="max-width: 88%;width:88%" >
                <v-select
                  v-if="filter.type=='selector'"
                  v-model="filter.mask"
                  :items="filter.items"
                  :label="filter.name"
                  chips
                  multiple
                  solo/>
                <MultiSelector
                  v-else
                  :label="filter.label"
                  v-model="filter.mask"/>
              </v-flex>
            </v-layout>
            <v-layout
              row
              align-center
              justify-center>
              <v-flex xs5>
                <v-select
                  v-if="isMultiple"
                  v-model="separator"
                  :items="separators"
                  label="Separator"
                  solo
                />
              </v-flex>
              <v-spacer/>
              <v-flex xs5>
                <v-btn
                  v-if="isReset"
                  color="red lighten-2"
                  class="white--text"
                  icon
                  @click="ResetFilters"
                >
                  <v-icon large>mdi-close</v-icon>
                </v-btn>
                <v-btn
                  :disabled="!isReset"
                  color="success"
                  icon
                  @click="searchEmployee">
                  <v-icon large>mdi-magnify</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-form>
        </material-card>
      </v-flex>
      <v-flex
        xs12
        md9>
        <material-card
          color="green"
          title="Output">
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
                @click="searchEmployee()">
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
              <td class="text-xs-center">{{ props.item.job }}</td>
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
import MultiSelector from '../../components/MultiSelector'
export default {
  name: 'Employees',
  components: {
    MultiSelector
  },
  data: () => ({
    filters: [
      { label: 'First name', name: 'first_name', mask: '', type: 'multi' },
      { label: 'Last name', name: 'last_name', mask: '', type: 'multi' },
      { label: 'Birthdate', name: 'birthdate', mask: '', type: 'multi' },
      { label: 'Email', name: 'email_address', mask: '', type: 'multi' },
      { label: 'Phone', name: 'phone_number', mask: '', type: 'multi' },
      { label: 'Job', name: 'job', mask: '', type: 'selector', items: ['Supervisor', 'Manager', 'Employee', 'Intership'] },
      { label: 'Salary', name: 'salary', mask: '', type: 'multi' }
    ],
    filter_nav: false,
    showAdvanced: false,
    showFilters: false,
    isLoading: false,
    separator: 'AND',
    separators: ['AND', 'OR'],
    custom_query: 'SELECT * FROM employees',
    headers: [
      {
        text: 'ID',
        align: 'center',
        sortable: true,
        value: 'id',
        width: '3%'
      },
      { text: 'Store ID', align: 'center', value: 'store_id', width: '3%' },
      { text: 'First name', align: 'center', value: 'first_name', width: '10%' },
      { text: 'Last name', align: 'center', value: 'last_name', width: '10%' },
      { text: 'Job', align: 'center', value: 'job', width: '10%' },
      { text: 'Birthdate', align: 'center', value: 'birthdate', width: '10%' },
      { text: 'Email', align: 'center', value: 'email', width: '10%' },
      { text: 'Phone', align: 'center', value: 'phone', width: '10%' },
      { text: 'Action', align: 'center', value: '', width: '10%' }
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
  computed: {
    isReset () {
      for (var i = 0; i < this.filters.length; i++) {
        if (this.filters[i].mask != '') return true
      }
      return false
    },
    isMultiple () {
      var j = 0
      for (var i = 0; i < this.filters.length; i++) {
        if (this.filters[i].mask != '') j += 1
        if (j > 1) return true
      }
      return false
    }
  },
  methods: {
    ...mapActions(['setSnackbar']),
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
    searchEmployee: async function () {
      this.isLoading = true
      let t = true
      if (this.separator == 'OR') t = false
      this.filters.forEach(e => {
        if (e.mask == null) {
          e.mask = ''
        }
      })
      let payload = { separator: t, filters: this.filters }
      let res = await services.search_employee(payload)
      if (!res) {
        this.setSnack('Something bad happened')
      } else {
        if (res.err) {
          this.setSnack(res.err)
        } else {
          this.setSnack('Query succesful')
          // console.log(res.result)
          this.employees = res.result
        }
      }
      this.isLoading = false
    },
    UpdateFilter (name, filter) {
      console.log(name)
      console.log(filter)
    },
    ResetFilters () {
      this.filters.forEach(ele => {
        ele.mask = []
      })
      this.employees = []
      // for(var i = 0; i < this.filters.length; i++){
      //   this.filters[i].mask = []
      // }
      this.isLoading = false
    },
    goBack: function () {
      this.$router.go(-1)
      // this.$router.push({ name: "employees" });
    }
  }
}
</script>
<style>
.v-input__append-outer .v-icon,
.v-input__prepend-outer .v-icon {
  color: white;
}
.form {
  width: 100%;
  padding: 20px;
  margin: 0px auto;
}
</style>
