<template>
<v-container>
          <SectionTitle :title="sectionTitle"/>

          <div class="list-group">
         
         <p>Version 1.1</p>
         <ul>
             <li>Added the following sections: New releases, Top 100, Account summary (Account), Login / Register (Access).</li>
             <li>Aesthetic changes in general.</li>
             <li>Responsive improvements.</li>
        </ul>


          </div>


</v-container>
</template>

<script>
import SectionTitle from "../components/SectionTitle";
import {mapActions} from "vuex";
export default {
    data() {
        return {
            sectionTitle: "Changelog"
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

</style>