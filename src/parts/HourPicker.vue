<template>
  <v-card outlined>
    <v-card-title>Hour</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-radio-group v-model="picker" @change="changed($event)">
            <v-row>
              <v-col cols="4">
                <v-radio name="picker" :value="'*'" label="Every Hour" />
              </v-col>
              <v-col cols="4">
                <v-radio name="picker" :value="'*/2'" label="Even Hours" />
              </v-col>
              <v-col cols="4">
                <v-radio name="picker" :value="'1-59/2'" label="Odd Hours" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
            <v-radio name="picker" :value="'*/5'" label="Every 6 Hours" />
              </v-col>
              <v-col cols="4">
            <v-radio name="picker" :value="'*/15'" label="Every 12 Hours" />
              </v-col>
              <v-col cols="4">
            <v-radio name="picker" :value="'_'" label="Other" />
              </v-col>
            </v-row>
          </v-radio-group>
        </v-col>
        <v-col v-if="picker === '_'" cols="12">
          <v-select
            multiple
            chips
            clearable
            :disabled="picker !== '_'"
            :items="hoursOptions"
            :value="selectedHoursList"
            @change="changedHoursList($event)" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import array2string from '../mixins/array2string'

export default {
  name: "HourPicker",
  mixins: [array2string],
  methods: {
    changedHoursList(newValue) {
      newValue.sort();
     this.hours = this.array2string(newValue);
    },
    changed(newValue) {
      this.picker = newValue;
      if (newValue !== "_") {
        this.hours = newValue;
      } else {
        var newString = this.array2string(newValue);
        if (newString.length > 1) {
          this.hours = newString;
        }
      }
    }
  },
  computed: {
    hoursOptions() {
      var toReturn = [];
      for (var i = 1; i < 25; i++) {
        toReturn.push(i);
      }
      return toReturn;
    }
  },
  data() {
    return {
      picker: "*",
      hours: "",
      selectedHoursList: []
    };
  },
  watch: {
    hours() {
      this.$emit("update", this.hours);
    }
  },
  created() {
    this.hours = this.picker;
  }
};
</script>
