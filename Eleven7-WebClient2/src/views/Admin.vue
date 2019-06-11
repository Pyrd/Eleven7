<template>
  <v-container id="admin">
    <v-layout
      wrap
      justify-center>
      <v-flex xs12>
        <material-card
          color="info"
          title="Supply Simulalator">
          <v-card-actions>
            <v-layout
              row
              wrap
              align-center
              justify-space-between
              style="width:100%">
              <v-flex
                xs6
                style="display: flex;justify-content: left">
                <v-select
                  label='Inventory ID'
                  v-model="num_supply"
                  :items="inventorySelect"
                  item-value="id"
                  item-text="txt"/>
              </v-flex>
              <v-flex
                xs6
                style="display: flex;justify-content: right">
                <v-btn
                  color="blue"
                  @click="simulate2">Generate Supply</v-btn>
                <v-btn
                  :disabled="!ready"
                  color="error"
                  @click="cancel2">Cancel</v-btn>
                <v-btn
                  :disabled="!ready"
                  color="success"
                  @click="submit2">Apply</v-btn>
              </v-flex>
            </v-layout>
          </v-card-actions>
        </material-card>
        <material-card
          color="warning"
          title="Sales Simulalator">
          <v-card-actions>
            <v-layout
              row
              wrap
              align-center
              justify-space-between
              style="width:100%">
              <v-flex
                xs1
                style="display: flex;justify-content: left">
                <v-select
                  label='Number of orders'
                  v-model="num"
                  :items="nbitem"/>
              </v-flex>
              <v-flex
                xs6
                style="display: flex;justify-content: right">
                <v-btn
                  color="blue"
                  @click="simulate">Generate Sales</v-btn>
                <v-btn
                  :disabled="!ready"
                  color="error"
                  @click="cancel">Cancel</v-btn>
                <v-btn
                  :disabled="!ready"
                  color="success"
                  @click="submit">Apply</v-btn>
              </v-flex>
            </v-layout>

            <v-spacer/>

          </v-card-actions>
          <material-card
            v-if="ready"
            color
            title="Generated sales">
            <v-data-table
              :headers="headers"
              :items="last_sale"
              :pagination.sync="defaultSet"
              class="elevation-1"
            >
              <template v-slot:items="props">
                <td class="text-xs-center">{{ props.item.store_id }}</td>
                <td class="text-xs-center">{{ props.item.sale_date }}</td>
                <td class="text-xs-center">{{ props.item.total_price }}</td>
                <td class="text-xs-center">{{ props.item.total_item }}</td>
              </template>
            </v-data-table>
          </material-card>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as stock_services from '../services/stockService'
import * as store_services from '../services/storeService'
export default {
  name: 'Admin',
  data: () => ({
    simulation: false,
    generated: false,
    generated2: false,
    num: 1,
    num_supply : 1,
    nbitem: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    stores : [],
    products: [],
    inventories: [],
    last_sale: [],
    last_supply:[],
    headers: [
      { text: 'ID', align: 'center', value: 'sale_id' },
      { text: 'Sale Date', align: 'center', value: 'sale_date' },
      { text: 'Total Price ($)', align: 'center', value: 'total_price' },
      { text: 'Total Items', align: 'center', value: 'total_items' }
    ],
    headers2: [
      { text: 'ID', align: 'center', value: 'supply_id' },
      { text: 'Sale Date', align: 'center', value: 'supply_date' },
      { text: 'Total Items', align: 'center', value: 'total_items' }
    ],
    defaultSet: {
      descending: true,
      page: 1,
      rowsPerPage: 50,
      sortBy: '',
      totalItems: 200
    }
  }),
  computed: {
    ready () {
      return this.generated && this.last_sale != []
    },
    inventorySelect(){
      let output = []
      for(let i = 0; i < this.stores.length;i++){
        let sum = 0;
        let id = this.stores[i].store_id;
        //console.log(i)
        for(let j = 0; j < this.inventories.length; j++){
          //console.log(i)
          if(this.inventories[j].store_id == id){
            sum += this.inventories[j].quantity
            //console.log(sum)
          }
        }
        let text = `Inventory ID:${id} - Total items : ${sum}`
        output.push({id : id, txt : text})
      }
      
      console.log(JSON.stringify(output, null, 4))
      return output
    }
  },
  methods: {
    ...mapActions(['setSnackbar']),
    setSnack: function (txt) {
      var payload = { text: txt }
      this.setSnackbar(payload)
    },
    async init () {

      let res = await stock_services.getAll()
      if (res) this.products = res
      let res2 = await stock_services.getAllInventory()
      if (res2) this.inventories = res2
      let res3 = await store_services.getAll()
      if(res3) this.stores = res3
    },
    async cancel () {
      let res2 = await stock_services.getAllInventory()
      if (res2) this.inventories = res2
      this.last_sale = []
      this.generated = false
    },
    async simulate () {
      let res2 = await stock_services.getAllInventory()
      if (res2) this.inventories = res2
      this.last_sale = []
      this.sale_generator(this.num)
    },
    async cancel2 () {
      let res2 = await stock_services.getAllInventory()
      if (res2) this.inventories = res2
      this.last_sale = []
      this.generated = false
    },
    async simulate2 () {
      // let res2 = await stock_services.getAllInventory()
      // if (res2) this.inventories = res2
      this.last_supply = []
      this.supply_generator(this.num_supply)
    },
    sale_generator: async function (n) {
      let sales = this.randomSales(n)
      this.last_sale = sales
      this.generated = true
    },
    supply_generator: async function (n) {
      let supplies = this.randomSales(n)
      this.last_supply = supplies
      this.generated2 = true
    },
    submit: async function () {
      if (this.generated) {
        let res = await store_services.postMultipleSale(this.last_sale)
        console.log('res : ' + res)
        this.last_sale = []
        this.setSnack('Sales succesfully inserted')
      }
    },
    submit2: async function () {
      if (this.generated2) {
        //let res = await store_services.postMultipleSale(this.last_supply)
        //console.log('res : ' + res)
        this.last_supply = []
        this.setSnack('Supplies succesfully inserted')
      }
    },
    getRndInteger (min, max) {
      return Math.floor(Math.random() * (max - min)) + min
    },
    randomSupply () {
      // let nb_item = this.getRndInteger(0, this.products.length)
      // let random_date = this.randomDate()
      // let store_id = this.getRndInteger(1, 3)
      // let res = this.randomCart(nb_item, store_id)
      // let product = res.items
      let sale = {
        // store_id: store_id,
        // sale_date: random_date,
        // products: product,
        // total_price: res.total_p.toFixed(2),
        // total_item: res.total_i
      }
      return sale
    },
    randomSupplies (n) {
      // let supplies = []
      // for (var i = 0; i < n; i++) {
      //   let tmp = this.randomSupply()
      //   //if (tmp.total_item != 0) supplies.push(tmp)
      // }
      return supplies
    },
    randomSale () {
      let nb_item = this.getRndInteger(0, this.products.length)
      let random_date = this.randomDate()
      let store_id = this.getRndInteger(1, 3)
      let res = this.randomCart(nb_item, store_id)
      let product = res.items
      let sale = {
        store_id: store_id,
        sale_date: random_date,
        products: product,
        total_price: res.total_p.toFixed(2),
        total_item: res.total_i
      }
      return sale
    },
    randomSales (n) {
      let sales = []
      for (var i = 0; i < n; i++) {
        let tmp = this.randomSale()
        if (tmp.total_item != 0) sales.push(tmp)
      }
      return sales
    },
    checkQuantity (s_id, p_id, q) {
      let i = 0
      let go = true
      let output = false
      while (i < this.inventories.length && go) {
        if (
          this.inventories[i].store_id != s_id &&
          this.inventories[i].product_id == p_id
        ) {
          output = (this.inventories[i].quantity - q) > 0
          if (output) {
            this.inventories[i].quantity -= q
          }
          go = false
        }
        i++
      }
      return output
    },
    randomCart (n, s_id) {
      let res = {
        items: [],
        total_p: 0,
        total_i: 0
      }
      let i = 0
      let timeout = 0
      while (i < n && timeout != n + 20) {
        let r_p = this.getRndInteger(0, this.products.length)
        if (this.checkQuantity(s_id, r_p, 1)) {
          res.items.push(this.products[r_p])
          res.total_p += this.products[r_p].price_tag
          res.total_i += 1
          i++
        }
        timeout++
      }
      if (timeout == n + 20) console.log('Timeout')
      return res
    },
    randomDate () {
      let date = new Date()
      let day = this.getRndInteger(1, date.getDate() + 1)
      let h = this.getRndInteger(1, date.getHours() + 1)
      let m = this.getRndInteger(1, date.getMinutes() + 1)
      let s = this.getRndInteger(1, date.getSeconds() + 1)
      let day_t = day < 10 ? '0' + day : '' + day
      let h_t = h < 10 ? '0' + h : '' + h
      let m_t = m < 10 ? '0' + m : '' + m
      let s_t = s < 10 ? '0' + s : '' + s
      return `${day_t}/${date.getMonth()}/${date.getFullYear()} ${h_t}:${m_t}:${s_t}`
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="scss">
#admin {
  .v-list__tile {
    border-radius: 4px;

    &--buy {
      margin-top: auto;
      margin-bottom: 17px;
    }
  }

  .v-image__image--contain {
    top: 9px;
    height: 60%;
  }

  .search-input {
    margin-bottom: 30px !important;
    padding-left: 15px;
    padding-right: 15px;
  }

  div.v-responsive.v-image > div.v-responsive__content {
    overflow-y: auto;
  }
}
</style>
