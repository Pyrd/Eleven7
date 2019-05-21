<template>
  <v-layout align-center justify-center fill-height>
    <v-dialog v-model="dialog" persistent fullscreen>
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
      </template>
      <v-card style="height:100%;width:100%" flat>
        <v-layout align-center justify-center fill-height>
          <v-flex xs12>
            <v-card class="elevation-7" style="margin:0px 10%">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    prepend-icon="person"
                    name="login"
                    label="Email"
                    type="email"
                    v-model="credentials.email_address"
                    required
                    :rules="emailRules"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    prepend-icon="lock"
                    name="password"
                    label="Password"
                    type="password"
                    v-model="credentials.password"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="error">Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  :disabled="!valid"
                  @click="submit"
                  v-on:keyup.enter="submit"
                >Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

  <script>
import * as auth from "../services/auth";
import { mapActions } from "vuex";
export default {
  props: ["nextUrl"],
  data() {
    return {
      dialog: true,
      credentials: {
        email_address: "",
        password: ""
      },
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      error: "",
      valid: true
    };
  },
  methods: {
    ...mapActions(["setSnackbar"]),
    ...mapActions("UserModule", ["login"]),
    setSnack: function(txt) {
      var payload = { text: txt };
      this.setSnackbar(payload);
    },
    async submit(e) {
      e.preventDefault();
      var credentials = {
        email_address: this.credentials.email_address,
        password: this.credentials.password
      };
      if (this.credentials.password.length > 0) {
        let res = await this.login(credentials);
        if (res == 1) this.credentials.password = "";
        else if (res == 2) {
          this.credentials.password = "";
          this.credentials.email_address = "";
        } else {
          if (this.nextUrl) this.$router.push(this.nextUrl);
          else this.$router.push("dashboard");
        }
      }
    }
  }
};
</script>