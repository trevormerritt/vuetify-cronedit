<template>
  <div>
    <v-card>
      <v-toolbar flat color="primary" dark>
        <v-toolbar-title>Schedule</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-tabs>
          <v-tab>Simple Mode</v-tab>
          <v-tab>Advanced Mode</v-tab>
          <v-tab-item>
            <v-card>
              <v-card-text>
                <SimpleEditor @update="update($event)" />
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card>
              <v-card-text>
                <AdvancedEditor @update="update($event)" />
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import AdvancedEditor from "./parts/AdvancedEditor.vue";
import SimpleEditor from './parts/SimpleEditor.vue';

export default {
    name: 'vuetifyCronedit',
    created() {
        this.crontab = this.cron;
    },
    components: {
    AdvancedEditor,
    SimpleEditor
  },
  props: {
    cron: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      crontab: "* * * * *"
    };
  },
  methods: {
    update(newValue) {
      console.log('vuetify-cronedit:update', newValue);
      this.crontab = newValue;
      this.$emit('changed', newValue);
    }
  }
}
</script>