<template>
  <v-content style="height:100%; padding-left:0px; padding-top:20px">
    <v-card width="100%" height="100%" class="grey lighten-2 mx-3 my-1 elevation-12">
      <v-card-title style="margin-left: 25px;">
        <v-btn icon large @click="goBack">
          <v-icon>arrow_back</v-icon>
        </v-btn>
        <span class="headline font-weight-medium">
          <span class="primary--text">Store ID:</span>
        </span>
        <span class="display-1 text-weight-thin orange--text text--darken-2">{{store.store_id}}</span>
        <v-spacer></v-spacer>
        <span
          class="title"
        >{{store.street_num}} {{store.address_1}}{{store.address_2}}, {{store.zip_code}} {{store.city_name}},{{store.country}}</span>
      </v-card-title>
      <v-card-actions>
        <v-layout column wrap fill-height align-center justify-center>
          
            <v-tabs v-model="tab" fixed-tabs slider-color color="grey lighten-3" height="58" style="width:100%">
              <v-tab key="1" active-class="primary--text">Staff</v-tab>
              <v-tab key="2" active-class="primary--text">Sales</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
              <v-tab-item key="1">
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
                    <td class="text-xs-center">{{ props.item.job }}</td>
                    <td class="text-xs-center">{{ props.item.first_name }}</td>
                    <td class="text-xs-center">{{ props.item.last_name }}</td>
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
              </v-tab-item>
              <v-tab-item key="2">
                <div>
                  <span class="title">From past </span>
                  <v-select
                    v-model="sale_time"
                    :items="sale_periods"
                    label=""
                    solo
                    @change="SetSalePeriod()"
                  ></v-select>
                </div>
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
                    <td class="text-xs-center">{{ props.item.job }}</td>
                    <td class="text-xs-center">{{ props.item.first_name }}</td>
                    <td class="text-xs-center">{{ props.item.last_name }}</td>
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
              </v-tab-item>
            </v-tabs-items>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-content>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import * as store_services from "../../services/storeService";
import * as employee_services from "../../services/employeeService";
export default {
  name: "StoreProfile",
  data: () => ({
    tab: null,
    display: true,
    id: -1,
    edit: false,
    valid_one: false,
    store: {},
    employees: [],
    headers: [
      {
        text: "ID",
        align: "left",
        sortable: true,
        value: "id"
      },
      { text: "Status", value: "job" },
      { text: "First name", value: "first_name" },
      { text: "Last name", value: "last_name" },
      { text: "Email", value: "email" },
      { text: "Phone", value: "phone" },
      { text: "Action", value: "" }
    ],
    isLoading: true,
    filters: {
      search: "",
      firstname: "",
      rating: { active: false, mask: 0 },
      price: { active: false, min: 0, max: 2000000 }
    },
    defaultSet: {
      descending: true,
      page: 1,
      rowsPerPage: 50,
      sortBy: "job",
      totalItems: 200
    },
    sale_time : '24h',
    sale_periods : ['24h', 'Week', 'All times']
  }),
  methods: {
    ...mapActions(["setSnackbar"]),
    async init(id) {
      var store = await store_services.getStoreById(id);
      if (store) this.store = store[0];
      var staff = await employee_services.getEmployeesByStoreId(id);
      if (staff) this.employees = staff;
      this.isLoading = false;
    },
    setSnack: function(txt) {
      var payload = { text: txt };
      this.setSnackbar(payload);
    },
    goBack: function() {
      this.$router.push({ name: "storeList" });
    },
    SetSalePeriod(){
      console.log(this.sale_time)
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.init(this.$route.params.id);
  }
};
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
