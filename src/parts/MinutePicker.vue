 <template>
  <v-card outlined>
    <v-card-title>Minute</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-radio-group v-model="picker" @change="changed($event)">
            <v-row>
              <v-col cols="4">
                <v-radio name="picker" :value="'*'" label="Every Minute" />
              </v-col>
              <v-col cols="4">
                <v-radio name="picker" :value="'*/2'" label="Even Minutes" />
              </v-col>
              <v-col cols="4">
                <v-radio name="picker" :value="'1-59/2'" label="Odd Minutes" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-radio name="picker" :value="'*/5'" label="Every 5 Minutes" />
              </v-col>
              <v-col cols="4">
                <v-radio name="picker" :value="'*/15'" label="Every 15 Minutes" />
              </v-col>
              <v-col cols="4">
                <v-radio name="picker" :value="'*/30'" label="Every 30 Minutes" />
              </v-col>
              <v-col cols="12">
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
            :items="minuteOptions"
            :value="selectedMinutesList"
            @change="changedMinuteList($event)"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import array2string from '../mixins/array2string'

export default {
  name: "MinutePicker",
  mixins: [array2string],
  methods: {
    changedMinuteList(newValue) {
      newValue.sort();
      this.minutes = this.array2string(newValue);
    },
    changed(newValue, newvalue2) {
      console.log('minutepicker:changed', this.picker, newValue, newvalue2);
      this.picker = newValue;
      if (newValue === "_") {
        var newMinutes = this.array2string(newValue);
        if (newMinutes.length > 1) {
          this.minutes = newMinutes;
        }
      } else {
        this.minutes = newValue;
      }
    }
  },
  computed: {
    minuteOptions() {
      var toReturn = [];
      for (var i = 0; i < 60; i++) {
        toReturn.push(i);
      }
      return toReturn;
    }
  },
  data() {
    return {
      picker: "*",
      minutes: "",
      selectedMinutesList: []
    };
  },
  watch: {
    minutes() {
      this.$emit("update", this.minutes);
    }
  },
  created() {
    this.minutes = this.picker;
  }
};
</script>