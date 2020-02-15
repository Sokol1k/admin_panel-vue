<template>
  <v-container>
    <vue-scrolling-table :class="{ freezeFirstColumn:freezeFirstColumn }" v-if="items.length">
      <template slot="tbody" style="overflow: auto;">
        <tr>
          <td>
            <div class="ma-2 white--text">Contractors</div>
          </td>
          <td
            v-for="(item, i) in items"
            :key="item.name"
            class="text-center pa-2"
            style="min-width: 200px;"
          >
            <div style="position: relative;">
              <v-img
                :src="item.image || '/public/img/default.png'"
                width="100px"
                height="100px"
                style="position: absolute; left: 50%; transform: translateX(-50%);"
              ></v-img>
            </div>
            <div style="margin-top: 105px;">
              <div>{{item.name}}</div>
              <v-btn @click="deleteBusiness(i)" color="blue" class="mt-2 white--text" small>hide</v-btn>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="ma-2 white--text">Rating</div>
          </td>
          <td v-for="item in items" :key="item.name" class="text-center" style="min-width: 200px;">
            <template v-if="item.rating">
              <v-icon v-for="n in item.rating" :key="n" color="orange">mdi-star</v-icon>
            </template>
            <template v-else>
              <div>-</div>
            </template>
          </td>
        </tr>
        <tr>
          <td>
            <div class="ma-2 white--text">Rating buildzoom</div>
          </td>
          <td v-for="item in items" :key="item.name" class="text-center" style="min-width: 200px;">
            <template v-if="item.rating_buildzoom">
              <div>{{item.rating_buildzoom}}</div>
            </template>
            <template v-else>
              <div>-</div>
            </template>
          </td>
        </tr>
        <tr>
          <td>
            <div class="ma-2 white--text">Licensed</div>
          </td>
          <td v-for="item in items" :key="item.name" class="text-center" style="min-width: 200px;">
            <v-icon color="success" v-if="parseInt(item.is_licensed)">mdi-check-bold</v-icon>
            <div v-else>-</div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="ma-2 white--text">License info</div>
          </td>
          <td v-for="item in items" :key="item.name" class="pa-2" style="min-width: 200px;">
            <template v-if="item.license_info.type">
              <div>{{item.license_info.type}}</div>
            </template>
            <template v-else>
              <div class="text-center">-</div>
            </template>
          </td>
        </tr>
        <tr>
          <td>
            <div class="ma-2 white--text">Category</div>
          </td>
          <td v-for="item in items" :key="item.name" class="text-center" style="min-width: 200px;">
            <template v-if="item.category">
              <div>{{item.category}}</div>
            </template>
            <template v-else>
              <div>-</div>
            </template>
          </td>
        </tr>
        <tr>
          <td>
            <div class="ma-2 white--text">Insured</div>
          </td>
          <td v-for="item in items" :key="item.name" class="text-center" style="min-width: 200px;">
            <template v-if="item.insured_value">
              <div>{{item.insured_value}}$</div>
            </template>
            <template v-else>
              <div>-</div>
            </template>
          </td>
        </tr>
        <tr>
          <td>
            <div class="ma-2 white--text">Bond</div>
          </td>
          <td v-for="item in items" :key="item.name" class="text-center" style="min-width: 200px;">
            <template v-if="item.bond_value">
              <div>{{item.bond_value}}$</div>
            </template>
            <template v-else>
              <div>-</div>
            </template>
          </td>
        </tr>
        <tr>
          <td>
            <div class="ma-2 white--text">Work Preferences</div>
          </td>
          <td v-for="item in items" :key="item.name" class="pa-2" style="min-width: 200px;">
            <div>
              <b>Commercial:</b>
              <v-icon color="success" v-if="item.work_preferences.commercial">mdi-check-bold</v-icon>
              <v-icon color="error" v-else>mdi-close</v-icon>
            </div>
            <div>
              <b>Residential:</b>
              <v-icon color="success" v-if="item.work_preferences.residential">mdi-check-bold</v-icon>
              <v-icon color="error" v-else>mdi-close</v-icon>
            </div>
            <div>
              <b>Design build:</b>
              <v-icon color="success" v-if="item.work_preferences.design_build">mdi-check-bold</v-icon>
              <v-icon color="error" v-else>mdi-close</v-icon>
            </div>
            <div>
              <b>Institutional:</b>
              <v-icon color="success" v-if="item.work_preferences.institutional">mdi-check-bold</v-icon>
              <v-icon color="error" v-else>mdi-close</v-icon>
            </div>
            <div>
              <b>Insurance restoration:</b>
              <v-icon
                color="success"
                v-if="item.work_preferences.insurance_restoration"
              >mdi-check-bold</v-icon>
              <v-icon color="error" v-else>mdi-close</v-icon>
            </div>
          </td>
        </tr>
      </template>
    </vue-scrolling-table>
    <div v-else>
      <v-col
        class="text-center mt-10"
        xl="4"
        offset-xl="4"
        lg="6"
        offset-lg="3"
        md="6"
        offset-md="3"
        sm="8"
        offset-sm="2"
      >
        <span class="display-1">No data to compare.</span>
      </v-col>
    </div>
  </v-container>
</template>
<script>
import VueScrollingTable from "vue-scrolling-table";
//import VueScrollingTable from "../../vue-scrolling-table/src/VueScrollingTable.vue"

export default {
  name: "DashboardCompare",

  components: {
    VueScrollingTable
  },

  data: () => ({
    freezeFirstColumn: true,
    columns: [
      "Contractors",
      "Rating",
      "Rating buildzoom",
      "Licensed",
      "License info",
      "Category",
      "Insured",
      "Bond",
      "Work Preferences"
    ],
    items: []
  }),
  mounted() {
    this.items = this.businessBusinessCompare;
  },
  methods: {
    deleteBusiness(id) {
      this.$store.commit("deleteBusinessCompare", id);
    }
  },
  computed: {
    businessBusinessCompare() {
      return this.$store.getters.businessBusinessCompare;
    }
  }
};
</script>
<style>
table.freezeFirstColumn thead tr,
table.freezeFirstColumn tbody tr {
  display: block;
  width: min-content;
}

table.freezeFirstColumn thead td:first-child,
table.freezeFirstColumn tbody td:first-child,
table.freezeFirstColumn thead th:first-child,
table.freezeFirstColumn tbody th:first-child {
  position: sticky;
  position: -webkit-sticky;
  left: 0;
  vertical-align: top;
  background-color: #56aff6;
  z-index: 1;
}
tbody {
  overflow: auto !important;
}
</style>
