<template>
  <v-card color="white" dark>
    <div class="oer-list-item--badge__top-left"  v-if="item.type">
      <v-chip class="my-0 ml-1" :color="typeColor" label small>
        {{ item.type }}
      </v-chip>
    </div>

    <div class="oer-list-item--badge__top-right"  v-if="item.authors.length > 0">
      <v-chip
        class="my-0 mr-1"
        :color="typeColor"
        label
        small
        v-for="level in item.levels"
        :key="level"
      >
        {{ level }}
      </v-chip>
    </div>
    <v-img
      :src="item.imageSrc"
      class="white--text align-start"
      :height="height"
      :gradient="imageGradient"
    >
      <v-card-title
        class="text-word-wrap pb-0"
        v-text="item.title"
      ></v-card-title>

      <v-container fluid class="pt-0 align-end">
        <v-row dense>
          <v-col>
            <v-chip
              class="mr-1"
              color="darken-4"
              :class="typeColorClass"
              label
              small
              v-for="subject in item.subjects"
              :key="subject"
            >
              {{ subject }}
            </v-chip>
          </v-col>
        </v-row>
        <v-row dense  v-if="item.institutions.length > 0">
          <v-col>
            <span>Institutions</span>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-chip
              class="mr-1 mb-1"
              color="darken-3"
              :class="typeColorClass"
              label
              small
              v-for="institution in item.institutions"
              :key="institution"
            >
              <v-icon left> mdi-school </v-icon>
              {{ institution }}
            </v-chip>
          </v-col>
        </v-row>

        <v-row dense v-if="item.authors.length > 0">
          <v-col>
            <span>Authors</span>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-chip
              class="mr-1 mb-1"
              color="darken-2"
              :class="typeColorClass"
              label
              small
              v-for="author in item.authors"
              :key="author"
            >
              <v-icon left> mdi-account-edit </v-icon>
              {{ author }}
            </v-chip>
          </v-col>
        </v-row>
      </v-container>

      <v-expand-transition>
        <v-card
          v-if="isDetailOpen"
          class="transition-fast-in-fast-out oer-list-item--detail"
          :height="height - 50"
          :color="typeColor"
          dark
        >
          <v-container fluid class="pt-0 align-end">
            <v-row dense>
              <v-col>
                <div v-if="item.keywords.length > 0">
                  <v-row dense>
                    <v-col>
                      <span>Keywords</span>
                    </v-col>
                  </v-row>
                  <v-row dense>
                    <v-col>
                      <v-chip
                        class="mr-1"
                        color="darken-1"
                        :class="typeColorClass"
                        label
                        small
                        v-for="keyword in item.keywords"
                        :key="keyword"
                      >
                        <v-icon left> mdi-label </v-icon>
                        {{ keyword }}
                      </v-chip>
                    </v-col>
                  </v-row>
                </div>
                <v-row dense v-if="item.equivalents.length > 0">
                  <v-col>
                    <span>Equivalents</span>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col>
                    <v-chip
                      class="mr-1 mb-1"
                      color="darken-1"
                      :class="typeColorClass"
                      label
                      small
                      v-for="equivalent in item.equivalents"
                      :key="equivalent"
                    >
                      {{ equivalent }}
                    </v-chip>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-expand-transition>

      <v-btn
        class="ma-2 oer-list-item--detail-fab"
        x-small
        fab
        dark
        color="lighten-1"
        :class="typeColorClass"
        @click="toggleDetail"
      >
        <v-icon dark>{{ detailFabIcon }}</v-icon>
      </v-btn>
    </v-img>
  </v-card>
</template>

<script>
export default {
  name: 'OerListItem',
  props: ['item'],
  data () {
    return {
      isDetailOpen: false,
      detailFabIcon: 'mdi-plus'
    }
  },
  computed: {
    imageGradient () {
      switch (this.item.type) {
        case 'Textbook' : return 'to bottom, rgba(49, 27, 146,.7), rgba(49, 27, 146,.9)'
        case 'Lecture' : return 'to bottom, rgba(0, 96, 100,.7), rgba(0, 96, 100,.9)'
        case 'Slides' : return 'to bottom, rgba(26, 35, 126,.7), rgba(26, 35, 126,.9)'
        case 'Activity' : return 'to bottom, rgba(0, 77, 64,.7), rgba(0, 77, 64,.9)'
        default: return 'to bottom, rgba(38, 50, 56,.7), rgba(38, 50, 56,.9)'
      }
    },
    typeColor () {
      switch (this.item.type) {
        case 'Textbook' : return 'rgba(49, 27, 146,.95)'
        case 'Lecture' : return 'rgba(0, 96, 100,.95)'
        case 'Slides' : return 'rgba(26, 35, 126,.95)'
        case 'Activity' : return 'rgba(0, 77, 64,.95)'
        default: return 'rgba(38, 50, 56,.95)'
      }
    },
    typeColorClass () {
      switch (this.item.type) {
        case 'Textbook' : return 'deep-purple'
        case 'Lecture' : return 'cyan'
        case 'Slides' : return 'indigo'
        case 'Activity' : return 'teal'
        default: return 'blue-grey'
      }
    },
    height () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 330
        case 'md': return 300
        default: return 300
      }
    }
  },
  methods: {
    toggleDetail () {
      this.isDetailOpen = !this.isDetailOpen
      this.detailFabIcon = (this.isDetailOpen) ? 'mdi-minus' : 'mdi-plus'
    }
  }
}
</script>
<style lang="scss" scoped>
.v-card__title {
  word-break: normal;
}

%oer-list-item--badge__top {
  position: absolute;
  top: -12px;
  z-index: 1;
}

.oer-list-item--badge__top-left {
  @extend %oer-list-item--badge__top;
  left: 0;
}

.oer-list-item--badge__top-right {
  @extend %oer-list-item--badge__top;
  right: 0;
}

.oer-list-item--detail-fab {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 1;
}

.oer-list-item--detail {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
