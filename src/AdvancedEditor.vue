<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="4">
        <MinutePicker @update="changeMinute($event)" />
      </v-col>
      <v-col cols="4">
        <HourPicker @update="changeHour($event)" />
      </v-col>
      <v-col cols="4">
        <DayPicker @update="changeDay($event)" />
      </v-col>
      <v-col cols="6">
        <MonthPicker @update="changeMonths($event)" />
      </v-col>
      <v-col cols="6">
        <WeekdayPicker @update="changeWeekday($event)" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import MinutePicker from "@/parts/MinutePicker";
import DayPicker from "@/parts/DayPicker";
import HourPicker from "@/parts/HourPicker";
import MonthPicker from "@/parts/MonthPicker";
import WeekdayPicker from "@/parts/WeekdayPicker";

export default {
  name: "CronEditorAdvancedEditor",
  components: {
    MinutePicker,
    HourPicker,
    DayPicker,
    MonthPicker,
    WeekdayPicker
  },
  props: {
    cron: {
      type: String,
      required: false
    },
    id: {
      type: Number,
      required: false
    }
  },
  data() {
    return {
      storedId: 0,
      raw: {
        minutes: "",
        hours: "",
        days: "",
        months: "",
        weekday: ""
      }
    };
  },
  computed: {
    crontab() {
      var newValue = this.raw.minutes + " " +
        this.raw.hours + " " + this.raw.days + " " +
        this.raw.months + " " + this.raw.weekday;
      this.$emit("update", newValue);
      return newValue;
    }
  },
  methods: {
    changeMinute(newValue) {
      this.raw.minutes = newValue;
    },
    changeHour(newValue) {
      this.raw.hours = newValue;
    },
    changeDay(newValue) {
      this.raw.days = newValue;
    },
    changeMonths(newValue) {
      this.raw.months = newValue;
    },
    changeWeekday(newValue) {
      this.raw.weekday = newValue;
    }
  },
  created() {
    if (this.cron !== undefined) {
      this.crontab = this.cron;
    }
    if (this.id !== undefined) {
      this.storedId = this.id;
      console.log("weve got an id of ", this.storedId);
    }
    console.log("CRON/ID", this.cron, this.id);
  }
};
</script>