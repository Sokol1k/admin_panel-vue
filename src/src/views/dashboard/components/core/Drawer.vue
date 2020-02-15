<template>
  <v-navigation-drawer
    v-model="drawer"
    :expand-on-hover="expamdOnHover"
    :mini-variant="miniVariant"
    src="https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-1.jpg"
    mobile-break-point="960"
    app
    dark
  >
    <template v-slot:img="props">
      <v-img :gradient="`to bottom, rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)`" v-bind="props" />
    </template>

    <v-list nav class="py-0">
      <v-list-item two-line :class="miniVariant && 'px-0'">
        <span class="ml-2 mr-8">AP</span>
        <v-list-item-content>
          <v-list-item-title class>
            <span>Admin Panel Vue.js</span>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item two-line :class="miniVariant && 'px-0'">
        <v-list-item-avatar>
          <v-icon style="font-size: 45px;">mdi-account-circle</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ userName }}</v-list-item-title>
          <v-list-item-subtitle>{{ userEmail }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="mb-4"></v-divider>

      <template>
        <v-list-item v-for="item in items" active-class="blue" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="userRole == 'admin'" active-class="blue" to="/users" link>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Users</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "DashboardCoreDrawer",

  data: () => ({
    items: [
      {
        icon: "mdi-view-dashboard",
        title: "Dashboard",
        to: "/"
      },
      {
        icon: "mdi-account-card-details",
        title: "Businesses",
        to: "/businesses"
      },
      {
        icon: "mdi-file-compare",
        title: "Compare",
        to: "/compare"
      }
    ]
  }),

  computed: {
    drawer: {
      get() {
        return this.$store.getters.drawer;
      },
      set(value) {
        this.$store.commit("drawer", value);
      }
    },
    miniVariant() {
      return this.$store.getters.miniVariant;
    },
    expamdOnHover() {
      return this.$store.getters.expamdOnHover;
    },
    userName() {
      return this.$store.getters.userName;
    },
    userEmail() {
      return this.$store.getters.userEmail;
    },
    userRole() {
      return this.$store.getters.userRole;
    }
  },

  watch: {
    "$vuetify.breakpoint.smAndDown"(value) {
      this.$store.commit("drawer", !value);
    }
  }
};
</script>