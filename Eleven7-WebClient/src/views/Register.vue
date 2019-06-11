<template>
  <v-card height="100%" width="100%">
    <template>
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">Main informations</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 2" step="2">Address</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3">Administration</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card flat height="100%" width="100%">
              <v-toolbar dark color="primary">
                <v-icon>person</v-icon>
                <v-toolbar-title>Main informations</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid_one">
                  <span>
                    <h2 class="headline" style="margin:10px 0px 20px 0px">
                      <b>Basics</b>
                    </h2>
                  </span>
                  <v-text-field
                    label="First Name"
                    outline
                    prepend-inner-icon="perm_identity"
                    v-model="cred.first_name"
                    required
                  ></v-text-field>
                  <v-text-field label="Last Name" outline v-model="cred.last_name" required></v-text-field>
                  <v-text-field
                    label="Birth date"
                    outline
                    prepend-inner-icon="cake"
                    v-model="cred.birthdate"
                    required
                    :rules="birthdateRules"
                  ></v-text-field>
                  <span>
                    <h2 class="headline" style="margin:0px 0px 20px 0px">
                      <b>Contacts</b>
                    </h2>
                  </span>
                  <v-text-field
                    prepend-inner-icon="email"
                    label="Email"
                    type="email"
                    outline
                    v-model="cred.email_address"
                    required
                    :rules="emailRules"
                  ></v-text-field>
                  <v-text-field
                    prepend-inner-icon="phone"
                    label="Phone Number"
                    outline
                    v-model="cred.phone_number"
                    required
                    :rules="phoneRules"
                  ></v-text-field>
                  <span>
                    <h2 class="headline" style="margin:0px 0px 20px 0px">
                      <b>Password</b>
                    </h2>
                  </span>
                  <v-text-field
                    id="password"
                    prepend-inner-icon="lock"
                    label="Password"
                    type="password"
                    :rules="passwordRules"
                    outline
                    v-model="cred.password"
                    required
                  ></v-text-field>
                  <v-text-field
                    prepend-inner-icon="lock"
                    label="Confirm Password"
                    type="password"
                    outline
                    :rules="passwordConfirmationRules"
                    v-model="cred.password_confirmation"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="error" @click="cancel()">Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" :disabled="!valid_one" @click="next()">Continue</v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card flat height="100%" width="100%">
              <v-toolbar dark color="primary">
                <v-icon>place</v-icon>
                <v-toolbar-title>Address</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form2" v-model="valid_two">
                  <v-text-field
                    label="Street Number"
                    outline
                    prepend-inner-icon="place"
                    v-model="cred.street_num"
                    :rules="phoneRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Address 1"
                    outline
                    prepend-inner-icon
                    v-model="cred.address_1"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Address 2"
                    outline
                    prepend-inner-icon
                    v-model="cred.address_2"
                    required
                  ></v-text-field>
                  <v-layout align-center justify-space-between>
                    <v-flex xs4 style="margin-right:10px">
                      <v-text-field
                        label="Zip Code"
                        outline
                        prepend-inner-icon
                        v-model="cred.zip_code"
                        :rules="phoneRules"
                        required
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs8>
                      <v-text-field
                        label="City name"
                        outline
                        prepend-inner-icon
                        v-model="cred.city_name"
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-text-field
                    label="Country name"
                    outline
                    prepend-inner-icon
                    v-model="cred.country"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="error" @click="cancel()">Cancel</v-btn>
                <v-btn color="primary" @click="back()">Back</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" :disabled="!valid_two" @click="next()">Continue</v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card flat height="100%" width="100%">
              <v-toolbar dark color="primary">
                <v-icon>info</v-icon>
                <v-toolbar-title>Administration</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form2" v-model="valid_three">
                  <v-subheader class="pl-0">
                    <b>Salary</b>
                  </v-subheader>
                  <span class="display-1 font-weight-light" v-text="cred.salary"></span>
                  <span class="subheading font-weight-light mr-1">USD/month</span>
                  <v-layout row>
                    <v-flex class="pr-3">
                      <v-slider v-model="cred.salary" max="20000"></v-slider>
                    </v-flex>

                    <v-flex shrink style="width: 60px">
                      <v-text-field
                        v-model="cred.salary"
                        class="mt-0"
                        hide-details
                        single-line
                        type="number"
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
                            <span class="display-1 font-weight-light" v-text="cred.store_id"></span>
                          </v-flex>
                          <v-flex xs12 sm6 shrink>
                            <v-btn color="primary" class="mr-3" dark v-on="on">Assign to a store</v-btn>
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
                        <v-radio-group v-model="cred.store_id" column>
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
                    v-model="cred.job_level"
                    :items="job_list"
                    label="Profession"
                    outline
                    item-value="lvl"
                    item-text="job_name"
                    @change="SetJob()"
                  ></v-select>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="error" @click="cancel()">Cancel</v-btn>
                <v-btn color="primary" @click="back()">Back</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="sucess" :disabled="!valid_three" @click="handleSubmit()">Submit</v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </template>
  </v-card>
</template>
 
<script>
//TODO
/*
Do api controller for addresses
Add in register api the address and new fields
Add proper list component in this one
Add StoreModule in client
Display additional info such as address


*/
import { mapActions } from "vuex";
import * as auth from "../services/auth";

export default {
  data() {
    return {
      e1: 1,
      valid_one: false,
      valid_two: false,
      valid_three: false,
      store_dialog: false,
      cred: {
        store_id: null,
        first_name: "",
        last_name: "",
        birthdate: "",
        email_address: "",
        phone_number: "",
        password: "",
        password_confirmation: "",
        job: "",
        job_level: null,
        salary: 2000,
        street_num: null,
        address_1: "",
        address_2: "",
        zip_code: null,
        city_name: "",
        country: ""
      },
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
          (v || "").length >= 6 ||
          `Password should be ${6} or more characters !`
      ],
      phoneRules: [v => /^\d*$/.test(v) || `Only digits !`]
    };
  },
  computed: {
    passwordConfirmationRules() {
      return [
        () =>
          this.cred.password == this.cred.password_confirmation ||
          "Password must match",
        v => !!v || "Password connfirmation is required"
      ];
    }
  },
  methods: {
    ...mapActions(["setSnackbar"]),
    setSnack: function(txt) {
      var payload = { text: txt };
      this.setSnackbar(payload);
    },
    handleSubmit: function() {
      if (this.valid_one && this.valid_two && this.valid_three) {
        var res = auth.register(this.cred);
        if (res.err) {
          this.setSnack(res.err);
          this.cancel();
        } else {
          this.setSnack("User succesfully registered");
          this.$router.push({ name: "home" });
        }
      } else {
        this.setSnackbar({ text: "Invalid form" });
      }
    },
    next: function() {
      if (this.e1 < 3) this.e1 += 1;
      else this.submit = true;
    },
    back: function() {
      if (this.e1 > 0) this.e1 -= 1;
      if (this.submit) this.submit = false;
    },
    cancel: function() {
      this.e1 = 1;
      this.submit = false;
      this.cred.first_name = "";
      (this.cred.first_name = ""),
        (this.cred.last_name = ""),
        (this.cred.email_address = ""),
        (this.cred.phone_number = ""),
        (this.cred.password = ""),
        (this.cred.password_confirmation = ""),
        (this.cred.is_admin = null);
    },
    SetJob: function() {
      console.log("Setjob");
      switch (this.cred.job_level) {
        case 4:
          this.cred.job = "Supervisor";
          break;
        case 3:
          this.cred.job = "Manager";
          break;
        case 2:
          this.cred.job = "Employee";
          break;
        case 1:
          this.cred.job = "Intership";
          break;
      }
    }
  }
};
</script>