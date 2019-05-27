<template>
  <v-card>
    <v-toolbar :extended="filter_nav" dense class="grey darken-2 white--text">
      <v-btn icon class="white--text" @click="goBack"><v-icon>arrow_back</v-icon></v-btn>
      <v-toolbar-title class="white--text subtitle" style="margin-left:20px">Employees Management</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat class="white--text" @click="filter_nav = !filter_nav">
          <v-icon>filter_list</v-icon>Filters
        </v-btn>
        <v-btn flat class="white--text" @click="loadEmployees">
          <v-icon>refresh</v-icon>Refresh
        </v-btn>
      </v-toolbar-items>
      <template v-slot:extension v-if="filter_nav">
        <v-layout row align-center justify-center>
          <v-flex xs12 sm6>
            <v-text-field
              flat
              width="10%"
              color="blue"
              solo
              prepend-icon="search"
              label="Search in Table"
              v-model="filters.search"
              v-on:keyup="SearchFilter()"
            ></v-text-field>
          </v-flex>
          
        </v-layout>
      </template>
    </v-toolbar>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="employees"
        :search="filters.search"
        class="elevation-1"
        :pagination.sync="defaultSet"
        :loading="isLoading"
      >
      <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
        <template v-slot:items="props">
          <td>{{ props.item.employee_id }}</td>
          <td class="text-xs-center">{{ props.item.store_id}}</td>
          <td class="text-xs-center">{{ props.item.first_name }}</td>
          <td class="text-xs-center">{{ props.item.last_name }}</td>
          <td class="text-xs-center">{{ props.item.birthdate }}</td>
          <td class="text-xs-center">{{ props.item.email_address }}</td>
          <td class="text-xs-center">{{ props.item.phone_number }}</td>
          <td class="text-xs-center">
            <v-btn flat @click="Seemore(props.item.employee_id)">More</v-btn>
          </td>
        </template>
        <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ filters.search }}" found no results.
        </v-alert>
      </template>
      </v-data-table>
    </v-card-text>
    
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import * as services from '../../services/employeeService';
export default {
  name: "Employees",
  data: () => ({
    filter_nav: false,
    showAdvanced: false,
    showFilters: false,
    isLoading: true,
    filters: {
      search: "",
      firstname: "",
      rating: { active: false, mask: 0 },
      price: { active: false, min: 0, max: 2000000 }
    },
    custom_query: "SELECT * FROM employees",
    headers: [
      {
        text: "ID",
        align: "left",
        sortable: true,
        value: "id"
      },
      { text: "Store ID", value: "store_id" },
      { text: "First name", value: "first_name" },
      { text: "Last name", value: "last_name" },
      { text: "Birthdate", value: "birthdate" },
      { text: "Email", value: "email" },
      { text: "Phone", value: "phone" },
      { text: "Action", value: "" }
    ],
    defaultSet:{
      descending: true,
      page: 1,
      rowsPerPage: 50,
      sortBy: '',
      totalItems: 200
  },
    employees: []
  }),
  methods: {
    ...mapActions(["setSnackbar"]),
    ...mapActions("EmployeesModule", ["loadEmployees"]),
    setSnack: function(txt) {
      var payload = { text: txt };
      this.setSnackbar(payload);
    },
    Seemore: function(id) {
      this.$router.push({ name: 'employee_profile', params: { id: id }})
    },
    loadEmployeees: async function(){
      this.employees = await services.getAll();
      this.isLoading = false;
    },
    goBack: function(){
      this.$router.push({name:'employees'})
    }
  },
  mounted() {
    this.loadEmployeees();
    
  }
};
</script>
<style>
.v-input__append-outer .v-icon,
.v-input__prepend-outer .v-icon {
  color: white;
}
</style>
