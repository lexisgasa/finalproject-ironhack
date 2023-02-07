<!-- COMPONENTE BOILERPLATE -->
 
  <template>

  <div class="container">
    <h3 class="header-title">Log In to ToDo App</h3>
    <p class="header-subtitle">Estamos en la ruta de login. Aquí deberíais crear un form con la lógica correspondiente para que este permita al usuario loguearse con su email y su contraseña. Miraros la lógica de SignUp si necesitáis inspiración :)</p>
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
        type="password"
        class="input-field"
        placeholder="*********"
        id="password"
        v-model="password"
        required
        >
        <br>
        <button 
        type="submit"
        >Sign in</button>
      </form>

      
      <p>Dont have an account? <PersonalRouter :route="route" :buttonText="buttonText" class="sign-up-link"/></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import PersonalRouter from "./PersonalRouter.vue";

const email = ref("")
const password = ref("")
const redirect = useRouter()

// Route Variables
const route = "/auth/signup";
const buttonText = "Sign Up";

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

<style></style>
