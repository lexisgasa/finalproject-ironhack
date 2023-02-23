<!-- COMPONENTE BOILERPLATE -->
 
  <template>
    <div class="container">
      <div class="header-title">
        <h1 class="header-title"> Welcome! </h1>
      </div>
    <h2 class="header-subtitle"> It matters what you do, so feel free organize your <span>tasks here!</span> </h2>
    <div 
    class="sign-in-form">
      <form @submit.prevent="signIn">
        <input
        type="email"
        placeholder="example@gmail.com"
        id="email"
        v-model="email"
        required
        >
        <br>
        <input
        class="pass"
        type="password"
        placeholder="*********"
        id="password"
        v-model="password"
        required
        >
        <br>
        <button 
      
        :class="buttonClass"
        type="submit"
        >Sign in</button>
      </form>

      <p>* Password must have 6 characters at least!</p>
      <p>Dont have an account? <PersonalRouter :route="route" :buttonText="buttonText" class="sign-up-link"/></p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import PersonalRouter from "./PersonalRouter.vue";

const email = ref("")
const password = ref("")
const redirect = useRouter()
const buttonClass = ref(null)

// Route Variables
const route = "/auth/signup";
const buttonText = "Sign Up";

// Check if password has the minimum length


watch(password, (newValue) => {
newValue.length < 6 ? buttonClass.value = "swipe-down" : buttonClass.value = null

})



// Arrow function to Signin user to supaBase
const signIn = async () => {
  console.log("first")
  if (email.value) {
    try {
      await useUserStore().signIn(email.value, password.value)
      redirect.push ({ path: "/"})

    } catch (error) {
      throw error;
    }
  }





};
</script>

<style scoped>


.container {
  height: 100vw;
  background-image: url(../assets/741985.jpg);
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2vw;
}

.header-title {
  height: 12vw;
  font-size: 5.5rem;
  text-shadow: 
  0px 0px 5px #be7082,
  0px 0px 8px #a84b61,
  0px 0px 10px #8f3348;
}

.header-subtitle {
  font-size: 1.8rem;
}

span {
  text-shadow: 
  0px 0px 5px #ffff,
  0px 0px 7px #ffff,
  0px 0px 10px #ffff,
  0px 0px 14px #ffff,
  0px 0px 16px #ffff;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}


form ::placeholder {
  text-align: center;
  font-size: 1.5rem;
}

form input {
  padding: 0.3vw 7.5vw;
  font-size: 1.8rem;
  border: 0.15rem solid #8f3348;
}


button:hover {
  background-color: #AEE2FF;
  color: #FFFFFF;
  box-shadow: 0px 0px 18px #FF8787;
}
button {
  background-color: #B9F3FC;
  color: #000000;
  padding: 0.5vw;
  font-size: 1.3rem;
  border: 0.15rem solid #8f3348;
}

p {
  font-size: 1.5rem;
  text-decoration: none;
  margin-bottom: 3vw;
}

.swipe-down:hover {
  transform: translateY(5vw);
  border: 0.15rem solid #8f3348;
}





/* media query */

@media (max-width: 650px) {

body {
  background-color: blue;
}
}

</style>
