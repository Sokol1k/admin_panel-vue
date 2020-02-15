<template>
  <v-app>
    <base-material-snackbar
      :timeout="3000"
      v-model="snackbar"
      type="success"
      v-bind="{
        ['top']: true,
      }"
    >
      <div class="mr-4">User has been successfully approve!</div>
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
      <v-simple-table class="mx-5" v-if="usersData.length">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center" style="cursor: pointer;" @click="sortUsers('id', sort.id)">
                ID
                <v-icon small v-if="sort.id == 1">mdi-arrow-down</v-icon>
                <v-icon small v-else-if="sort.id == 2">mdi-arrow-up</v-icon>
              </th>
              <th
                class="text-center"
                style="cursor: pointer;"
                @click="sortUsers('name', sort.name)"
              >
                Name
                <v-icon small v-if="sort.name == 1">mdi-arrow-down</v-icon>
                <v-icon small v-else-if="sort.name == 2">mdi-arrow-up</v-icon>
              </th>
              <th
                class="text-center"
                style="cursor: pointer;"
                @click="sortUsers('email', sort.email)"
              >
                Email
                <v-icon small v-if="sort.email == 1">mdi-arrow-down</v-icon>
                <v-icon small v-else-if="sort.email == 2">mdi-arrow-up</v-icon>
              </th>
              <th
                class="text-center"
                style="cursor: pointer;"
                @click="sortUsers('role', sort.role)"
              >
                Role
                <v-icon small v-if="sort.role == 1">mdi-arrow-down</v-icon>
                <v-icon small v-else-if="sort.role == 2">mdi-arrow-up</v-icon>
              </th>
              <th
                class="text-center"
                style="cursor: pointer;"
                @click="sortUsers('confirmed', sort.confirmed)"
              >
                Confirmed
                <v-icon small v-if="sort.confirmed == 1">mdi-arrow-down</v-icon>
                <v-icon small v-else-if="sort.confirmed == 2">mdi-arrow-up</v-icon>
              </th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in usersData" :key="item.id">
              <td class="text-center">{{item.id}}</td>
              <td class="text-center">{{item.name}}</td>
              <td class="text-center">{{item.email}}</td>
              <td class="text-center">{{item.role}}</td>
              <td class="text-center">
                <v-icon color="success" v-if="parseInt(item.confirmed)">mdi-check-bold</v-icon>
              </td>
              <td class="text-center">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      @click="approveUser(item.id)"
                      color="green"
                      min-width="0"
                      v-on="on"
                      small
                      v-if="!parseInt(item.confirmed)"
                    >
                      <v-icon class="white--text" small>mdi-plus-circle</v-icon>
                    </v-btn>
                  </template>
                  <span>Approve</span>
                </v-tooltip>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-container class="mt-3 text-center" v-if="usersData.length">
        <v-btn @click="prevPage()" :disabled="!userPagination.prev" class="mr-1" color="blue">
          <v-icon class="white--text">mdi-arrow-left-thick</v-icon>
        </v-btn>
        <v-btn @click="nextPage()" :disabled="!userPagination.next" class="ml-1" color="blue">
          <v-icon class="white--text">mdi-arrow-right-bold</v-icon>
        </v-btn>
      </v-container>
      <template v-if="!usersData.length">
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
            <span class="display-1">No users</span>
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
  </v-app>
</template>

<script>
export default {
  name: "DashboardUsers",

  data: () => ({
    loading: true,
    search: "",
    snackbar: false,
    timeout: undefined,
    sort: {
      id: 0,
      name: 0,
      email: 0,
      role: 0,
      confirmed: 0
    },
    column: "",
    direction: "",
    dire: {
      1: "asc",
      2: "desc"
    }
  }),

  async mounted() {
    await this.$store.dispatch("usersData");
    this.loading = false;
  },
  computed: {
    usersData() {
      return this.$store.getters.usersData;
    },
    userPagination() {
      return this.$store.getters.userPagination;
    }
  },
  methods: {
    async nextPage() {
      this.loading = true;
      let params = {
        column: this.column,
        direction: this.direction,
        page: this.userPagination.next,
        search: this.search
      };
      await this.$store.dispatch("usersData", params);
      this.loading = false;
    },
    async prevPage() {
      this.loading = true;
      let params = {
        column: this.column,
        direction: this.direction,
        page: this.userPagination.prev,
        search: this.search
      };
      await this.$store.dispatch("usersData", params);
      this.loading = false;
    },
    async searchUsers() {
      this.loading = true;
      let params = {
        column: this.column,
        direction: this.direction,
        search: this.search
      };
      await this.$store.dispatch("usersData", params);
      this.loading = false;
    },
    searchTime() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(this.searchUsers, 2000);
    },
    async approveUser(user) {
      this.loading = true;
      await this.$store.dispatch("approveUser", user);
      await this.$store.dispatch("usersData");
      this.snackbar = true;
      this.loading = false;
    },
    async sortUsers(column, value) {
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
        this.column = "";
        this.direction = "";
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
      await this.$store.dispatch("usersData", params);
      this.loading = false;
    }
  }
};
</script>