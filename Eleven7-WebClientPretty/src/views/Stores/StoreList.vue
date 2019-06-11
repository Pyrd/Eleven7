<template>
  <v-card>
    <v-toolbar :extended="filter_nav" dense class="grey darken-2 white--text">
      <v-btn icon class="white--text" @click="goBack"><v-icon>arrow_back</v-icon></v-btn>
      <v-toolbar-title class="white--text subtitle" style="margin-left:20px">Store Management</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat class="white--text" @click="filter_nav = !filter_nav">
          <v-icon>filter_list</v-icon>Filters
        </v-btn>
        <v-btn flat class="white--text" @click="loadStores">
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
        :items="stores"
        :search="filters.search"
        class="elevation-1"
        :pagination.sync="defaultSet"
        :loading="isLoading"
      >
      <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
        <template v-slot:items="props">
          <td class="text-xs-center">{{ props.item.store_id }}</td>
          <td class="text-xs-center">{{ props.item.size }}</td>
          <td class="text-xs-center">{{ props.item.city_name }}</td>
          <td class="text-xs-center">{{ props.item.country }}</td>
          <td class="text-xs-center">
            <v-btn class="grey--text text--darken-4" icon @click="Seemore(props.item.store_id)"><v-icon>label_important</v-icon></v-btn>
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
import * as services from '../../services/storeService';
export default {
  name: "StoreList",
  data: () => ({
    filter_nav: false,
    showAdvanced: false,
    showFilters: false,
    isLoading: true,
    filters : {
      search : ''
    },
    headers: [
      { text: "ID", align: "center", value: "store_id" },
      { text: "Effectif", align: "center", value: "size" },
      { text: "City Name",align: "center", value: "city_name" },
      { text: "Country",align: "center", value: "Country" },
      { text: "Action",align: "center", value: "" }
    ],
    defaultSet:{
      descending: true,
      page: 1,
      rowsPerPage: 50,
      sortBy: '',
      totalItems: 200
  },
    stores: []
  }),
  methods: {
    ...mapActions(["setSnackbar"]),
    setSnack: function(txt) {
      var payload = { text: txt };
      this.setSnackbar(payload);
    },
    Seemore: function(id) {
      console.log(id)
      this.$router.push({ name: 'storeProfile', params: { id: id }})
    },
    loadStores: async function(){
      this.stores = await services.getAll();
      this.isLoading = false;
      this.setSnack("Loaded succesfuly")
    },
    goBack: function(){
      this.$router.push({name:'stores'})
    }
  },
  mounted() {
    this.loadStores();
    
  }
};
</script>
<style>
.v-input__append-outer .v-icon,
.v-input__prepend-outer .v-icon {
  color: white;
}
</style>
