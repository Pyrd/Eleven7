<template>
  <v-content style="height:100%; padding-left:0px; padding-top:20px">
    <v-layout
      align-center
      justify-center
      fill-height>
      <material-card
        :title="employeetitle"
        :text="employeesub"
        color="red"
        style="width:85%">
        <v-layout
          wrap
          row
          justify-space-between
          align-center>
          <v-flex xs1>
            <v-btn
              color="grey darken-2"
              icon
              @click="goBack()">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs1>
            <v-btn
              v-if="edit"
              color="error"
              icon
              @click="cancelEdit()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-btn
              v-if="edit"
              color="success"
              icon
              @click="validEdit()">
              <v-icon>mdi-check</v-icon>
            </v-btn>
            <v-btn
              v-if="authorized && !this.edit"
              color="primary"
              icon
              @click="editInfo()">
              <v-icon>mdi-account-edit</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <v-layout row>
          <span
            v-if="user.date_start"
            class="title">
            Contract started the :
            <i>{{ user.date_start }}</i>
          </span>
          <span
            v-if="user.date_end"
            class="title red--text text--darken-3">
            Contract ended the :
            <i>{{ user.date_end }}</i>
          </span>
        </v-layout>
        <v-layout
          align-center
          justify-center
          fill-height
          class="mt-3">
          <v-flex
            xs12
            sm12
            md6>
            <v-form
              ref="form"
              v-model="valid_one"
              :class="{'formedit': edit}"
              class="form">
              <span>
                <h2
                  class="headline"
                  style="margin:10px 0px 20px 0px">
                  <b>Basics</b>
                </h2>
              </span>
              <v-text-field
                :class="{'disable-events': !edit}"
                v-model="user.first_name"
                label="First Name"
                prepend-inner-icon="mdi-account"
                required
              />
              <v-text-field
                :class="{'disable-events': !edit}"
                v-model="user.last_name"
                label="Last Name"
                required
              />
              <v-text-field
                :class="{'disable-events': !edit}"
                v-model="user.birthdate"
                :rules="birthdateRules"
                label="Birth date"
                prepend-inner-icon="mdi-cake"
                required
              />
              <span>
                <h2
                  class="headline"
                  style="margin:10px 0px 20px 0px">
                  <b>Contacts</b>
                </h2>
              </span>
              <v-text-field
                :class="{'disable-events': !edit}"
                v-model="user.email_address"
                :rules="emailRules"
                prepend-inner-icon="mdi-email"
                label="Email"
                type="email"
                required
              />
              <v-text-field
                :class="{'disable-events': !edit}"
                v-model="user.phone_number"
                :rules="phoneRules"
                prepend-inner-icon="mdi-phone"
                label="Phone Number"
                required
              />
              <span>
                <h2
                  class="headline"
                  style="margin:10px 0px 20px 0px">
                  <b>Address</b>
                </h2>
              </span>
              <v-text-field
                :class="{'disable-events': !edit}"
                v-model="user.street_num"
                :rules="phoneRules"
                label="Street Number"
                prepend-inner-icon="mdi-map-marker"
                required
              />
              <v-text-field
                :class="{'disable-events': !edit}"
                v-model="user.address_1"
                label="Address 1"
                required
              />
              <v-text-field
                :class="{'disable-events': !edit}"
                v-model="user.address_2"
                label="Address 2"
                prepend-inner-icon
                required
              />
              <v-layout
                align-center
                justify-space-between>
                <v-flex
                  xs4
                  style="margin-right:10px">
                  <v-text-field
                    :class="{'disable-events': !edit}"
                    v-model="user.zip_code"
                    :rules="phoneRules"
                    label="Zip Code"
                    prepend-inner-icon
                    required
                  />
                </v-flex>

                <v-flex xs8>
                  <v-text-field
                    :class="{'disable-events': !edit}"
                    v-model="user.city_name"
                    label="City name"
                    prepend-inner-icon
                    required
                  />
                </v-flex>
              </v-layout>
              <v-text-field
                :class="{'disable-events': !edit}"
                v-model="user.country"
                label="Country name"
                prepend-inner-icon
                required
              />
            </v-form>
          </v-flex>
          <v-flex
            xs12
            sm12
            md6>
            <v-form
              ref="form"
              v-model="valid_one"
              :class="{'formedit': edit}"
              class="form">
              <span>
                <h2
                  class="headline"
                  style="margin:10px 0px 20px 0px">
                  <b>Administration</b>
                </h2>
              </span>
              <v-subheader
                v-if="authorized"
                class="pl-0">
                <b>Salary</b>
              </v-subheader>
              <span
                v-if="authorized"
                class="display-1 font-weight-light"
                v-text="user.salary"/>
              <span
                v-if="authorized"
                class="subheading font-weight-light mr-1">USD/month</span>
              <v-layout row>
                <v-flex
                  v-if="authorized"
                  shrink
                  style="width: 60px">
                  <v-text-field
                    v-model="user.salary"
                    :class="{'disable-events': !edit}"
                    class="mt-0"
                    hide-details
                    single-line
                    type="number"
                  />
                </v-flex>
              </v-layout>
              <v-dialog
                v-model="store_dialog"
                width="600px">
                <template v-slot:activator="{ on }">
                  <div>
                    <v-subheader class="pl-0">
                      <b>Store</b>
                    </v-subheader>
                    <v-layout
                      align-center
                      justify-space-between
                      row
                      fill-height>
                      <v-flex
                        xs12
                        sm6>
                        <span class="subheading font-weight-light mr-1">ID</span>
                        <span
                          class="display-1 font-weight-light"
                          v-text="user.store_id"/>
                      </v-flex>
                      <v-flex
                        xs12
                        sm6
                        shrink>
                        <v-btn
                          v-if="edit"
                          :class="{'disable-events': !edit}"
                          color="primary"
                          class="mr-3"
                          dark
                          v-on="on"
                        >Assign to a store</v-btn>
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
                  <v-divider/>
                  <v-card-text>
                    <v-radio-group
                      v-model="user.store_id"
                      column>
                      <v-radio
                        label="Store1"
                        value="1"/>
                      <v-radio
                        label="Store2"
                        value="2"/>
                    </v-radio-group>
                  </v-card-text>
                  <v-divider/>
                  <v-card-actions>
                    <v-btn
                      color="blue darken-1"
                      flat
                      @click="store_dialog = false">Close</v-btn>
                    <v-btn
                      color="blue darken-1"
                      flat
                      @click="store_dialog = false">Save</v-btn>
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
              />
            </v-form>
          </v-flex>
        </v-layout>
      </material-card>
    </v-layout>
  </v-content>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import * as services from '../../services/employeeService'

export default {
  name: 'AccountSettings',
  data: () => ({
    authorized_lvl: 3,
    display: false,
    id: -1,
    edit: false,
    store_dialog: false,
    valid_one: false,
    user: {},
    user_tmp: {},
    job_list: [
      { job_name: 'Supervisor', lvl: 4 },
      { job_name: 'Manager', lvl: 3 },
      { job_name: 'Employee', lvl: 2 },
      { job_name: 'Internship', lvl: 1 }
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    birthdateRules: [
      v => !!v || 'Birthdate is required',
      v =>
        /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)19\d{2}$/i.test(
          v
        ) || 'Invalid format, should be dd/mm/19yy'
    ],
    passwordRules: [
      v =>
        (v || '').length >= 6 || `Password should be ${6} or more characters !`
    ],
    phoneRules: [v => /^\d*$/.test(v) || `Only digits !`]
  }),
  computed: {
    ...mapGetters({
      user_lvl: 'UserModule/getAuthLvl'
    }),
    employeetitle () {
      return this.user.first_name + ' ' + this.user.last_name
    },
    employeesub () {
      return 'ID ' + this.user.employee_id
    },
    authorized () {
      return this.user_lvl >= this.authorized_lvl
    }
  },
  methods: {
    ...mapActions(['setSnackbar']),
    async setUser (id) {
      var main = await services.getEmployeeById(id)
      if (main) this.user = main[0]
      this.display = true
    },
    testme () {
      this.$router.push({ name: 'home' })
    },
    setSnack: function (txt) {
      var payload = { text: txt }
      this.setSnackbar(payload)
    },
    editInfo: function () {
      this.edit = true
      this.user_tmp = Object.assign({}, this.user)
    },
    validEdit: function () {
      this.edit = false
      if (this.user_lvl < 3) return
      var res = services.edit_employee(this.user)
      if (res.err) {
        this.setSnack(res.err)
        this.cancel()
      } else {
        this.user_tmp = Object.assign({}, {})
        this.setUser(this.id)
        this.setSnack('Info succesfully modified')
      }
    },
    cancelEdit: function () {
      this.edit = false
      this.user = this.user_tmp
    },
    goBack: function () {
      this.$router.go(-1)
      // this.$router.push({ name: "Employees Management List" });
    }
  },
  created () {
    this.id = this.$route.params.id
    this.setUser(this.$route.params.id)
  }
}
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
  width: 80%;
  border: 1px solid #424242;
  border-radius: 15px;
  padding: 20px;
  margin: 0px auto;
  border: 1px solid rgba(9, 113, 248, 0.87) !important;
}
</style>
