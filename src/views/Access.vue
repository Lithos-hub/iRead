<template>
  <div class="signup">
        <SectionTitle :title="sectionTitle"/>
    
      
      <v-row>
        <v-col></v-col>

                <v-col>
                  

                            <v-card rounded elevation="10" class="red white--text pa-2 text-center text-h5 rounded">Sign up</v-card>
                            
                            <v-sheet class="text-center pa-2 mt-5">
                            
                            <div class="pa-5 font-weight-bold text-h5">
                                
                                <v-btn disabled large color="red white--text pa-5" @click="google">Sign up with my Google account <v-icon color="white" class="ml-5">mdi-google</v-icon></v-btn>
                                
                            </div>
                            
                            </v-sheet>
                    
                  
                </v-col>
                <v-col>
                  

                            <v-card rounded elevation="10" class="blue white--text pa-2 text-center text-h5 rounded">Login</v-card>
                        
                            <v-sheet class="text-center pa-2 mt-5">
                            
                            <div class="pa-5 font-weight-bold text-h5">
                                
                                <v-btn disabled large color="info white--text">Login with my Google account <v-icon color="white" class="ml-5">mdi-google</v-icon></v-btn>
                                
                            </div>
                            
                            </v-sheet>
                    
                
                </v-col>

            <v-col></v-col>

    </v-row>

    <v-card  v-if="bar" color="info darken-3" class="pa-2 text-center white--text disclaimer-bar" id="disclaimer">In order to take advantage of all the app's functionalities, we recommend logging in with a gmail account. <span class="close-bar-btn"><v-icon v-on:click="bar = false" color="white" class="float-right">mdi-close</v-icon></span></v-card>


  </div>    
</template>

<script>
import {mapActions, mapMutations} from "vuex";
import SectionTitle from "../components/SectionTitle";
export default {
    data() {
        return {
          bar: true,
          sectionTitle: "Login / Register"
        }
    },
    components: {
      SectionTitle
    },
    methods: {
    ...mapActions(["goApp", "ewUser"]),
    ...mapMutations(["setNewUser"]),
    google() {
      const provider = new firebase.auth.GoogleAuthProvider();

      this.auth(provider);
    },
    async auth(provider) {
      try {
        const result = await firebase.auth().signInWithPopup(provider);

        const user = result.user;

        const myuser = {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
          photo: user.photoURL,
        };

        this.newUser(myuser);

        await db.collection("users").doc(myuser.uid).set(myuser);
        console.log("User saved on DB");
        router.push({ path: "/" });
      } catch (error) {
        console.log(error);
      }
    },
  },
    created() {
        this.goApp();
    }
}
</script>

<style lang="scss">
@import 'src/scss/variables';

#disclaimer {
    font-size: 12px;
    color: white;
    margin-bottom: 50px;
}

.disclaimer-bar {
  position: fixed;
  bottom: 0px;
width: 100%;
left: 0px;
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from {opacity: 0}
  to{opacity: 1}
}


</style>