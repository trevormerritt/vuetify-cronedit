<template>
  <v-card outlined>
    <v-card-title>Weekdays</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-radio-group v-model="picker" @change="changed($event)">
            <v-row>
              <v-col cols="6">
                <v-radio name="picker" :value="'*'" label="Every Day" />
              </v-col>
              <v-col cols="6">
                <v-radio name="picker" :value="'1,2,3,4,5'" label="Every Weekday" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-radio name="picker" :value="'0,6'" label="Weekends" />
              </v-col>
              <v-col cols="6">
                <v-radio name="picker" :value="'_'" label="Other" />
              </v-col>
            </v-row>
          </v-radio-group>
        </v-col>
        <v-col cols="12">
          <v-select
            multiple
            chips
            clearable
            :disabled="picker !== '_'"
            :items="weekdaysOptions"
            :value="selectedWeekdaysList"
            @change="changedWeekdayList($event)"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import array2string from '../mixins/array2string'

export default {
  name: "WeekdayPicker",
  mixins: [array2string],
  methods: {
    changedWeekdayList(newValue) {
      newValue.sort();
      this.weekdays = this.array2string(newValue);
    },
    changed(newValue) {
      this.picker = newValue;
      if (newValue !== "_") {
        this.weekdays = newValue;
      } else {
        var newString = this.array2string(newValue);
        if (newString.length > 1) {
          this.weekdays = newString;
        }
      }
    }
  },
  computed: {
    weekdaysOptions() {
      return ["Sat", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    }
  },
  data() {
    return {
      picker: "",
      weekdays: "",
      selectedWeekdaysList: []
    };
  },
  watch: {
    weekdays() {
      this.$emit("update", this.weekdays);
    }
  },
  created() {
    this.weekdays = this.picker;
  }
};
</script>