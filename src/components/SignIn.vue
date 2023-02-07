<!-- COMPONENTE BOILERPLATE -->
 
  <template>

  <div class="container">
    <h3 class="header-title">Log In to ToDo App</h3>
    <p class="header-subtitle">Estamos en la ruta de login. Aquí deberíais crear un form con la lógica correspondiente para que este permita al usuario loguearse con su email y su contraseña. Miraros la lógica de SignUp si necesitáis inspiración :)</p>
    <div class="sign-in-form">
      <form action="">
        <input
        type="email"
        placeholder="example@gmail.com"
        id="email"
        v-model="email"
        required
        >
        <br>
        <input
        type="text"
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
import PersonalRouter from "./PersonalRouter.vue";

// Route Variables
const route = "/auth/signup";
const buttonText = "Sign Up";

// Arrow function to Signin user to supaBase
const signIn = async () => {
  try {} catch (error) {}
};
</script>

<style></style>
