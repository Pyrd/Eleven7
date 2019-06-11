<template>
  <v-content style="height:100%; padding-left:0px; padding-top:20px">
    <v-layout
      align-center
      justify-center
      fill-height>
      <material-card
        color="red"
        title="Add a product"
        stext="AEZE"
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
        </v-layout>
        <v-layout
          align-center
          justify-center
          fill-height
          class="my-3">
          <v-form
            ref="form"
            v-model="valid_one"
            class="form">
            <v-text-field
              v-model="item.name"
              label="Name"
              required/>
            <v-layout
              align-center
              justify-space-between>
              <v-flex
                xs4
                style="margin-right:10px">
                <v-text-field
                  v-model="item.price_tag"
                  class="mt-0"
                  hide-details
                  single-line
                  type="number"
                />
              </v-flex>

              <v-flex xs8>
                <v-select
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
              v-model="item.description"
              label="Description"
              required/>
          </v-form>
        </v-layout>
        <v-card-actions>
          <v-btn
            color="error"
            @click="cancel()">Cancel</v-btn>
          <v-btn
            :disabled="!form_valid"
            color="primary"
            @click="handleSubmit()">Create</v-btn>
        </v-card-actions>
      </material-card>
    </v-layout>
  </v-content>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as services from '../../services/stockService'

export default {
  name: 'ProductProfileADD',
  data: () => ({
    edit: false,
    valid_one: false,
    item: {
      name: '',
      description: '',
      price_tag: 0,
      category_id: null
    },
    categories: []
  }),
  computed: {
    form_valid () {
      let name = this.item.name != ''
      let category_id = this.item.category_id != null
      let price_tag = this.item.price_tag > 0
      return name && category_id && price_tag
    }
  },
  methods: {
    ...mapActions(['setSnackbar']),
    setSnack: function (txt) {
      var payload = { text: txt }
      this.setSnackbar(payload)
    },
    init: async function () {
      var cat = await services.getCategories()
      if (cat) this.categories = cat
    },
    cancel: function () {
      this.item.name = ''
      this.item.price = 0
      this.item.description = ''
      this.item.category_id = null
    },
    handleSubmit: function () {
      var res = services.addItem(this.item)
      if (res.err) {
        this.setSnack(res.err)
        this.cancel()
      } else {
        this.setSnack('Product succesfully added')
        this.$router.go(-1)
      }
    },
    cancelEdit: function () {
      this.edit = false
      this.item = this.item_tmp
    },
    goBack: function () {
      this.$router.go(-1)
      // this.$router.push({ name: "Employees Management List" });
    }
  },
  created () {
    this.init()
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
