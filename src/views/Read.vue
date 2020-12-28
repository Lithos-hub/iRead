<template>
<div>
      <SectionTitle :title="sectionTitle"/>



</div>
</template>

<script>
import {mapActions} from "vuex";
import SectionTitle from "../components/SectionTitle";
export default {
  data() {
    return {
      sectionTitle: "Read",
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
    
  },
}
</script>

<style>

</style>