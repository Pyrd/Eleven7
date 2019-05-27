<template>
  <v-card>
    <v-toolbar dense class="grey darken-2 white--text">
      <v-btn icon class="white--text" @click="goBack">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="white--text subtitle" style="margin-left:20px">Employees Management</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items></v-toolbar-items>
    </v-toolbar>

    <v-card-actions>
      <v-layout align-center justify-space-between >
        <v-flex xs12 sm2 v-for="filter in filters" :key="filter.name">
          <v-text-field
            flat
            width="10%"
            color="blue"
            outline
            clearable
            :label="filter.label"
            v-model="filter.mask"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-card-actions>
    <v-card-actions>
      <MultiSelector label="First Name" v-model="tester"></MultiSelector>
    </v-card-actions>
    <v-card-actions>
      <v-layout row align-center>
        <v-flex xs2>
          <v-select v-if="isMultiple" v-model="separator" :items="separators" label="Separator" solo></v-select>
          <p>{{this.tester}}</p>
        </v-flex>
        <v-spacer/>
        <v-flex xs2>
          <v-btn v-if="isReset" color="red lighten-2" class="white--text" @click="ResetFilters">
            <v-icon>close</v-icon>Reset
          </v-btn>
        </v-flex>
        <v-flex xs2>
          <v-btn @click="searchEmployee" color="primary" :disabled="!isReset">
            <v-icon>search</v-icon>Search
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card-actions>
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
          <v-alert
            :value="true"
            color="error"
            icon="warning"
          >Your search for "{{ filters.search }}" found no results.</v-alert>
        </template>
      </v-data-table>
    </v-card-text>
    <v-dialog v-model="showAdvanced" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Write custom SQL Query</v-card-title>

        <v-card-text>
          <v-textarea v-model="custom_query" auto-grow box label="Custom query" rows="3"></v-textarea>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="error" flat @click="showAdvanced = false">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" class="white--text" flat @click="showAdvanced = true">Send Request</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import * as services from "../../services/employeeService";
import MultiSelector from "../../components/MultiSelector"
export default {
  name: "Employees",
  components : {
    MultiSelector
  },
  data: () => ({
    filters: [
      { label: "Name", name: "first_name", mask: "", rules: "" },
      { label: "Birthdate", name: "birthdate", mask: "", rules: "" },
      { label: "Email", name: "email_address", mask: "" },
      { label: "Phone", name: "phone_number", mask: "" }
    ],
    tester : [],
    filter_nav: false,
    showAdvanced: false,
    showFilters: false,
    isLoading: false,
    separator: "AND",
    separators: ["AND", "OR"],
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
    defaultSet: {
      descending: true,
      page: 1,
      rowsPerPage: 50,
      sortBy: "",
      totalItems: 200
    },
    employees: []
  }),
  computed: {
    isReset() {
      for (var i = 0; i < this.filters.length; i++) {
        if (this.filters[i].mask != "") return true;
      }
      return false;
    },
    isMultiple() {
      var j = 0;
      for (var i = 0; i < this.filters.length; i++) {
        if (this.filters[i].mask != "") j += 1;
        if (j > 1) return true;
      }
      return false;
    }
  },
  methods: {
    ...mapActions(["setSnackbar"]),
    setSnack: function(txt) {
      var payload = { text: txt };
      this.setSnackbar(payload);
    },
    Seemore: function(id) {
      this.$router.push({ name: "employee_profile", params: { id: id } });
    },
    searchEmployee: async function() {
      this.isLoading = true;
      let t = true;
      if (this.separator == "OR") t = false;
      this.filters.forEach(e =>{if(e.mask == null){e.mask = ''}})
      let payload = { separator: t, filters: this.filters };
      let res = await services.search_employee(payload);
      if(!res){
        this.setSnack("Something bad happened");
      }
      else {
        if (res.err) {
          this.setSnack(res.err);
        } else {
          this.setSnack("Query succesful");
          this.employees = res.result;
        }
      }
      this.isLoading = false;
    },
    UpdateFilter(name, filter){
      console.log(name)
      console.log(filter)
    },
    ResetFilters() {
      this.filters.forEach(ele => {
        ele.mask = "";
      });
    },
    goBack: function() {
      this.$router.push({ name: "employees" });
    }
  }
};
</script>
<style>
.v-input__append-outer .v-icon,
.v-input__prepend-outer .v-icon {
  color: white;
}
</style>
