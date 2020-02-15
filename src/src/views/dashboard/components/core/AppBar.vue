<template>
  <v-app-bar absolute app color="transparent" flat height="75" style="width: auto;">
    <v-btn fab small @click="changeDrawer($vuetify.breakpoint.smAndDown)">
      <v-icon v-if="value">mdi-view-quilt</v-icon>
      <v-icon v-else>mdi-dots-vertical</v-icon>
    </v-btn>
    <v-toolbar-title class="ml-4" v-text="$route.name" />
    <v-spacer />

    <v-menu bottom left min-width="200" offset-y origin="top right" transition="scale-transition">
      <template v-slot:activator="{ on }">
        <v-btn min-width="0" text v-on="on">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>
      <v-list>
        <!-- <v-list-item link>
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item> -->
        <v-divider />
        <v-list-item link>
          <v-list-item-title @click="logout()">Log out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: "DashboardCoreAppBar",
  data: () => ({
    value: false
  }),
  methods: {
    changeDrawer(value) {
      if (value) {
        this.$store.commit("drawer", value);
      } else {
        this.$store.commit("expamdOnHover", !this.expamdOnHover);
        this.value = !this.value;
      }
    },
    async logout() {
      await this.$store.dispatch("logout");
      if (this.status == 200) {
        this.$router.push("/login");
      }
    }
  },
  mounted() {
    this.value = this.$store.getters.drawer;
  },
  computed: {
    drawer() {
      return this.$store.getters.drawer;
    },
    expamdOnHover() {
      return this.$store.getters.expamdOnHover;
    },
    status() {
      return this.$store.getters.status;
    }
  },
  watch: {
    "$vuetify.breakpoint.smAndDown"() {
      this.value = false;
      this.$store.commit("expamdOnHover", false);
    }
  }
};
</script>