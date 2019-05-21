<template>
  <v-card>
    <v-data-table :headers="headers" :items="employees" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.employee_id }}</td>
        <td class="text-xs-center">{{ props.item.first_name }}</td>
        <td class="text-xs-center">{{ props.item.last_name }}</td>
        <td class="text-xs-center">{{ props.item.email_address }}</td>
        <td class="text-xs-center">{{ props.item.phone_number }}</td>
      </template>
    </v-data-table>
    <v-card-actions>
      <v-btn color="orange" class="white--text" @click="loadEmployees">
        Load
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'EmployeeProfile',
  data: () => ({
     headers: [
          {
            text: 'ID',
            align: 'left',
            sortable: true,
            value: 'id'
          },
          { text: 'First name', value: 'first_name' },
          { text: 'Last name', value: 'last_name' },
          { text: 'Email', value: 'email' },
          { text: 'Phone', value: 'phone' },
        ],
        
  }),
  computed: {
     ...mapGetters({
        employees : 'EmployeesModule/getEmployees'
     }),
  },
  methods : {
    ...mapActions([
   	 		'setSnackbar'
         ]),
    ...mapActions('EmployeesModule', ['loadEmployees']),
    setSnack: function(txt){
      var payload = {text: txt}
      this.setSnackbar(payload);
    }
  },
  created(){
    this.loadEmployees;
  }
}
</script>
<style>

</style>
