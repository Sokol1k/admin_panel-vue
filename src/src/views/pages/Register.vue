<template>
  <v-app>
    <v-app-bar absolute color="transparent" flat height="100" dark>
      <v-container>
        <!-- <v-row class="flex-sm-row justify-sm-space-between justify-center"> -->
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
        src="/public/img/register.jpg"
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
                  <p class="headline font-weight-bold">Register</p>
                  <v-form ref="form">
                    <v-text-field
                      label="Name*"
                      prepend-icon="mdi-face"
                      v-model="userData.name"
                      v-validate="'required|min:2|max:50'"
                      :error-messages="errors.collect('name')"
                      data-vv-name="name"
                      :success="!!userData.name"
                      required
                    ></v-text-field>
                    <v-text-field
                      label="Email*"
                      prepend-icon="mdi-email"
                      v-model="userData.email"
                      v-validate="'required|email|max:255'"
                      :error-messages="errors.collect('email')"
                      data-vv-name="email"
                      :success="!!userData.email"
                      required
                    ></v-text-field>
                    <v-text-field
                      ref="password"
                      label="Password*"
                      prepend-icon="mdi-lock-outline"
                      type="password"
                      v-model="userData.password"
                      v-validate="'required|min:8|max:255'"
                      :error-messages="errors.collect('password')"
                      data-vv-name="password"
                      :success="!!userData.password"
                      required
                    ></v-text-field>
                    <v-text-field
                      label="Confirm Password*"
                      prepend-icon="mdi-lock-outline"
                      type="password"
                      v-model="userData.password_confirmation"
                      v-validate="'required|confirmed:password'"
                      :error-messages="errors.collect('confirm password')"
                      data-vv-name="confirm password"
                      :success="!!userData.password_confirmation"
                      required
                    ></v-text-field>
                    <v-btn class="mt-3" large color="success" @click="submit()">Register</v-btn>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-slide-y-transition>
          </v-col>
          <v-dialog v-model="dialog" persistent max-width="500">
            <v-card>
              <v-card-title class="justify-space-between">
                Successful registration!
                <v-icon aria-label="Close" class="d-none d-sm-block" @click="redirect()">mdi-close</v-icon>
              </v-card-title>
              <v-card-text>Thank you for registering on our site! Within 24 hours, our administrators will confirm your registration and you will receive a confirmation email.</v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="error" text @click="redirect()">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-container>
      </v-img>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "PagesRegister",

  $_veeValidate: {
    validator: "new"
  },

  data: () => ({
    dialog: false,
    userData: {
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
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
      await this.$store.dispatch("register", this.userData);
      if (this.status == 200) {
        this.dialog = true;
      } else if (this.status == 422) {
        for (let key in this.apiErrors) {
          this.userData[key] = "";
        }
      }
    },
    redirect() {
      this.dialog = false;
      this.$router.push("/login");
    }
  }
};
</script>