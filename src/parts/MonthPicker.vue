<template>
  <v-card outlined>
    <v-card-title>Month</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-radio-group v-model="picker" @change="changed($event)">
            <v-row>
              <v-col cols="4">
                <v-radio name="picker" :value="'*'" label="Every Month" />
              </v-col>
              <v-col cols="4">
                <v-radio name="picker" :value="'*/2'" label="Even Months" />
              </v-col>
              <v-col cols="4">
                <v-radio name="picker" :value="'1-31/2'" label="Odd Months" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-radio name="picker" :value="'*/4'" label="Every 4 Months" />
              </v-col>
              <v-col cols="4">
                <v-radio name="picker" :value="'*/6'" label="Every Half Year" />
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
            :items="monthsOptions"
            :value="selectedMonthsList" 
            @change="changedMonthsList($event)" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import array2string from '../mixins/array2string'

export default {
  name: "MonthPicker",
  mixins: [ array2string ],
  methods: {
    changedMonthsList(newValue) {
      newValue.sort();
      this.months = this.array2string(newValue);
    },
    changed(newValue) {
      this.picker = newValue;
      if (newValue !== "_") {
        this.months = newValue;
      } else {
        var newString = this.array2string(newValue);
        if (newString.length > 1) {
          this.months = newString;
        }
      }
    }
  },
  computed: {
    monthsOptions() {
      return [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
    }
  },
  data() {
    return {
      picker: "*",
      months: "",
      selectedMonthsList: []
    };
  },
  watch: {
    months() {
      this.$emit('update', this.months);
    }
  },
  created() {
    this.months = this.picker;
  }
};
</script>