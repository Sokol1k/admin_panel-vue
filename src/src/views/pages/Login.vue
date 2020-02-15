<template>
  <v-app>
    <v-app-bar absolute color="transparent" flat height="100" dark>
      <v-container>
        <v-row
          class="flex-column align-self-center align-content-center flex-sm-row justify-space-between"
        >
          <v-toolbar-title class="mt-4 mb-2 mt-sm-0 mb-sm-0 text-center" v-text="title" />
          <div>
            <template>
              <v-btn
                v-for="(item, i) in items"
                :key="i"
                :to="item.to"
                class="ml-sm-7"
                min-height="48"
                text
              >
                <v-icon left size="20" v-text="item.icon" />
                <span v-text="item.text" />
              </v-btn>
            </template>
          </div>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-content id="pages">
      <v-img
        src="/public/img/login.jpg"
        gradient="to top, rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)"
        width="100wh"
        height="100vh"
      >
        <v-container id="register" tag="section" style="margin-top: 100px;">
          <v-col
            xl="4"
            offset-xl="4"
            lg="6"
            offset-lg="3"
            md="6"
            offset-md="3"
            sm="8"
            offset-sm="2"
          >
            <ul style="padding: 0;">
              <li style="list-style-type: none;" v-for="key in apiErrors" :key="apiErrors[key]">
                <v-alert dismissible type="error">{{ key[0] }}</v-alert>
              </li>
            </ul>
            <v-slide-y-transition appear>
              <v-card class="px-5 py-3">
                <v-card-text class="text-center">
                  <p class="headline font-weight-bold">Login</p>
                  <v-form ref="form">
                    <v-text-field
                      label="Email*"
                      prepend-icon="mdi-email"
                      v-model="userData.email"
                      v-validate="'required|max:255'"
                      :error-messages="errors.collect('email')"
                      data-vv-name="email"
                      :success="!!userData.email"
                      required
                    ></v-text-field>
                    <v-text-field
                      label="Password*"
                      prepend-icon="mdi-lock-outline"
                      :type="show ? 'text' : 'password'"
                      v-model="userData.password"
                      v-validate="'required|min:8|max:255'"
                      :error-messages="errors.collect('password')"
                      data-vv-name="password"
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      :success="!!userData.password"
                      @click:append="show = !show"
                      required
                    ></v-text-field>
                    <v-btn large color="success" @click="submit()">Login</v-btn>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-slide-y-transition>
          </v-col>
        </v-container>
      </v-img>
    </v-content>
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
  name: "PagesLogin",

  $_veeValidate: {
    validator: "new"
  },

  data: () => ({
    show: false,
    loading: false,
    userData: {
      email: "",
      password: ""
    },
    items: [
      {
        icon: "mdi-account-multiple-plus",
        text: "Register",
        to: "/register"
      },
      {
        icon: "mdi-fingerprint",
        text: "Login",
        to: "/login"
      }
    ],
    titles: {
      "/login": "Login Page",
      "/register": "Register Page"
    }
  }),
  computed: {
    status() {
      return this.$store.getters.status;
    },
    apiErrors() {
      return this.$store.getters.apiErrors;
    },
    title() {
      return this.titles[this.$route.path];
    }
  },
  methods: {
    submit() {
      this.$store.commit("status", null);
      this.$store.commit("apiErrors", {});
      this.$validator
        .validateAll()
        .then(result => (result ? this.pushRequest() : null));
    },
    async pushRequest() {
      this.loading = true;
      await this.$store.dispatch("login", this.userData);
      if (this.status == 200) {
         this.$router.push("/");
      } else if (this.status == 422) {
        for (let key in this.apiErrors) {
          this.userData[key] = "";
        }
      }
      this.loading = false;
    }
  }
};
</script>