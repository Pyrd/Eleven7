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
              align-center
              justify-space-between
              style="width:100%">
              <v-flex
                xs12 sm12 md6
                style="display: flex;justify-content: left">
                <v-select
                  label='Generator mode'
                  v-model="supply_mode"
                  :items="supply_modes"
                  item-value="id"
                  item-text="value"/>
                <v-select
                  label='Inventory ID'
                  v-model="num_supply"
                  :items="inventorySelect"
                  item-value="id"
                  item-text="txt"/>
              </v-flex>
              <v-flex
                xs12 sm12 md6

                style="display: flex;justify-content: right">
                <v-btn
                  color="blue"
                  @click="simulate2">Generate Supply</v-btn>
                <v-btn
                  :disabled="!ready2"
                  color="error"
                  @click="cancel2">Cancel</v-btn>
                <v-btn
                  :disabled="!ready2"
                  color="success"
                  @click="submit2">Apply</v-btn>
              </v-flex>
            </v-layout>
          </v-card-actions>
          <material-card
            v-if="ready2"
            color
            title="Generated supplies">
            <v-data-table
              :headers="headers2"
              :items="last_supply.products"
              :pagination.sync="defaultSet"
              class="elevation-1"
            >
              <template v-slot:items="props">
                <td class="text-xs-center">{{ props.index}}</td>
                <td class="text-xs-center">{{ props.item.product_id}}</td>
                <td class="text-xs-center">{{ props.item.name}}</td>
                <td class="text-xs-center">{{ props.item.quantity}}</td>
              </template>
            </v-data-table>
          </material-card>
        </material-card>
        <material-card
          color="warning"
          title="Sales Simulalator">
          <v-card-actions>
            <v-layout
              row
              align-center
              justify-space-between
              style="width:100%">
              <v-flex
                xs1
                style="display: flex;justify-content: left">
                <v-select
                  label='Generator mode'
                  v-model="sale_mode"
                  :items="sale_modes"
                  item-value="id"
                  item-text="value"/>
              </v-flex>
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

    supply_modes : [
      {id:0, value:'Random'},
      {id:1, value:'Refill Empties'},
      ],
    supply_mode : 0,
    sale_modes : [
      {id:0, value:'Today'},
      {id:1, value:'Random'},
      ],
    sale_mode : 0,
    headers: [
      { text: 'ID', align: 'center', value: 'sale_id' },
      { text: 'Sale Date', align: 'center', value: 'sale_date' },
      { text: 'Total Price ($)', align: 'center', value: 'total_price' },
      { text: 'Total Items', align: 'center', value: 'total_items' }
    ],
    headers2: [
      { text: '#', align: 'center', value: 'i' },
      { text: 'Product ID', align: 'center', value: 'ID' },
      { text: 'Name', align: 'center', value: 'name' },
      { text: 'Quantity', align: 'center', value: 'quantity' }
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
    ready2 () {
      return this.generated2 && this.last_supply != []
    },
    inventorySelect(){
      let output = []
      if(this.supply_mode == 0){
        for(let i = 0; i < this.stores.length;i++){
          let sum = 0;
          let id = this.stores[i].store_id;
          for(let j = 0; j < this.inventories.length; j++){
            if(this.inventories[j].store_id == id){
              sum += this.inventories[j].quantity
            }
          }
          let text = `Inventory ID:${id} - Total items : ${sum}`
          output.push({id : id, txt : text})
        }
      } else {
        for(let i = 0; i < this.stores.length;i++){
          let sum = 0;
          let id = this.stores[i].store_id;
          for(let j = 0; j < this.inventories.length; j++){
            if(this.inventories[j].store_id == id && this.inventories[j].quantity == 0){
              sum += 1
            }
          }
          let text = `Inventory ID:${id} - Empty items : ${sum}`
          output.push({id : id, txt : text})
        }
      }
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
      this.generated2 = false
    },
    async simulate2 () {
      this.last_supply = []
      this.supply_generator(this.num_supply)
    },
    inventoryByID(id){
      let products = [];
      for(let j = 0; j < this.inventories.length; j++){
            if(this.inventories[j].store_id == id){
              products.push(this.inventories[j])
            }
      }
      return products
    },
    randomEle(arr, n){
      let array = JSON.parse(JSON.stringify(arr))
      array.sort(() => Math.random() - 0.5);
      array.slice(n)
      return array
    },

    sale_generator: async function (n) {
      let tmp_inventory = JSON.parse(JSON.stringify(this.inventories))
      let sales = this.randomSales(n, tmp_inventory)
      this.last_sale = sales
      this.generated = true
    },
    supply_generator: async function () {
      let supplies = this.generateSupply()
      this.last_supply = supplies
      this.generated2 = true
    },
    submit: async function () {
      if (this.generated) {
        let res = await store_services.postMultipleSale(this.last_sale)
        console.log('res : ' + res)
        this.last_sale = []
        let res2 = await stock_services.getAllInventory()
        if (res2) this.inventories = res2
        this.setSnack('Sales succesfully inserted')
      }
    },
    submit2: async function () {
      if (this.generated2) {
        //console.log(JSON.stringify(this.last_supply, null, 4))
        let res = await store_services.postSupply(this.last_supply)
        console.log('res : ' + res)
        this.last_supply = []
        this.generated2 = false;
        let res2 = await stock_services.getAllInventory()
        if (res2) this.inventories = res2
        this.setSnack('Supplies succesfully inserted')
      }
    },
    getRndInteger (min, max) {
      return Math.floor(Math.random() * (max - min)) + min
    },
    randomSupplies(){
      let nb_item = this.getRndInteger(0, this.products.length);
      let store_id = this.num_supply
      let rdmProduct = this.randomEle(this.inventoryByID(store_id));
      let output = {}
      let sum = 0
      let products = []
      for(var i = 0; i < rdmProduct.length; i++){
        let tmp = {
          product_id : rdmProduct[i].product_id,
          name : rdmProduct[i].name,
          quantity : this.getRndInteger(1, 20)
        }
        products.push(tmp)
        sum +=1
      }
      output.total_item = sum;
      output.products = products
      return output
    },
    emptySupplies(){
      let output = {}
      let sum = 0
      let products = []
      let id = this.num_supply
      for(let j = 0; j < this.inventories.length; j++){
            if(this.inventories[j].store_id == id && this.inventories[j].quantity == 0){
              let t = {
                product_id : this.inventories[j].product_id,
                name : this.inventories[j].name,
                quantity : this.getRndInteger(1, 20)
              }
              products.push(t)
              sum +=1
            }
      }
      output.total_item = sum;
      output.products = products
      return output
    },
    generateSupply () {
      let store_id = this.num_supply;
      let now_date = this.nowDate()
      let res = {}
      if(this.supply_mode == 0){
        res = this.randomSupplies()
      } else {
        res = this.emptySupplies()
      }
      let supply = {
        store_id: store_id,
        supply_date: now_date,
        products:  res.products,
        total_item: res.total_item
      }
      return supply
    },
    randomSale (inventory) {
      let nb_item = this.getRndInteger(0, this.products.length)
      let date = ''
      if(this.sale_mode == 0){
        date = this.nowDate2()
      } else {
        date = this.randomDate()
      }
      
      let store_id = this.getRndInteger(1, this.stores.length + 1)
      let res = this.randomCart(nb_item, store_id, inventory)
      let product = res.items
      let sale = {
        store_id: store_id,
        sale_date: date,
        products: product,
        total_price: res.total_p.toFixed(2),
        total_item: res.total_i
      }
      return sale
    },
    randomSales (n, inventory) {
      let sales = []
      for (var i = 0; i < n; i++) {
        let tmp = this.randomSale(inventory)
        if (tmp.total_item != 0) sales.push(tmp)
      }
      return sales
    },
    checkQuantity (inventory, s_id, p_id, q) {
      let i = 0
      let go = true
      let output = false
      while (i < inventory.length && go) {
        if (
          inventory[i].store_id != s_id &&
          inventory[i].product_id == p_id
        ) {
          output = (inventory[i].quantity - q) > 0
          if (output) {
            inventory[i].quantity -= q
          }
          go = false
        }
        i++
      }
      return output
    },
    randomCart (n, s_id, inventory) {
      let res = {
        items: [],
        total_p: 0,
        total_i: 0
      }
      let i = 0
      let timeout = 0
      while (i < n && timeout != n + 20) {
        let r_p = this.getRndInteger(0, this.products.length)
        if (this.checkQuantity(inventory, s_id, r_p, 1)) {
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
    },
    nowDate2 () {
      let date = new Date()
      let day = date.getDate()
      let h = this.getRndInteger(1, date.getHours() + 1)
      let m = this.getRndInteger(1, date.getMinutes() + 1)
      let s = this.getRndInteger(1, date.getSeconds() + 1)
      let day_t = day < 10 ? '0' + day : '' + day
      let h_t = h < 10 ? '0' + h : '' + h
      let m_t = m < 10 ? '0' + m : '' + m
      let s_t = s < 10 ? '0' + s : '' + s
      return `${day_t}/${date.getMonth()}/${date.getFullYear()} ${h_t}:${m_t}:${s_t}`
    },
    nowDate () {
      let date = new Date()
      let day = date.getDate()
      let day_t = day < 10 ? '0' + day : '' + day
      return `${day_t}/${date.getMonth()}/${date.getFullYear()}`
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
