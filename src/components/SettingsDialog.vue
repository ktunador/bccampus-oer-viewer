<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500" persistent>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon title="Settings">
          <v-icon>mdi-cog</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline blue darken-3 white--text">
          Settings
        </v-card-title>
        <v-form ref="form" v-model="valid" lazy-validation class="px-5 pt-5">
          <v-text-field
            v-model="apiEndpoint"
            :rules="endpointRules"
            label="WordPress API Endpoint"
            outlined
            dense
            required
          ></v-text-field>

          <v-text-field
            v-model="customTypeRoute"
            :rules="routeRules"
            label="Custom Type Route"
            outlined
            dense
            required
          ></v-text-field>
        </v-form>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="close"> Close </v-btn>
          <v-btn color="primary" text @click="apply" :disabled="!valid">
            Apply
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
const httpRegEx = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

export default {
  data: () => ({
    dialog: false,
    valid: true,
    endpointRules: [
      v => !!v || 'WordPress API Endpoint is required',
      v => httpRegEx.test(v) || 'WordPress API Endpoint must be a valid public HTTP address'
    ],
    routeRules: [
      v => !!v || 'Custom Type Route is required'
    ],
    apiEndpoint: 'test',
    customTypeRoute: ''
  }),

  methods: {
    apply () {
      this.$refs.form.validate()
      if (this.valid) {
        this.$store.dispatch('changeApiEndpoint', this.apiEndpoint)
        this.$store.dispatch('changeCustomTypeRoute', this.customTypeRoute)

        localStorage.setItem('apiEndpoint', this.apiEndpoint)
        localStorage.setItem('customTypeRoute', this.customTypeRoute)
      }

      this.dialog = false
    },
    close () {
      this.populateFromStore()
      this.dialog = false
    },
    populateFromStore () {
      this.apiEndpoint = this.$store.state.apiEndpoint
      this.customTypeRoute = this.$store.state.customTypeRoute
    }
  },
  mounted () {
    this.populateFromStore()
  }
}
</script>
