<template>
<v-container>

<SectionTitle :title="sectionTitle"/>


  <v-sheet width="100%" height="100%" elevation="10" class="pa-5" rounded color="secondary">

     
    <v-row no-gutters class="text-center pa-2 secondary cyan--text">

        <v-col>Image</v-col>
        <v-col>Title</v-col>
        <v-col>Author</v-col>
        <v-col>Genre</v-col>
        <v-col>Actions</v-col>


    </v-row>
    
    
    
 
  </v-sheet>
</v-container>
</template>

<script>
import {mapActions} from "vuex";
import SectionTitle from "../components/SectionTitle"

export default {
    data() {
        return {
            sectionTitle: "New Releases",
        }
    },
    components: {
        SectionTitle,
    },
        methods: {
        ...mapActions(["goApp"])
    },
    created() {
    this.goApp();
    }
}
</script>

<style>

</style>