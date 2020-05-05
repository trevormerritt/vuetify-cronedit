<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="3">
        <v-btn rounded block x-large @click="updateValue('* */6 * * *')"
          >Every 6 Hours</v-btn
        >
      </v-col>
      <v-col cols="3">
        <v-btn rounded block x-large @click="updateValue('* 9 * *')"
          >Daily at 9am</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-btn rounded block x-large @click="updateValue('* 9-17 * * mon-fri')"
          >Monday to Friday, 9-5</v-btn
        >
      </v-col>
      <v-col cols="3">
        <v-btn rounded block x-large @click="updateValue('* 10-16 * * sat,sun')"
          >Saturday and Sunday, 10-4</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "CronSimpleEditor",
  methods: {
    updateValue(newValue) {
      this.crontab = newValue;
      this.$emit("update", this.crontab);
    },
  },
  data() {
    return {
      crontab: "",
    };
  },
};
</script>
