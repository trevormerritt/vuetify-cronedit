<template>
  <v-card outlined>
    <v-card-title>Days of the Month</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-radio-group v-model="picker" @change="changed($event)">
            <v-row>
              <v-col cols="4">
                <v-radio name="picker" :value="'*'" label="Every Day" />
              </v-col>
              <v-col cols="4">
                <v-radio name="picker" :value="'*/2'" label="Even Days" />
              </v-col>
              <v-col cols="4">
                <v-radio name="picker" :value="'1-31/2'" label="Odd Days" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-radio name="picker" :value="'*/5'" label="Every 5 Days" />
              </v-col>
              <v-col cols="4">
                <v-radio name="picker" :value="'*/7'" label="Every 7 Days" />
              </v-col>
              <v-col cols="4">
                <v-radio name="picker" :value="'*/15'" label="Every Half Month" />
              </v-col>
            </v-row>
            <v-row>
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
            :items="daysOptions"
            :value="selectedDaysList"
            @change="changedDaysList($event)" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import array2string from '@/mixins/array2string'

export default {
  name: "DayPicker",
  mixins: [array2string],
  methods: {
    changedDaysList(newValue) {
      newValue.sort();
      this.days = this.array2string(newValue);
    },
    changed(newValue) {
      this.picker = newValue
      if (newValue !== '_') {
        this.days = newValue;
      } else {
        var newString = this.array2string(newValue);
        if (this.days !== newString) {
          this.days = newString
        }
      }
    },
  },
  computed: {
    daysOptions() {
      var toReturn = [];
      for(var i = 1; i < 32; i++) {
        toReturn.push(i);
      }      
      return toReturn;
    }
  },
  data() {
    return {
      picker: "*",
      days: "",
      selectedDaysList: []
    };
  },
  watch: {
    days() {
      this.$emit('update', this.days);
    }
  },
  created() {
    this.days = this.picker;
  }
};
</script>