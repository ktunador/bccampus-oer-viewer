<template>
  <v-app>
    <v-app-bar app clipped-left :color="headerColor" dark dense>
      <v-icon class="mr-3">mdi-view-dashboard-outline</v-icon>

      <v-toolbar-title>BCcampus OER Viewer</v-toolbar-title>

      <v-spacer></v-spacer>

      <SettingsDialog />
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
        <v-overlay :value="loading" absolute opacity=".5" color="blue-grey">
          <v-progress-circular
            indeterminate
            size="64"
            width="7"
            color="blue"
          ></v-progress-circular>
        </v-overlay>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import SettingsDialog from '@/components/SettingsDialog.vue'

export default {
  name: 'App',
  components: {
    SettingsDialog
  },
  data () {
    return {
      loading: true,
      headerColor: '#00a5e1'
    }
  },
  computed: mapState(['apiEndpoint', 'customTypeRoute']),
  watch: {
    apiEndpoint (newValue, oldValue) {
      this.loadData()
    },
    customTypeRoute (newValue, oldValue) {
      this.loadData()
    }

  },
  methods: {
    loadData () {
      this.loading = true
      this.$store.dispatch('initOers').then(() => {
        this.loading = false
      })
    },
    loadSettings () {
      if (localStorage.getItem('apiEndpoint') != null) {
        this.$store.dispatch('changeApiEndpoint', localStorage.getItem('apiEndpoint'))
      }
      if (localStorage.getItem('customTypeRoute') != null) {
        this.$store.dispatch('changeCustomTypeRoute', localStorage.getItem('customTypeRoute'))
      }
    }
  },
  created () {
    this.loadSettings()
    this.loadData()
  }
}
</script>
