<template>
  <v-app>
    <v-container class="text-center">
      <div class="display-4 font-weight-black mt-12" style="color: #56aff6;">404</div>
      <div class="headline">Page not found :(</div>
      <v-btn to="/" color="blue" class="white--text mt-4">Back</v-btn>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "ErrorNotFound",
};
</script>