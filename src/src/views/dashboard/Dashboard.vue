<template>
  <v-app>
    <base-material-snackbar
      :timeout="3000"
      v-model="snackbar"
      type="error"
      v-bind="{
        ['top']: true,
      }"
    >
      <div>There are no data on dates from "{{from}}" to "{{to}}".</div>
    </base-material-snackbar>
    <template>
      <v-container>
        <v-col>
          <base-material-chart-card
            :data="chartData"
            :options="chartOptions"
            color="success"
            type="Line"
            class="mt-3"
          >
            <div
              class="d-flex flex-column flex-sm-row"
              style="align-items: center; max-width: 500px;"
            >
              <v-menu
                v-model="date1"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    prepend-icon="mdi-calendar"
                    v-model="from"
                    label="From"
                    readonly
                    v-on="on"
                    class="mr-sm-6"
                    v-validate="'required'"
                    :error-messages="errors.collect('from')"
                    data-vv-name="from"
                  ></v-text-field>
                </template>
                <v-date-picker
                  :max="new Date().toISOString().substr(0, 10)"
                  @change="changeToData()"
                  v-model="from"
                  @input="date1 = false"
                ></v-date-picker>
              </v-menu>
              <v-menu
                v-model="date2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    prepend-icon="mdi-calendar"
                    v-model="to"
                    label="To"
                    readonly
                    v-on="on"
                    class="mr-sm-6"
                    v-validate="'required'"
                    :error-messages="errors.collect('to')"
                    data-vv-name="to"
                  ></v-text-field>
                </template>
                <v-date-picker
                  :min="from"
                  :max="new Date().toISOString().substr(0, 10)"
                  v-model="to"
                  @input="date2 = false"
                ></v-date-picker>
              </v-menu>
              <div class="text-right">
                <v-btn @click="submit()" color="success">Submit</v-btn>
              </div>
            </div>
          </base-material-chart-card>
        </v-col>
      </v-container>
    </template>
    <template v-if="loading">
      <div
        style="background-color: rgb(0, 0, 0, 0.8); width: 100%; height: 100%; position: absolute;"
      >
        <v-progress-circular
          style="top: 50vh; left: 50%; transform: translateX(-50%);"
          class="text-center"
          size="70"
          width="7"
          color="blue"
          indeterminate
        ></v-progress-circular>
      </div>
    </template>
  </v-app>
</template>

<script>
export default {
  name: "Dashboard",

  $_veeValidate: {
    validator: "new"
  },

  data: () => ({
    snackbar: false,
    date1: false,
    date2: false,
    loading: undefined,
    from: undefined,
    to: undefined,
    chartData: {
      labels: [],
      series: []
    },
    chartOptions: {}
  }),
  async mounted() {
    this.setDate();
    await this.pushRequest();
  },
  computed: {
    userBusinesses() {
      return this.$store.getters.userBusinesses;
    },
    userId() {
      return this.$store.getters.userId;
    }
  },
  methods: {
    setDate() {
      let date = new Date();
      this.to = date.toISOString().substr(0, 10);
      date.setDate(date.getDate() - 7);
      this.from = date.toISOString().substr(0, 10);
    },
    start() {
      this.loading = true;
      this.chartData.labels = [];
      this.chartData.series = [[]];
      this.chartOptions = {};
    },
    async request() {
      let data = {
        params: {
          from: this.from,
          to: this.to
        },
        id: this.userId
      };
      await this.$store.dispatch("userBusinesses", data);
      if (this.userBusinesses.length) {
        this.userBusinesses.forEach(element => {
          this.chartData.labels.push(element.date);
          this.chartData.series[0].push(element.count);
        });
      } else {
        this.snackbar = true;
        this.chartData.labels = ["0"];
        this.chartData.series = [[0]];
      }
    },
    end() {
      this.chartOptions = {
        high: Math.max.apply(null, this.chartData.series[0]) + 1,
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      };
      this.loading = false;
    },
    submit() {
      this.$validator
        .validateAll()
        .then(result => (result ? this.pushRequest() : null));
    },
    async pushRequest() {
      this.start();
      await this.request();
      this.end();
    },
    changeToData() {
      let from = this.from.split('-');
      from = new Date(parseInt(from[0]), parseInt(from[1]), parseInt(from[2]));
      let to = this.to.split('-');
      to = new Date(parseInt(to[0]), parseInt(to[1]), parseInt(to[2]))
      if (from > to) this.to = this.from;
    }
  }
};
</script>