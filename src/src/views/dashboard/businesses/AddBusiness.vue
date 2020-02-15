<template>
  <v-app>
    <template>
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
      <v-container>
        <div class="text-left">
          <v-btn to="/businesses" color="blue" class="white--text ml-3">
            <span>Back</span>
          </v-btn>
        </div>
        <v-col class="d-flex flex-column">
          <div class="mb-5 d-flex flex-column flex-sm-row">
            <v-card width="100%" class="mb-5 mb-sm-0 mr-sm-5">
              <v-card-title>Basic information</v-card-title>
              <v-card-text>
                <v-text-field
                  label="Name*"
                  v-model="businessData.name"
                  v-validate="'required|min:2|max:150'"
                  :error-messages="errors.collect('name')"
                  data-vv-name="name"
                  required
                ></v-text-field>
                <v-text-field
                  label="Buildzoom url*"
                  v-model="businessData.url"
                  v-validate="'required|max:255'"
                  :error-messages="errors.collect('buildzoom url')"
                  data-vv-name="buildzoom url"
                  required
                ></v-text-field>
                <v-text-field
                  label="Website"
                  v-model="businessData.website"
                  v-validate="'max:255'"
                  :error-messages="errors.collect('website')"
                  data-vv-name="website"
                ></v-text-field>
                <v-text-field
                  label="Phone"
                  v-mask="mask"
                  v-model="businessData.phone"
                  v-validate="'max:30'"
                  :error-messages="errors.collect('phone')"
                  data-vv-name="phone"
                ></v-text-field>
                <v-text-field
                  label="Email"
                  v-model="businessData.email"
                  v-validate="'email|max:50'"
                  :error-messages="errors.collect('email')"
                  data-vv-name="email"
                ></v-text-field>
                <div class="d-flex" style="align-items: center;">
                  <v-btn @click="$refs.fileInput.click()" small>Choose</v-btn>
                  <input
                    ref="fileInput"
                    type="file"
                    accept="image/*"
                    class="d-none"
                    @change="addImage"
                  />
                  <v-text-field class="ml-4" readonly label="Image" v-model="imageName"></v-text-field>
                </div>
              </v-card-text>
            </v-card>
            <v-card width="100%">
              <v-card-title>Address</v-card-title>
              <v-card-text>
                <v-text-field
                  label="Street"
                  v-model="businessData.street_address"
                  v-validate="'max:50'"
                  :error-messages="errors.collect('street')"
                  data-vv-name="street"
                ></v-text-field>
                <v-text-field
                  label="City"
                  v-model="businessData.city"
                  v-validate="'max:50'"
                  :error-messages="errors.collect('city')"
                  data-vv-name="city"
                ></v-text-field>
                <v-text-field
                  label="State"
                  v-model="businessData.state"
                  v-validate="'max:10'"
                  :error-messages="errors.collect('state')"
                  data-vv-name="state"
                ></v-text-field>
                <v-text-field
                  label="Zipcode"
                  v-model="businessData.zipcode"
                  v-validate="'max:20'"
                  :error-messages="errors.collect('zipcode')"
                  data-vv-name="zipcode"
                ></v-text-field>
              </v-card-text>
            </v-card>
          </div>
          <div class="d-flex flex-column flex-sm-row">
            <v-card width="100%" class="mb-5 mb-sm-0 mr-sm-5">
              <v-card-title>Additional information</v-card-title>
              <v-card-text>
                <v-textarea
                  auto-grow
                  label="Description"
                  v-model="businessData.description"
                  v-validate="'max:500'"
                  :error-messages="errors.collect('description')"
                  data-vv-name="description"
                ></v-textarea>
                <v-select :items="category" label="Category" v-model="businessData.category"></v-select>
                <v-select :items="rating" label="Rating" v-model="businessData.rating"></v-select>
                <v-text-field
                  type="number"
                  label="Rating Buildzoom"
                  v-model="businessData.rating_buildzoom"
                ></v-text-field>
                <div style="border: 1px solid grey; border-radius: 5px; padding: 5px;">
                  <div>Employee</div>
                  <div class="d-flex flex-column flex-sm-row">
                    <v-text-field
                      class="mr-4"
                      label="Name"
                      v-model="employee_name"
                      v-validate="'max:100'"
                      :error-messages="errors.collect('employee name')"
                      data-vv-name="employee name"
                    ></v-text-field>
                    <v-text-field
                      label="Position"
                      :disabled="!employee_name"
                      v-model="employee_position"
                      v-validate="'max:100'"
                      :error-messages="errors.collect('position')"
                      data-vv-name="position"
                    ></v-text-field>
                  </div>
                </div>
              </v-card-text>
            </v-card>
            <v-card width="100%">
              <v-card-text>
                <v-checkbox label="License" v-model="businessData.is_licensed"></v-checkbox>
                <v-text-field
                  label="Licensed info"
                  v-model="businessData.license_info.type"
                  :disabled="!businessData.is_licensed"
                  v-validate="'max:100'"
                  :error-messages="errors.collect('licensed info')"
                  data-vv-name="licensed info"
                ></v-text-field>
                <v-text-field
                  label="Insured"
                  type="number"
                  v-model="businessData.insured_value"
                  v-validate="'max:50'"
                  :error-messages="errors.collect('insured')"
                  data-vv-name="insured"
                ></v-text-field>
                <v-text-field
                  label="Bond"
                  type="number"
                  v-model="businessData.bond_value"
                  v-validate="'max:50'"
                  :error-messages="errors.collect('bond')"
                  data-vv-name="bond"
                ></v-text-field>
                <div style="border: 1px solid grey; border-radius: 5px; padding: 5px;">
                  <div>Work preferences</div>
                  <div>
                    <v-checkbox
                      class="mt-0"
                      label="Commercial"
                      v-model="businessData.work_preferences.commercial"
                    ></v-checkbox>
                    <v-checkbox
                      class="mt-0"
                      label="Residential"
                      v-model="businessData.work_preferences.residential"
                    ></v-checkbox>
                    <v-checkbox
                      class="mt-0"
                      label="Design build"
                      v-model="businessData.work_preferences.design_build"
                    ></v-checkbox>
                    <v-checkbox
                      class="mt-0"
                      label="Institutional"
                      v-model="businessData.work_preferences.institutional"
                    ></v-checkbox>
                    <v-checkbox
                      class="mt-0"
                      label="Insurance restoration"
                      v-model="businessData.work_preferences.insurance_restoration"
                    ></v-checkbox>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </div>
        </v-col>
        <div class="text-right">
          <v-btn @click="submit()" color="success" class="white--text mr-3">
            <v-icon>mdi-plus</v-icon>
            <span>Add</span>
          </v-btn>
        </div>
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
import { mask } from "vue-the-mask";

export default {
  name: "DashboardBusinessesAddBusiness",

  directives: {
    mask
  },

  $_veeValidate: {
    validator: "new"
  },

  data: () => ({
    loading: true,
    snackbar: false,
    type: undefined,
    text: undefined,
    mask: "(###) ###-####",
    employee_name: "",
    employee_position: "",
    imageName: "",
    businessData: {
      name: "",
      url: "",
      description: "",
      category: "",
      rating: "",
      rating_buildzoom: "",
      phone: "",
      email: "",
      website: "",
      is_licensed: false,
      license_info: { type: "" },
      insured_value: "",
      bond_value: "",
      street_address: "",
      city: "",
      state: "",
      zipcode: "",
      work_preferences: {
        commercial: false,
        residential: false,
        design_build: false,
        institutional: false,
        insurance_restoration: false
      }
    },
    category: [
      "Electrician",
      "GeneralContractor",
      "HomeAndConstructionBusiness",
      "HousePainter",
      "HVACBusiness",
      "Plumber",
      "RoofingContractor"
    ],
    rating: [5, 4, 3, 2, 1]
  }),

  async mounted() {
    this.loading = false;
  },
  computed: {
    businessStatus() {
      return this.$store.getters.businessStatus;
    },
    businessApiError() {
      return this.$store.getters.businessApiError;
    }
  },
  methods: {
    submit() {
      this.$store.commit("businessStatus", null);
      this.$store.commit("businessApiError", {});
      this.loading = true;
      this.$validator.validateAll().then(result => {
        if (result) {
          this.pushRequest();
        } else {
          this.showSnackbar(
            "error",
            "Data entered incorrectly, please check your data."
          );
          this.loading = false;
        }
      });
    },
    addImage(event) {
      const file = event.target.files[0];
      if (file.size < 1000000) {
        this.imageName = file.name;
        this.businessData.image = file;
      } else {
        this.showSnackbar(
          "error",
          "The picture should weigh no more than 1 MB!"
        );
      }
    },
    async pushRequest() {
      let data = this.dataAdjustment();
      await this.$store.dispatch("createBusiness", data);
      this.loading = false;
      if (this.businessStatus == 422) {
        for (let key in this.businessApiError) {
          this.businessData[key] = "";
        }
        this.showSnackbar(
          "error",
          "Data entered incorrectly, please check your data."
        );
      } else {
        this.$router.push("/businesses");
      }
    },
    addData(data, name, item) {
      if (item) {
        data.append(name, item);
      }
    },
    dataAdjustment() {
      let data = new FormData();
      data.append("name", this.businessData.name);
      data.append("url", this.businessData.url);
      data.append("image", this.businessData.image);
      this.addData(data, "website", this.businessData.website);
      this.addData(data, "phone", this.businessData.phone);
      this.addData(data, "email", this.businessData.email);
      this.addData(data, "street_address", this.businessData.street_address);
      this.addData(data, "city", this.businessData.city);
      this.addData(data, "state", this.businessData.state);
      this.addData(data, "zipcode", this.businessData.zipcode);
      if (
        this.businessData.street_address ||
        this.businessData.city ||
        this.businessData.state ||
        this.businessData.zipcode
      ) {
        var full_address = "";
        if (this.businessData.street_address) {
          full_address += this.businessData.street_address;
        }
        if (this.businessData.city) {
          full_address += " " + this.businessData.city;
        }
        if (this.businessData.state) {
          full_address += " " + this.businessData.state;
        }
        if (this.businessData.zipcode) {
          full_address += " " + this.businessData.zipcode;
        }
        full_address = full_address.trim();
        this.addData(data, "full_address", full_address);
      }
      this.addData(data, "description", this.businessData.description);
      this.addData(data, "category", this.businessData.category);
      this.addData(data, "rating", this.businessData.rating);
      this.addData(
        data,
        "rating_buildzoom",
        parseInt(this.businessData.rating_buildzoom)
      );
      if (this.businessData.is_licensed) {
        data.append("is_licensed", 1);
      }
      data.append(
        "license_info",
        JSON.stringify(this.businessData.license_info)
      );
      this.addData(data, "insured_value", this.businessData.insured_value);
      this.addData(data, "bond_value", this.businessData.bond_value);
      data.append(
        "work_preferences",
        JSON.stringify(this.businessData.work_preferences)
      );
      this.businessData.employee = {};
      if (this.employee_name) {
        this.businessData.employee[this.employee_name] = this.employee_position;
      }
      data.append("employee", JSON.stringify(this.businessData.employee));
      return data;
    },
    showSnackbar(type, text) {
      this.snackbar = true;
      this.type = type;
      this.text = text;
    }
  }
};
</script>