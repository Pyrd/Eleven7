<template>
  <v-layout
    align-center
    justify-center
    fill-height
    style="background:white;">
    <v-dialog
      v-model="dialog"
      persistent
      fullscreen
      style="background:white;">
      <v-card
        style="height:100%;width:100%;background:white"
        flat>
        <v-layout
          align-center
          justify-center
          fill-height>
          <v-flex xs12>
            <material-card
              color="primary"
              title="Login"
              style="margin-left: 10%; margin-right: 10%;">
              <v-card-text>
                <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation>
                  <v-text-field
                    v-model="credentials.email_address"
                    :rules="emailRules"
                    prepend-icon="mdi-account"
                    name="login"
                    label="Email"
                    type="email"
                    required
                    clearable
                  />
                  <v-text-field
                    id="password"
                    v-model="credentials.password"
                    prepend-icon="mdi-lock"
                    name="password"
                    label="Password"
                    type="password"
                    clearable
                    required
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="error">Cancel</v-btn>
                <v-spacer/>
                <v-btn
                  :disabled="!valid"
                  color="primary"
                  @click="submit"
                  @keyup.enter="submit"
                >Login</v-btn>
              </v-card-actions>
            </material-card>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import * as auth from '../services/auth'
import { mapActions } from 'vuex'
export default {
  props: ['nextUrl'],
  data () {
    return {
      dialog: true,
      credentials: {
        email_address: '',
        password: ''
      },
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      error: '',
      valid: true
    }
  },
  methods: {
    ...mapActions(['setSnackbar']),
    ...mapActions('UserModule', ['login']),
    setSnack: function (txt) {
      var payload = { text: txt }
      this.setSnackbar(payload)
    },
    async submit (e) {
      e.preventDefault()
      var credentials = {
        email_address: this.credentials.email_address,
        password: this.credentials.password
      }
      if (this.credentials.password.length > 0) {
        let res = await this.login(credentials)
        if (res == 1) this.credentials.password = ''
        else if (res == 2) {
          this.credentials.password = ''
          this.credentials.email_address = ''
        } else {
          if (this.nextUrl) this.$router.push(this.nextUrl)
          else this.$router.push({ name: 'Dashboard' })
        }
      }
    }
  }
}
</script>
<style>
.v-dialog--fullscreen {
  background:#eeeeee;
}
</style>
