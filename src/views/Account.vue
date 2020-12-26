<template>
  <v-sheet height="100%" width="100%" elevation="10" class="pa-5">

        <SectionTitle :title="sectionTitle"/>

      <v-divider></v-divider>

      <v-list>
          <v-list-item>
              <v-list-item-title class="list-summary">
                  Saved books (My Books): {{savedbooks1}}
              </v-list-item-title>
          </v-list-item>
          <v-list-item>
              <v-list-item-title class="list-summary">
                  Saved books (Wish list): {{savedbooks2}}
              </v-list-item-title>
          </v-list-item>
          <v-list-item>
              <v-list-item-title class="list-summary">
                  Read books: {{readbooks}}
              </v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
              <v-list-item-title class="list-summary">
                  Favourite books: <v-btn class="orange darken-2"  dark small>Show info</v-btn>
              </v-list-item-title>
          </v-list-item>
          <v-list-item>
              <v-list-item-title class="list-summary">
                  Favourite authors: <v-btn class="orange darken-2" dark  small>Show info</v-btn>
              </v-list-item-title>
          </v-list-item>
          <v-list-item>
              <v-list-item-title class="list-summary">
                  Favourite genres: <v-btn class="orange darken-2" dark  small>Show info</v-btn>
              </v-list-item-title>
          </v-list-item>
      </v-list>

  </v-sheet>
</template>

<script>
import {mapActions} from "vuex";
import SectionTitle from "../components/SectionTitle";

export default {
    name: "Account",
    data() {
        return {
            savedbooks1: 0,
            savedbooks2: 0,
            readbooks: 0,
            sectionTitle: "Account summary",
        }
    },
    components: {
        SectionTitle
    },
    methods: {
        ...mapActions(["goApp"])

    },
     created() {
        this.goApp();
    }
}
</script>

<style lang="scss">
@import 'src/scss/variables';


.list-summary {
    font-size: 14px !important;
}
</style>