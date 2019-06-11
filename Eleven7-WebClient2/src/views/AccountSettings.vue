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
        style="width:85%"
      >
        <v-layout
          row
          justify-end
          align-center>
          <v-btn
            v-if="edit"
            color="error"
            icon
            @click="cancelEdit()"><v-icon>mdi-close</v-icon></v-btn>
          <v-btn
            v-if="edit"
            color="success"
            icon
            @click="validEdit()"><v-icon>mdi-check</v-icon></v-btn>
          <v-btn
            v-if="!edit"
            color="primary"
            icon
            @click="editInfo()"><v-icon>mdi-account-edit</v-icon></v-btn>
        </v-layout>
        <v-layout
          align-center
          justify-center
          fill-height>
          <v-form
            ref="form"
            v-model="valid_one"
            :class="{'formedit': edit}"
            class="form ">
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
        </v-layout>
      </material-card>
    </v-layout>
  </v-content>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as services from '../services/employeeService'

export default {
  name: 'AccountSettings',
  data: () => ({
    edit: false,
    valid_one: false,
    user: {},
    user_tmp: {},
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
      is_loaded: 'UserModule/isLoaded',
      user_info: 'UserModule/getUserInfo'
    }),
    employeetitle () {
      return this.user_info.first_name + ' ' + this.user_info.last_name
    },
    employeesub () {
      return 'ID ' + this.user_info.employee_id
    }
  },
  watch: {
    is_loaded: function (val) {
      console.log('is now loaded watch')
      console.log(JSON.stringify(this.user_info))
    }
  },
  methods: {
    ...mapActions(['setSnackbar']),
    ...mapActions('UserModule', ['InitUser']),
    setUser () {
      this.InitUser()
    },
    setSnack: function (txt) {
      var payload = { text: txt }
      this.setSnackbar(payload)
    },
    editInfo: function () {
      this.edit = true
      this.user_tmp = Object.assign({}, this.user)
    },
    validEdit: async function () {
      this.edit = false
      var res = await services.edit_employee(this.user)
      if (res && res.err) {
        this.setSnack(res.err)
        this.cancel()
      } else {
        this.user_tmp = Object.assign({}, {})
        this.setUser()
        this.setSnack('Info succesfully modified')
      }
    },
    cancelEdit: function () {
      this.edit = false
      this.user = this.user_tmp
    },
    goBack: function () {
      this.$router.push({ name: 'Dashboard' })
    }
  },
  mounted () {
    // console.log("Acc settings mounted")
    // console.log(JSON.stringify(this.user_info, null, 4));
    this.user = Object.assign({}, this.user_info)
    // console.log(this.user);
  }
}
</script>
<style lang="scss">
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
.minitoolbar .v-toolbar .v-toolbar__content {
    margin-left: 0px !important;
  }
</style>
