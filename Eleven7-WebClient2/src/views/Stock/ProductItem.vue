<template>
  <v-content style="height:100%; padding-left:0px; padding-top:20px">
    <v-layout
      align-center
      justify-center
      fill-height>
      <material-card
        :title="itemtitle"
        :text="itemsub"
        color="red"
        style="width:85%">
        <v-layout
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
          <v-flex
            xs6
            style="display: flex;justify-content: right">
            <v-btn
              v-if="edit"
              color="warning"
              @click="deleteItem()">
              Delete
            </v-btn>
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
              v-if="authorized && !edit"
              color="primary"
              icon
              @click="editInfo()">
              <v-icon>mdi-account-edit</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <v-layout
          align-center
          justify-center
          fill-height
          class="mt-3">
          <v-form
            ref="form"
            v-model="valid_one"
            :class="{'formedit': edit}"
            class="form">
            <v-text-field
              :class="{'disable-events': !edit}"
              v-model="item.name"
              label="Name"
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
                  v-model="item.price_tag"
                  class="mt-0"
                  hide-details
                  single-line
                  type="number"
                />
              </v-flex>

              <v-flex xs8>
                <v-select
                  :class="{'disable-events': !edit}"
                  v-model="item.category_id"
                  :items="categories"
                  label="Category"
                  outline
                  item-value="category_id"
                  item-text="name"
                />
              </v-flex>
            </v-layout>
            <v-text-field
              :class="{'disable-events': !edit}"
              v-model="item.description"
              label="Description"
              prepend-inner-icon="mdi-cake"
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
import * as services from '../../services/stockService'

export default {
  name: 'ProductProfile',
  data: () => ({
    authorized_lvl: 3,
    edit: false,
    valid_one: false,
    item: {},
    item_tmp: {},
    categories: []
  }),
  computed: {
    ...mapGetters({
      user_lvl: 'UserModule/getAuthLvl'
    }),
    itemtitle () {
      return this.item.name + '  ·  ID n°' + this.item.product_id
    },
    itemsub () {
      return ''
    },
    authorized () {
      return this.user_lvl >= this.authorized_lvl
    }
  },
  methods: {
    ...mapActions(['setSnackbar']),
    async setItem (id) {
      var cat = await services.getCategories()
      if (cat) this.categories = cat
      var main = await services.getById(id)
      if (main) this.item = main[0]

      this.display = true
    },
    setSnack: function (txt) {
      var payload = { text: txt }
      this.setSnackbar(payload)
    },
    editInfo: function () {
      this.edit = true
      this.item_tmp = Object.assign({}, this.item)
    },
    validEdit: function () {
      this.edit = false
      var res = services.editById(this.item)
      if (res.err) {
        this.setSnack(res.err)
        this.cancel()
      } else {
        this.item_tmp = Object.assign({}, {})
        this.setItem(this.id)
        this.setSnack('Info succesfully modified')
      }
    },
    cancelEdit: function () {
      this.edit = false
      this.item = this.item_tmp
    },
    goBack: function () {
      this.$router.go(-1)
      // this.$router.push({ name: "Employees Management List" });
    },
    deleteItem: function () {
      services.deleteById(this.item.product_id)
      this.goBack()
    }
  },
  created () {
    this.id = this.$route.params.id
    this.setItem(this.$route.params.id)
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
