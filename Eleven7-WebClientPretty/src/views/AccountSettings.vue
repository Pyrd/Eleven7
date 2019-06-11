<template>
  <v-content style="height:100%; padding-left:0px; padding-top:20px">
    <v-layout align-center justify-center fill-height>
      <v-card width="100%" height="100%" class="grey lighten-2 mx-3 my-1 elevation-12" v-if="is_loaded">
        <v-card-title style="margin-left: 25px;">
          
          <v-btn icon large @click="goBack"><v-icon>arrow_back</v-icon></v-btn>
          <span class="headline font-weight-medium"><span class="primary--text">Account Settings</span> &middot; Employee #</span>
          <span class="display-1 text-weight-thin orange--text text--darken-2">{{user.employee_id}}</span>
          <v-spacer></v-spacer>
          <v-btn v-if="edit" color="error" icon @click="cancelEdit()"><v-icon>close</v-icon></v-btn>
          <v-btn v-if="edit" color="success" icon @click="validEdit()"><v-icon>check</v-icon></v-btn>
          <v-btn v-if="!edit" color="primary" @click="editInfo()"><v-icon>edit</v-icon>Edit</v-btn>
        </v-card-title>
        <v-card-actions>
          <v-layout align-center justify-center fill-height>
            <v-form ref="form" v-model="valid_one" class="form " :class="{'formedit': edit}">
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
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-content>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import * as services from "../services/employeeService";

export default {
  name: "account_settings",
  data: () => ({
    edit: false,
    valid_one: false,
    user: {},
    user_tmp : {},
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
  computed: {
    ...mapGetters({
      is_loaded: "UserModule/isLoaded",
      user_info: "UserModule/getUserInfo"
    })
  },
  watch : {
    is_loaded: function(val){
      console.log("is now loaded watch")
      console.log(JSON.stringify(this.user_info))
    }
  },
  methods: {
    ...mapActions(["setSnackbar"]),
    ...mapActions('UserModule', ['InitUser']),
    setUser(){
      this.InitUser();
    },
    setSnack: function(txt) {
      var payload = { text: txt };
      this.setSnackbar(payload);
    },
    editInfo: function(){
      this.edit = true;
      this.user_tmp =  Object.assign({}, this.user);
    },
    validEdit: async function(){
      this.edit = false;
      var res = await services.edit_employee(this.user);
      if(res.err){
            this.setSnack(res.err)
            this.cancel();
        } else {
            this.user_tmp = Object.assing({}, {});
            this.setUser();
            this.setSnack("Info succesfully modified")
        }
    },
    cancelEdit: function(){
      this.edit = false;
      this.user = this.user_tmp;
    },
    goBack: function(){
      this.$router.push({name:'home'})
    }
  },
  mounted() {
    console.log("Acc settings mounted")
    console.log(JSON.stringify(this.user_info, null, 4));
    this.user = Object.assign({}, this.user_info);
    console.log(this.user);
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
}
.formedit {
  border: 1px solid rgba(9, 113, 248, 0.87) !important;

}
</style>
