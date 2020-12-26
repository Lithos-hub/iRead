<template>
  <v-container class="text-center">
      <SectionTitle :title="sectionTitle"/>
      <v-row>


    <v-col></v-col> <!-- MARGIN LEFT -->


    <v-col> <!-- CENTERED COL / MAIN CONTENT -->

    <v-row no-gutters>
        <h4 class="list-number">
            <div class="list-number-div">1</div></h4>
 

        <v-col class="my-auto">
        
            <v-img class="list-img" src="../assets/img/error-img.jpg"></v-img>
        </v-col>
        <v-col class="text-left ml-5">
            <h1 class="list-title">Title</h1>
        <v-col class="my-auto">
            
            <h1 class="list-author">Author</h1>
            
            
            </v-col>
        <v-col class="my-auto">
            
            <h1 class="list-genre">Genre</h1>
            
            </v-col>

        </v-col>
    </v-row>

    </v-col>


    <v-col></v-col> <!-- MARGIN RIGHT -->


      </v-row>
  </v-container>
</template>

<script>
import {mapActions} from "vuex";
import SectionTitle from "../components/SectionTitle";

export default {
    data() {
        return {
            sectionTitle: "Top 100",
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

<style lang="scss" scoped>
@import 'src/scss/variables';

.list-img {
    width: 150px;

}


.list-title {
    font-size: 2em;
    font-family: $style7;
}

.list-author {
    font-size: 25px;
    color: gray;
    font-weight: 100;
    font-family: $style6;
    letter-spacing: 2px;
}

.list-genre {
    font-size: 16px;
    background: rgb(21, 146, 129);
    border-radius: 25px;
    font-family: $style4;
    text-align: center;
    color: white;
    padding: 5px;
    letter-spacing: 5px;
}

.list-number {
    right: 250px;
    position: relative;
    font-size: 2.5em;
    font-family: $style6;
   
}

.list-number-div {
    position: absolute;
    background: linear-gradient(to bottom, #161616, rgb(0, 227, 227));
    
    border-radius: 50%;
    width: 50px;
    height: 50px;
    color: white;
}

</style>