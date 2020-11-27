<template>
  <v-row>
    <v-col xs="12" md="6" xl="3" v-for="item in items" :key="item.id" >
      <oer-list-item v-bind:item="item" />
    </v-col>
  </v-row>
</template>

<script>
import OerListItem from '@/components/OerListItem.vue'

export default {
  name: 'OerList',
  components: {
    OerListItem
  },
  computed: {
    items () {
      return this.$store.state.oers
    }
  }
}
</script>
