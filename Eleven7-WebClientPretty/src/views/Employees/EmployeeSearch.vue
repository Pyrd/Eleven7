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
      <v-layout align-start justify-space-between row fill-height>
        <v-flex sm12 md4>
          <v-form ref="form">
            <v-layout wrap align-center justify-center column>
              <v-flex xs12 v-for="filter in filters" :key="filter.name" style="max-width: 88%;width:88%" >
                <v-select v-if="filter.type=='selector'" v-model="filter.mask" :items="filter.items" chips :label="filter.name" multiple solo></v-select>
                <MultiSelector v-else :label="filter.label" v-model="filter.mask"></MultiSelector>
              </v-flex>
            </v-layout>
            <v-layout row align-center justify-center>
              <v-flex xs2>
                <v-select
                  v-if="isMultiple"
                  v-model="separator"
                  :items="separators"
                  label="Separator"
                  solo
                ></v-select>
              </v-flex>
              <v-spacer/>
              <v-flex>
                <v-btn
                  v-if="isReset"
                  color="red lighten-2"
                  class="white--text"
                  @click="ResetFilters"
                >
                  <v-icon>close</v-icon>Reset
                </v-btn>
              </v-flex>
              <v-flex>
                <v-btn @click="searchEmployee" color="primary" :disabled="!isReset">
                  <v-icon>search</v-icon>Search
                </v-btn>
              </v-flex>
            </v-layout>
          </v-form>
        </v-flex>
        <v-flex sm12 md8>
          <v-form ref="form" class>
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
                <td class="text-xs-center">{{ props.item.job}}</td>
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
          </v-form>
        </v-flex>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import * as services from "../../services/employeeService";
import MultiSelector from "../../components/MultiSelector";
export default {
  name: "Employees",
  components: {
    MultiSelector
  },
  data: () => ({
    filters: [
      { label: "First name", name: "first_name", mask: "", type: "multi" },
      { label: "Last name", name: "last_name", mask: "", type: "multi" },
      { label: "Birthdate", name: "birthdate", mask: "", type: "multi" },
      { label: "Email", name: "email_address", mask: "" , type: "multi"},
      { label: "Phone", name: "phone_number", mask: "", type: "multi" },
      { label: "Job", name: "job", mask: "", type: "selector", items : ['Supervisor', 'Manager', 'Employee', 'Intership'] },
      { label: "Salary", name: "salary", mask: "", type: "multi" }
    ],
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
        value: "id",
        width: '3%'
      },
      { text: "Store ID", value: "store_id", width: '3%'},
      { text: "First name", value: "first_name", width: '10%'},
      { text: "Last name", value: "last_name", width: '10%'},
      { text: "Job", value: "job", width: '10%'},
      { text: "Birthdate", value: "birthdate", width: '10%'},
      { text: "Email", value: "email", width: '10%'},
      { text: "Phone", value: "phone", width: '10%'},
      { text: "Action", value: "", width: '10%'},
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
      this.filters.forEach(e => {
        if (e.mask == null) {
          e.mask = "";
        }
      });
      let payload = { separator: t, filters: this.filters };
      let res = await services.search_employee(payload);
      if (!res) {
        this.setSnack("Something bad happened");
      } else {
        if (res.err) {
          this.setSnack(res.err);
        } else {
          this.setSnack("Query succesful");
          //console.log(res.result)
          this.employees = res.result;
        }
      }
      this.isLoading = false;
    },
    UpdateFilter(name, filter) {
      console.log(name);
      console.log(filter);
    },
    ResetFilters() {
      this.filters.forEach(ele => {
        ele.mask = [];
      });
      this.employees = []
      // for(var i = 0; i < this.filters.length; i++){
      //   this.filters[i].mask = []
      // }
      this.isLoading = false;
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
.form {
  width: 100%;
  padding: 20px;
  margin: 0px auto;
}
</style>
