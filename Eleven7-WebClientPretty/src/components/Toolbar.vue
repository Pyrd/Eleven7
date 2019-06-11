      <template>
      <v-toolbar id="toolbar" color="white grey--text text--darken-3" app absolute dense>
        <v-toolbar-side-icon class="grey--text text--darken-3" @click="openDrawer"></v-toolbar-side-icon>
        <v-toolbar-title class="grey--text text--darken-3" style="margin-left:0px">
          <v-btn flat @click="redirect('home')" class="grey--text text--darken-3" style="padding:0px;">
            <b>Eleven</b>
            <b style="color:orange">7</b> Dashboard
          </v-btn>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn flat icon class="grey--text text--darken-3">
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-menu bottom origin="center center" transition="scale-transition" min-width="250px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" flat icon class="white--text" v-on="on">
                <v-avatar size="32px" color="grey lighten-4">
                  <img :src="user_info.avatar" alt="avatar">
                </v-avatar>
              </v-btn>
            </template>
            <v-card>
            <v-card-title class="blue white--text">
              <v-layout align-center justify-center row fill-height>
                <v-flex style="margin-right:10px">
                  <v-avatar size="64px" color="grey lighten-4">
                    <img :src="user_info.avatar" alt="avatar">
                  </v-avatar>
                </v-flex>
                <v-flex>
                  <div class="headline" style="width:100%"><b>Hello</b></div>
                  <div class="headline" style="width:100%">
                    <span v-if="authentified">{{user_info.first_name}} {{user_info.last_name}} </span>
                    <span v-else>Please login</span>
                  </div>
                </v-flex>
              </v-layout>
            </v-card-title>

            <v-card-text style="padding:0px">
              <v-list v-if="authentified">
                  <v-list-tile
                    v-for="(item, i) in authTrue"
                    :key="i"
                    @click="menuCall(item.action)"
                  >
                    <v-list-tile-avatar>
                      <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-title class="text-xs-left">{{ item.title }}</v-list-tile-title>
                  </v-list-tile>
              </v-list>
              <v-list v-else>
                  <v-list-tile
                    v-for="(item, i) in authFalse"
                    :key="i"
                    @click="menuCall(item.action)"
                  >
                    <v-list-tile-avatar>
                      <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-title class="text-xs-left">{{ item.title }}</v-list-tile-title>
                  </v-list-tile>
              </v-list>
            </v-card-text>
          </v-card>
          </v-menu>
        </v-toolbar-items>
      </v-toolbar>
    </template>

      <script>
    import { mapGetters, mapActions } from "vuex";

    export default {
      name: "Toolbar",
      data: () => ({
          authFalse: [
            {icon: 'account_circle', title: 'Login', action: 'login'}
          ],
          authTrue: [
            {icon: 'account_box',  title: 'Manage my account', action:'settings'},
            {icon: 'exit_to_app',  title: 'Logout', action:'logout'}
          ],
          
      }),
      computed: {
      ...mapGetters({
          authentified : 'UserModule/getAuth',
          user_info : 'UserModule/getUserInfo',
      })
      },
      methods: {
        ...mapActions(["openDrawer", 'setSnackbar']),
        ...mapActions('UserModule', ['logout']),
        setSnack: function(txt){
          var payload = {text: txt}
          this.setSnackbar(payload);
        },
        redirect : function(name){
          this.$router.push({name: name});
        },
        menuCall: function(action){
          switch(action){
            case'login':
              this.$router.push({name: 'login'});
              break;
            case 'settings':
              this.$router.push({name: 'AccountSettings'});
              break;
            case 'logout':
              this.logout()
              this.$router.push({name: 'login'});
              break;
          }
        }
      }
    };
    </script>

      <style scoped>
    #toolbar {
      background-color: #f9f9f9 !important;
      border-color: #f9f9f9 !important;
      font-family: "Quicksand", sans-serif;
      font-weight: 600;
    }
    </style>
