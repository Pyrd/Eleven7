<template>
  <v-container>
    <v-layout wrap justify-center>
      <v-flex xs12>
        <material-card color="purple" title="Stats Overview">
          <v-layout row align-center justify-start>
            <v-flex xs12 sm1 md1>
              <v-btn color="grey darken-2" icon @click="goBack()">
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
          <v-container fill-height fluid grid-list-xl>
            <v-layout wrap>
              <v-flex md12 sm12 lg4>
                <material-chart-card
                  :data="data_week_sales"
                  :options="dailySalesChart.options"
                  color="blue"
                  type="Line"
                >
                  <h4 class="title font-weight-light">Daily Sales</h4>
                  <p class="category d-inline-flex font-weight-light">Last sales from all stores</p>
                </material-chart-card>
              </v-flex>
              <v-flex md12 sm12 lg4>
                <material-chart-card
                  :data="data_week_sales_revenue"
                  :options="dailySales2Chart.options"
                  color="orange"
                  type="Bar"
                >
                  <h4 class="title font-weight-light">Daily Revenue</h4>
                  <p class="category d-inline-flex font-weight-light">Last Supplies to all stores</p>
                </material-chart-card>
              </v-flex>
              <v-flex md12 sm12 lg4>
                <material-chart-card
                  :data="data_week_supply"
                  :options="dailySupplyChart.options"
                  :responsive-options="dailySupplyChart.responsiveOptions"
                  color="red"
                  type="Bar"
                >
                  <h4 class="title font-weight-light">Daily Supplies</h4>
                  <p class="category d-inline-flex font-weight-light">Last Supplies to all stores</p>
                </material-chart-card>
              </v-flex>

              <v-flex sm6 xs12 md6 lg3>
                <material-stats-card
                  color="green"
                  icon="mdi-store"
                  title="Revenue"
                  :value="total_revenue"
                  sub-icon="mdi-calendar"
                  sub-text="Last 7 days"
                />
              </v-flex>
              <v-flex sm6 xs12 md6 lg3>
                <material-stats-card
                  color="blue darken-3"
                  icon="mdi-cart"
                  title="Sales"
                  :value="total_sales"
                  sub-icon="mdi-calendar"
                  sub-text="Last 7 days"
                />
              </v-flex>
              <v-flex sm6 xs12 md6 lg3>
                <material-stats-card
                  color="#e9c33f"
                  icon="mdi-barcode"
                  title="Item sold"
                  :value="total_item_sold"
                  sub-icon="mdi-calendar"
                  sub-text="Last 7 days"
                />
              </v-flex>
              <v-flex sm6 xs12 md6 lg3>
                <material-stats-card
                  color="red darken-3"
                  icon="mdi-package-variant"
                  title="Deliveries"
                  :value="total_supply"
                  sub-icon="mdi-calendar"
                  sub-text="Last 7 days"
                />
              </v-flex>
              <v-flex sm6 xs12 md6 lg3>
                <material-stats-card
                  color
                  icon="mdi-buffer"
                  title="Item resupplied"
                  :value="total_items"
                  sub-icon="mdi-calendar"
                  sub-text="Last 7 days"
                />
              </v-flex>

              <!-- <v-flex md12 lg6 >
        <material-card
          color="orange"
          title="Employee Stats"
          text="New employees on 15th September, 2016"
        >
          <v-data-table
            :headers="headers"
            :items="items"
            hide-actions
          >
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="font-weight-light text-warning text--darken-3"
                v-text="header.text"
              />
            </template>
            <template
              slot="items"
              slot-scope="{ index, item }"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ item.name }}</td>
              <td class="text-xs-right">{{ item.salary }}</td>
              <td class="text-xs-right">{{ item.country }}</td>
              <td class="text-xs-right">{{ item.city }}</td>
            </template>
          </v-data-table>
        </material-card>
              </v-flex>-->
            </v-layout>
          </v-container>
          <material-card  title="Sales from 7 days">
            <v-data-table
            :headers="headers"
            :items="today_sales"
            :pagination.sync="defaultSet"
            class="elevation-1"
          >
          <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="font-weight-light red--text text--darken-3"
                v-text="header.text"
              />
            </template>
            <template v-slot:items="props">
              <td class="text-xs-center">{{ props.item.sale_date }}</td>
              <td class="text-xs-center">{{ props.item.total_sales}}</td>
              <td class="text-xs-center">{{ props.item.total_income}}</td>
              <td class="text-xs-center">{{ props.item.total_sold }}</td>
            </template>
            <template v-slot:no-results>
              <v-alert
                :value="true"
                color="error"
                icon="mdi-warning"
              >Your search for "{{ filters.search }}" found no results.</v-alert>
            </template>
          </v-data-table>
          </material-card>
          <material-card  title="Supplies from 7 days">
            <v-data-table
            :headers="headers2"
            :items="today_supply"
            :pagination.sync="defaultSet"
            class="elevation-1"
          >
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="font-weight-light red--text text--darken-3"
                v-text="header.text"
              />
            </template>
            <template v-slot:items="props">
              <td class="text-xs-center">{{ props.item.supply_date }}</td>
              <td class="text-xs-center">{{ props.item.total_supply}}</td>
              <td class="text-xs-center">{{ props.item.total_item}}</td>
            </template>
            <template v-slot:no-results>
              <v-alert
                :value="true"
                color="error"
                icon="mdi-warning"
              >Your search for "{{ filters.search }}" found no results.</v-alert>
            </template>
          </v-data-table>
          </material-card>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import * as services from "../../services/statsService";
export default {
  name: "Stats",
  data() {
    return {
      id : -1,
      isLoading: true,
      filters: {
        search: ""
      },
      headers: [
        { text: "Sale Date", align: "center", value: "sale_id" },
        { text: "Total Sales", align: "center", value: "store_id" },
        { text: "Revenue", align: "center", value: "sale_date" },
        { text: "Item sold", align: "center", value: "total_price" },
      ],
      headers2: [
        { text: "Supply Date", align: "center", value: "sale_id" },
        { text: "Total Supply", align: "center", value: "store_id" },
        { text: "Items Resupplied", align: "center", value: "sale_date" },
      ],
      defaultSet: {
        descending: true,
        page: 1,
        rowsPerPage: 50,
        sortBy: "",
        totalItems: 200
      },
      days: ["M", "T", "W", "T", "F", "S", "S"],
      today: [],
      today_sales: [],
      today_supply: [],
      dailySalesChart: {
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 100, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      dailySales2Chart: {
        options: {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 300,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
          }
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function(value) {
                  return value[0];
                }
              }
            }
          ]
        ]
      },
      dailySupplyChart: {
        options: {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 50,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
          }
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function(value) {
                  return value[0];
                }
              }
            }
          ]
        ]
      }
    };
  },
  computed: {
    data_week_supply() {
      let output = {
        labels: this.dayArray(),
        series: [this.stat_daily_supply_amount()]
      };
      console.log(output);
      return output;
    },
    data_week_sales() {
      let output = {
        labels: this.dayArray(),
        series: [this.stat_daily_sales_amount()]
      };
      console.log(output);
      return output;
    },
    data_week_sales_revenue() {
      let output = {
        labels: this.dayArray(),
        series: [this.stat_daily_sales_revenue()]
      };
      console.log(output);
      return output;
    },
    total_revenue() {
      let output = 0;
      for (let i = 0; i < this.today_sales.length; i++) {
        output += this.today_sales[i].total_income;
      }
      return "" + output.toFixed(2) + " $";
    },
    total_sales() {
      let output = 0;
      for (let i = 0; i < this.today_sales.length; i++) {
        output += this.today_sales[i].total_income;
      }
      return "" + output.toFixed(0);
    },
    total_item_sold() {
      let output = 0;
      for (let i = 0; i < this.today_sales.length; i++) {
        output += this.today_sales[i].total_sold;
      }
      return "" + output.toFixed(0);
    },
    total_supply() {
      let output = 0;
      for (let i = 0; i < this.today_supply.length; i++) {
        output += this.today_supply[i].total_supply;
      }
      return "" + output.toFixed(0);
    },
    total_items() {
      let output = 0;
      for (let i = 0; i < this.today_supply.length; i++) {
        output += this.today_supply[i].total_item;
      }
      return "" + output.toFixed(0);
    }
  },
  methods: {
    dayArray() {
      let date = new Date();
      let day = date.getDay();
      let output = [];
      let i = 0;
      let j = day;
      while (i < this.days.length) {
        if (j == this.days.length) j = 0;
        output.push(this.days[j]);
        j++;
        i++;
      }
      //console.log(output)
      return output;
    },
    stat_daily_sales_amount() {
      let output = [];
      for (let i = 0; i < this.today_sales.length; i++) {
        output.push(this.today_sales[i].total_sold);
      }
      return output;
    },
    stat_daily_supply_amount() {
      let output = [];
      for (let i = this.today_supply.length - 1; i >= 0; i--) {
        output.push(this.today_supply[i].total_supply);
      }
      return output;
    },
    stat_daily_sales_revenue() {
      let output = [];
      for (let i = 0; i < this.today_sales.length; i++) {
        output.push(this.today_sales[i].total_income);
      }
      return output;
    },
    stat_daily_supply_item() {
      let output = [];
      for (let i = 0; i < this.today_sales.length; i++) {
        output.push(this.today_sales[i].total_item);
      }
      return output;
    },
    saleStatWeek(data) {
      var output = [];
      let date = JSON.parse(JSON.stringify(this.today));
      for (let i = data.length - 1; i >= 0; i--) {
        let stringdate = `${date[0]}/${date[1]}/${date[2]}`;
        if (data[i].sale_date == stringdate) {
          output.push(data[i]);
        } else {
          output.push({
            sale_date: stringdate,
            total_sales: 0,
            total_income: 0,
            total_sold: 0
          });
        }
        date[0] -= 1;
        if (date[0] == 0) date[1] -= 1;
      }
      if (data.length != 7) {
        for (let i = 0; i < 7 - data.length; i++) {
          let stringdate = `${date[0]}/${date[1]}/${date[2]}`;
          output.push({
            sale_date: stringdate,
            total_sales: 0,
            total_income: 0,
            total_sold: 0
          });
          date[0] -= 1;
          if (date[0] == 0) date[1] -= 1;
        }
      }
      console.log(JSON.stringify(output));
      return output;
    },
    supplyStatWeek(data) {
      var output = [];
      let date = JSON.parse(JSON.stringify(this.today));
      for (let i = data.length - 1; i >= 0; i--) {
        let stringdate = `${date[0]}/${date[1]}/${date[2]}`;
        if (data[i].supply_date == stringdate) {
          output.push(data[i]);
        } else {
          output.push({
            supply_date: stringdate,
            total_supply: 0,
            total_item: 0
          });
        }
        date[0] -= 1;
        if (date[0] == 0) date[1] -= 1;
      }
      if (data.length != 7) {
        for (let i = 0; i < 7 - data.length; i++) {
          let stringdate = `${date[0]}/${date[1]}/${date[2]}`;
          output.push({
            supply_date: stringdate,
            total_supply: 0,
            total_item: 0
          });
          date[0] -= 1;
          if (date[0] == 0) date[1] -= 1;
        }
      }
      console.log(JSON.stringify(output));
      return output;
    },
    nowDate() {
      let date = new Date();
      let day = date.getDate();
      let h = date.getHours();
      let m = date.getMinutes();
      let s = date.getSeconds();
      let day_t = day < 10 ? "0" + day : "" + day;
      let qdate = [day_t, date.getMonth(), date.getFullYear()];
      return qdate;
    },
    loadStats: async function() {
      this.isLoading = true;
      this.supplies = [];
      let parameters = {
        date: this.today,
        query_mode: 1,
        store_id: this.id
      };
      let res = await services.getSales(parameters);
      console.log(JSON.stringify(res, null, 4));
      if (res.err) {
        //this.setSnack('An error occured : ' +  res.err)
      } else {
        //this.setSnack('Loaded succesfully')
        this.today_sales = res.result;
      }
      let res2 = await services.getSupply(parameters);
      console.log(JSON.stringify(res2, null, 4));
      if (res2.err) {
        //this.setSnack('An error occured : ' +  res.err)
      } else {
        //this.setSnack('Loaded succesfully')
        this.today_supply = this.supplyStatWeek(res2.result);
      }
      //console.log(JSON.stringify(this.today_sales, null, 4))
      this.isLoading = false;
    },
    goBack: function() {
      this.$router.go(-1);
      // this.$router.push({ name: "Store Management" });
    }
  },
  mounted() {
    this.id = this.$route.params.id
    this.today = this.nowDate();
    this.loadStats();
  }
};
</script>
<style>
.v-input__append-outer .v-icon,
.v-input__prepend-outer .v-icon {
  color: white;
}
</style>
