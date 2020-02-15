<template>
  <v-app>
    <template>
      <v-container>
        <div class="text-left">
          <v-btn to="/businesses" color="blue" class="white--text ml-3">
            <span>Back</span>
          </v-btn>
        </div>
        <v-col class="d-flex flex-column flex-md-row">
          <v-card class="mr-md-5 mb-5 mb-md-0" width="100%">
            <div class="d-flex justify-center pa-5">
              <v-img :src="businessShow.image || '/public/img/default.png'" width="700px" height="500px"></v-img>
            </div>
            <v-card-title>{{businessShow.name}}</v-card-title>
            <v-card-text>
              <div>
                <b>Buildzoom:</b>
                <a :href="businessShow.url" target="_blank">{{businessShow.url}}</a>
              </div>
              <div v-if="businessShow.website">
                <b>Website:</b>
                <a :href="`http://${businessShow.website}`" target="_blank">{{businessShow.website}}</a>
              </div>
              <div v-if="businessShow.phone">
                <b>Phone:</b>
                {{businessShow.phone}}
              </div>
              <div v-if="businessShow.email">
                <b>Email:</b>
                {{businessShow.email}}
              </div>
              <div v-if="businessShow.full_address">
                <b>Address:</b>
                {{businessShow.full_address}}
              </div>
            </v-card-text>
          </v-card>
          <v-card width="100%">
            <v-card-title>Information:</v-card-title>
            <v-card-text>
              <div v-if="businessShow.description">
                <b>Description:</b>
                {{businessShow.description}}
              </div>
              <div v-if="businessShow.category">
                <b>Category:</b>
                {{businessShow.category}}
              </div>
              <div v-if="businessShow.rating">
                <b>Rating:</b>
                <v-icon v-for="n in businessShow.rating" :key="n" color="orange">mdi-star</v-icon>
              </div>
              <div v-if="businessShow.rating_buildzoom">
                <b>Reting Buildzoom:</b>
                {{businessShow.rating_buildzoom}}
              </div>
              <div v-if="parseInt(businessShow.is_licensed)">
                <b>Licensed:</b>
                <v-icon color="success" v-if="parseInt(businessShow.is_licensed)">mdi-check-bold</v-icon>
              </div>
              <div v-if="businessShow.license_info.type">
                <b>Licensed info:</b>
                {{businessShow.license_info.type}}
              </div>
              <div v-if="businessShow.insured_value">
                <b>Insured:</b>
                {{businessShow.insured_value}}
              </div>
              <div v-if="businessShow.bond_value">
                <b>Bond:</b>
                {{businessShow.bond_value}}
              </div>
              <div v-if="Object.keys(businessShow.employee).length" class="d-flex">
                <b class="mr-2">Employee:</b>
                <div class="d-flex flex-column">
                  <div v-for="(item, key) in businessShow.employee" :key="key">
                    <div>
                      <b class="mr-2">{{key}}:</b>
                      <span>{{item}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-if="Object.keys(businessShow.work_preferences).length"
                class="d-flex flex-column"
              >
                <b class="mr-2">Work preferences:</b>
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-center">Commercial</th>
                        <th class="text-center">Residential</th>
                        <th class="text-center">Design build</th>
                        <th class="text-center">Institutional</th>
                        <th class="text-center">Insurance restoration</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="text-center">
                          <v-icon
                            color="success"
                            v-if="businessShow.work_preferences.commercial"
                          >mdi-check-bold</v-icon>
                          <v-icon color="error" v-else>mdi-close</v-icon>
                        </td>
                        <td class="text-center">
                          <v-icon
                            color="success"
                            v-if="businessShow.work_preferences.residential"
                          >mdi-check-bold</v-icon>
                          <v-icon color="error" v-else>mdi-close</v-icon>
                        </td>
                        <td class="text-center">
                          <v-icon
                            color="success"
                            v-if="businessShow.work_preferences.design_build"
                          >mdi-check-bold</v-icon>
                          <v-icon color="error" v-else>mdi-close</v-icon>
                        </td>
                        <td class="text-center">
                          <v-icon
                            color="success"
                            v-if="businessShow.work_preferences.institutional"
                          >mdi-check-bold</v-icon>
                          <v-icon color="error" v-else>mdi-close</v-icon>
                        </td>
                        <td class="text-center">
                          <v-icon
                            color="success"
                            v-if="businessShow.work_preferences.insurance_restoration"
                          >mdi-check-bold</v-icon>
                          <v-icon color="error" v-else>mdi-close</v-icon>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </div>
            </v-card-text>
          </v-card>
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
  name: "DashboardBusinessesBusiness",

  data: () => ({
    loading: true
  }),

  async mounted() {
    await this.$store.dispatch("showBusiness", this.$route.params.business);
    this.loading = false;
  },

  computed: {
    businessShow() {
      return this.$store.getters.businessShow;
    }
  }
};
</script>