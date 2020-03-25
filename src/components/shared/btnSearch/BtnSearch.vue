<template>
  <v-btn :type="type" icon large color="green">
    <v-icon>{{ title }}</v-icon>
  </v-btn>
</template>
<script>
export default {
  props: ["type", "title"]
};
</script>
<style scoped>
.theme--light.v-btn.v-btn--icon {
  color: green;
  margin: 6px auto;
}
</style>