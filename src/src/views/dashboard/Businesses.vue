<template>
  <v-app>
    <base-material-snackbar
      :timeout="3000"
      v-model="snackbar"
      :type="type"
      v-bind="{
        ['top']: true,
      }"
    >
      <div class="mr-4">{{text}}</div>
    </base-material-snackbar>
    <template>
      <v-container>
        <v-col
          xl="4"
          offset-xl="4"
          lg="6"
          offset-lg="3"
          md="6"
          offset-md="3"
          sm="8"
          offset-sm="2"
          style="display: flex; align-items: center;"
        >
          <v-text-field @input="searchTime()" v-model="search" label="Search" class="mr-3"></v-text-field>
        </v-col>
      </v-container>
      <div class="text-right">
        <v-btn @click="addBusiness()" color="success" class="white--text mr-3">
          <v-icon>mdi-plus</v-icon>
          <span>Add business</span>
        </v-btn>
      </div>
      <v-simple-table class="mx-5" v-if="businessesData.length">
        <template v-slot:default>
          <thead>
            <tr>
              <th
                class="text-center"
                style="cursor: pointer;"
                @click="sortBusiness('name', sort.name)"
              >
                Name
                <v-icon small v-if="sort.name == 1">mdi-arrow-down</v-icon>
                <v-icon small v-else-if="sort.name == 2">mdi-arrow-up</v-icon>
              </th>
              <th
                class="text-center"
                style="cursor: pointer;"
                @click="sortBusiness('category', sort.category)"
              >
                Category
                <v-icon small v-if="sort.category == 1">mdi-arrow-down</v-icon>
                <v-icon small v-else-if="sort.category == 2">mdi-arrow-up</v-icon>
              </th>
              <th
                class="text-center"
                style="cursor: pointer; min-width: 86px"
                @click="sortBusiness('rating', sort.rating)"
              >
                Rating
                <v-icon small v-if="sort.rating == 1">mdi-arrow-down</v-icon>
                <v-icon small v-else-if="sort.rating == 2">mdi-arrow-up</v-icon>
              </th>
              <th
                class="text-center"
                style="cursor: pointer; min-width: 100px;"
                @click="sortBusiness('is_licensed', sort.is_licensed)"
              >
                Licensed
                <v-icon small v-if="sort.is_licensed == 1">mdi-arrow-down</v-icon>
                <v-icon small v-else-if="sort.is_licensed == 2">mdi-arrow-up</v-icon>
              </th>
              <th
                class="text-center"
                style="cursor: pointer;"
                @click="sortBusiness('full_address', sort.full_address)"
              >
                Address
                <v-icon small v-if="sort.full_address == 1">mdi-arrow-down</v-icon>
                <v-icon small v-else-if="sort.full_address == 2">mdi-arrow-up</v-icon>
              </th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in businessesData" :key="item.id">
              <td>{{ item.name || '-' }}</td>
              <td class="text-center">{{ item.category || '-'}}</td>
              <td class="text-center">{{ item.rating || '-'}}</td>
              <td class="text-center">
                <v-icon color="success" v-if="parseInt(item.is_licensed)">mdi-check-bold</v-icon>
                <template v-else>
                  <div>-</div>
                </template>
              </td>
              <td>{{ item.full_address || '-'}}</td>
              <td class="text-center">
                <div style="min-width: 112px;">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        @click="showBusiness(item.id)"
                        color="yellow"
                        class="px-2 ma-1"
                        min-width="0"
                        v-on="on"
                        small
                      >
                        <v-icon small>mdi-eye</v-icon>
                      </v-btn>
                    </template>
                    <span>View</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        @click="updateBusiness(item.id)"
                        :disabled="!roleUser(item.user_id)"
                        color="blue"
                        class="px-2 ma-1"
                        min-width="0"
                        v-on="on"
                        small
                      >
                        <v-icon class="white--text" small>mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    <span>Update</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        @click="dialogDelete(item.id)"
                        :disabled="!roleUser(item.user_id)"
                        color="red"
                        class="px-2 ma-1"
                        min-width="0"
                        v-on="on"
                        small
                      >
                        <v-icon class="white--text" small>mdi-delete</v-icon>
                      </v-btn>
                    </template>
                    <span>Delete</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        @click="addBusinessCompare(item.id)"
                        color="green"
                        class="px-2 ma-1"
                        min-width="0"
                        v-on="on"
                        small
                      >
                        <v-icon class="white--text" small>mdi-plus-circle</v-icon>
                      </v-btn>
                    </template>
                    <span>Compare</span>
                  </v-tooltip>
                </div>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-container class="mt-3 text-center" v-if="businessesData.length">
        <v-btn @click="prevPage()" :disabled="!businessPagination.prev" class="mr-1" color="blue">
          <v-icon class="white--text">mdi-arrow-left-thick</v-icon>
        </v-btn>
        <v-btn @click="nextPage()" :disabled="!businessPagination.next" class="ml-1" color="blue">
          <v-icon class="white--text">mdi-arrow-right-bold</v-icon>
        </v-btn>
      </v-container>
      <template v-if="!businessesData.length">
        <v-container>
          <v-col
            class="text-center"
            xl="4"
            offset-xl="4"
            lg="6"
            offset-lg="3"
            md="6"
            offset-md="3"
            sm="8"
            offset-sm="2"
          >
            <span class="display-1">No business</span>
          </v-col>
        </v-container>
      </template>
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
    <v-dialog v-model="dialog" max-width="296">
      <v-card>
        <v-card-title class="headline">
          <p>Are you sure you want to delete the business?</p>
        </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="deleteBusiness()">Yes</v-btn>

          <v-btn color="red darken-1" text @click="noDelete()">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  name: "DashboardBusinesses",

  data: () => ({
    dialog: false,
    snackbar: false,
    type: undefined,
    text: undefined,
    loading: true,
    search: "",
    timeout: undefined,
    deleteId: undefined,
    sort: {
      name: 0,
      category: 0,
      rating: 0,
      is_licensed: 0,
      full_address: 0
    },
    column: "updated_at",
    direction: "desc",
    dire: {
      1: "asc",
      2: "desc"
    }
  }),

  async mounted() {
    let params = {
      column: this.column,
      direction: this.direction
    };
    await this.$store.dispatch("businessesData", params);
    this.loading = false;
  },

  computed: {
    businessesData() {
      return this.$store.getters.businessesData;
    },
    businessPagination() {
      return this.$store.getters.businessPagination;
    },
    businessShow() {
      return this.$store.getters.businessShow;
    },
    businessBusinessCompare() {
      return this.$store.getters.businessBusinessCompare;
    },
    businessBusinessCompareId() {
      return this.$store.getters.businessBusinessCompareId;
    }
  },

  methods: {
    async nextPage() {
      this.loading = true;
      let params = {
        column: this.column,
        direction: this.direction,
        page: this.businessPagination.next,
        search: this.search
      };
      await this.$store.dispatch("businessesData", params);
      this.loading = false;
    },
    async prevPage() {
      this.loading = true;
      let params = {
        column: this.column,
        direction: this.direction,
        page: this.businessPagination.prev,
        search: this.search
      };
      await this.$store.dispatch("businessesData", params);
      this.loading = false;
    },
    searchTime() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(this.searchBusinesses, 2000);
    },
    async searchBusinesses() {
      this.loading = true;
      let params = {
        column: this.column,
        direction: this.direction,
        search: this.search
      };
      await this.$store.dispatch("businessesData", params);
      this.loading = false;
    },
    async showBusiness(business) {
      this.loading = true;
      this.$router.push(`/businesses/show/${business}`);
    },
    async updateBusiness(business) {
      this.loading = true;
      this.$router.push(`/businesses/update/${business}`);
    },
    async addBusiness() {
      this.loading = true;
      this.$router.push("/businesses/add");
    },
    async deleteBusiness() {
      this.dialog = false;
      this.loading = true;
      await this.$store.dispatch("deleteBusiness", this.deleteId);
      let params = {
        column: this.column,
        direction: this.direction
      };
      await this.$store.dispatch("businessesData", params);
      this.showSnackbar(
        "success",
        "The business has been successfully deleted!"
      );
      this.loading = false;
    },
    async sortBusiness(column, value) {
      this.loading = true;
      if (value == 0) {
        for (let key in this.sort) {
          this.sort[key] = 0;
        }
        this.sort[column] = ++value;
        this.column = column;
        this.direction = this.dire[value];
      } else if (value == 2) {
        this.sort[column] = 0;
        this.column = "updated_at";
        this.direction = "desc";
      } else {
        this.sort[column] = ++value;
        this.column = column;
        this.direction = this.dire[value];
      }
      let params = {
        column: this.column,
        direction: this.direction,
        search: this.search
      };
      await this.$store.dispatch("businessesData", params);
      this.loading = false;
    },
    async addBusinessCompare(business) {
      this.loading = true;
      await this.$store.dispatch("showBusiness", business);
      for (let i = 0; i < this.businessBusinessCompareId.length; i++) {
        if (this.businessBusinessCompareId[i] == this.businessShow.id) {
          this.showSnackbar(
            "error",
            "This business has already been added to the comparison list!"
          );
          this.loading = false;
          return;
        }
      }
      this.$store.commit("addBusinessCompare", this.businessShow);
      this.loading = false;
      this.showSnackbar(
        "success",
        "Business successfully added to comparison list!"
      );
    },
    roleUser(id) {
      if (localStorage.user_role == "admin") {
        return true;
      } else {
        return localStorage.user_id == id;
      }
    },
    dialogDelete(deleteId) {
      this.dialog = true;
      this.deleteId = deleteId;
    },
    noDelete() {
      this.dialog = false;
      this.deleteId = undefined;
    },
    showSnackbar(type, text) {
      this.snackbar = true;
      this.type = type;
      this.text = text;
    }
  }
};
</script>