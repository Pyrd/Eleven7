<template>
  <v-content style="height:100%; padding-left:0px; padding-top:20px">
    <v-layout align-center justify-center fill-height>
      <v-card
        width="100%"
        height="100%"
        class="grey lighten-2 mx-3 my-1 elevation-12"
        v-if="display"
      >
        <v-card-title style="margin-left: 25px;">
          <v-btn icon large @click="goBack">
            <v-icon>arrow_back</v-icon>
          </v-btn>
          <span class="headline font-weight-medium">
            <span class="primary--text">Profile</span> &middot; Employee #
          </span>
          <span class="display-1 text-weight-thin orange--text text--darken-2">{{user.employee_id}}</span>
          <v-spacer></v-spacer>
          <v-btn v-if="edit" color="error" icon @click="cancelEdit()">
            <v-icon>close</v-icon>
          </v-btn>
          <v-btn v-if="edit" color="success" icon @click="validEdit()">
            <v-icon>check</v-icon>
          </v-btn>
          <v-btn v-if="!edit" color="primary" @click="editInfo()">
            <v-icon>edit</v-icon>Edit
          </v-btn>
        </v-card-title>
        <v-card-actions>
          <span v-if="user.date_start" class="title">Contract started the : <i>{{user.date_start}}</i></span>
          <span v-if="user.date_end" class="title red--text text--darken-3">Contract ended the : <i>{{user.date_end}}</i></span>
          <v-layout align-start justify-space-between row fill-height>
            <v-flex xs12 sm6>
              <v-form ref="form" v-model="valid_one" class="form" :class="{'formedit': edit}">
                <span>
                  <h2 class="headline" style="margin:10px 0px 20px 0px">
                    <b>Basics</b>
                  </h2>
                </span>
                <v-text-field
                  :class="{'disable-events': !edit}"
                  label="First Name"
                  prepend-inner-icon="perm_identity"
                  v-model="user.first_name"
                  required
                ></v-text-field>
                <v-text-field
                  label="Last Name"
                  :class="{'disable-events': !edit}"
                  v-model="user.last_name"
                  required
                ></v-text-field>
                <v-text-field
                  :class="{'disable-events': !edit}"
                  label="Birth date"
                  prepend-inner-icon="cake"
                  v-model="user.birthdate"
                  required
                  :rules="birthdateRules"
                ></v-text-field>
                <span>
                  <h2 class="headline" style="margin:10px 0px 20px 0px">
                    <b>Contacts</b>
                  </h2>
                </span>
                <v-text-field
                  :class="{'disable-events': !edit}"
                  prepend-inner-icon="email"
                  label="Email"
                  type="email"
                  v-model="user.email_address"
                  required
                  :rules="emailRules"
                ></v-text-field>
                <v-text-field
                  :class="{'disable-events': !edit}"
                  prepend-inner-icon="phone"
                  label="Phone Number"
                  v-model="user.phone_number"
                  required
                  :rules="phoneRules"
                ></v-text-field>
                <span>
                  <h2 class="headline" style="margin:10px 0px 20px 0px">
                    <b>Address</b>
                  </h2>
                </span>
                <v-text-field
                  label="Street Number"
                  :class="{'disable-events': !edit}"
                  prepend-inner-icon="place"
                  v-model="user.street_num"
                  :rules="phoneRules"
                  required
                ></v-text-field>
                <v-text-field
                  label="Address 1"
                  :class="{'disable-events': !edit}"
                  prepend-inner-icon
                  v-model="user.address_1"
                  required
                ></v-text-field>
                <v-text-field
                  label="Address 2"
                  :class="{'disable-events': !edit}"
                  prepend-inner-icon
                  v-model="user.address_2"
                  required
                ></v-text-field>
                <v-layout align-center justify-space-between>
                  <v-flex xs4 style="margin-right:10px">
                    <v-text-field
                      label="Zip Code"
                      :class="{'disable-events': !edit}"
                      prepend-inner-icon
                      v-model="user.zip_code"
                      :rules="phoneRules"
                      required
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs8>
                    <v-text-field
                      label="City name"
                      :class="{'disable-events': !edit}"
                      prepend-inner-icon
                      v-model="user.city_name"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-text-field
                  label="Country name"
                  :class="{'disable-events': !edit}"
                  prepend-inner-icon
                  v-model="user.country"
                  required
                ></v-text-field>
              </v-form>
            </v-flex>
            <v-flex xs12 sm6>
              <v-form ref="form" v-model="valid_one" class="form" :class="{'formedit': edit}">
                <span>
                  <h2 class="headline" style="margin:10px 0px 20px 0px">
                    <b>Administration</b>
                  </h2>
                </span>
                <v-subheader class="pl-0">
                  <b>Salary</b>
                </v-subheader>
                <span class="display-1 font-weight-light" v-text="user.salary"></span>
                <span class="subheading font-weight-light mr-1">USD/month</span>
                <v-layout row>
                  <v-flex shrink style="width: 60px">
                    <v-text-field
                      v-model="user.salary"
                      class="mt-0"
                      hide-details
                      single-line
                      type="number"
                      :class="{'disable-events': !edit}"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-dialog v-model="store_dialog" width="600px">
                  <template v-slot:activator="{ on }">
                    <div>
                      <v-subheader class="pl-0">
                        <b>Store</b>
                      </v-subheader>
                      <v-layout align-center justify-space-between row fill-height>
                        <v-flex xs12 sm6>
                          <span class="subheading font-weight-light mr-1">ID</span>
                          <span class="display-1 font-weight-light" v-text="user.store_id"></span>
                        </v-flex>
                        <v-flex xs12 sm6 shrink>
                          <v-btn color="primary" class="mr-3" dark v-on="on" :class="{'disable-events': !edit}">Assign to a store</v-btn>
                        </v-flex>
                      </v-layout>
                    </div>
                  </template>
                  <v-card>
                    <v-card-title>
                      <h1>
                        <b>Assign to a store</b>
                      </h1>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                      <v-radio-group v-model="user.store_id" column>
                        <v-radio label="Store1" value="1"></v-radio>
                        <v-radio label="Store2" value="2"></v-radio>
                      </v-radio-group>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-btn color="blue darken-1" flat @click="store_dialog = false">Close</v-btn>
                      <v-btn color="blue darken-1" flat @click="store_dialog = false">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-select
                :class="{'disable-events': !edit}"
                  v-model="user.job_level"
                  :items="job_list"
                  label="Profession"
                  outline
                  item-value="lvl"
                  item-text="job_name"
                  @change="SetJob()"
                ></v-select>
              </v-form>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-content>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import * as services from "../../services/employeeService";

export default {
  name: "account_settings",
  data: () => ({
    display: false,
    id: -1,
    edit: false,
    store_dialog: false,
    valid_one: false,
    user: {},
    user_tmp: {},
    job_list: [
        { job_name: "Supervisor", lvl: 4 },
        { job_name: "Manager", lvl: 3 },
        { job_name: "Employee", lvl: 2 },
        { job_name: "Internship", lvl: 1 }
      ],
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    birthdateRules: [
      v => !!v || "Birthdate is required",
      v =>
        /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)19\d{2}$/i.test(
          v
        ) || "Invalid format, should be dd/mm/19yy"
    ],
    passwordRules: [
      v =>
        (v || "").length >= 6 || `Password should be ${6} or more characters !`
    ],
    phoneRules: [v => /^\d*$/.test(v) || `Only digits !`]
  }),
  methods: {
    ...mapActions(["setSnackbar"]),
    async setUser(id) {
      var main = await services.getEmployeeById(id);
      if (main) this.user = main[0];
      this.display = true;
    },
    testme() {
      this.$router.push({ name: "home" });
    },
    setSnack: function(txt) {
      var payload = { text: txt };
      this.setSnackbar(payload);
    },
    editInfo: function() {
      this.edit = true;
      this.user_tmp = Object.assign({}, this.user);
    },
    validEdit: function() {
      this.edit = false;
      var res = services.edit_employee(this.user);
      if (res.err) {
        this.setSnack(res.err);
        this.cancel();
      } else {
        this.user_tmp = Object.assing({}, {});
        this.setUser(this.id);
        this.setSnack("Info succesfully modified");
      }
    },
    cancelEdit: function() {
      this.edit = false;
      this.user = this.user_tmp;
    },
    goBack: function() {
      this.$router.push({ name: "EmployeesList" });
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.setUser(this.$route.params.id);
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
  margin:0px 10px;
  border: 1px solid rgba(9, 113, 248, 0.87) !important;
}
</style>
