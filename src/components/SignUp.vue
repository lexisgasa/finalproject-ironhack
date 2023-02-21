<template>
  <div class="container">

    <div class="header">
      <div class="header-description">
        <h3 class="header-title">Register here!</h3>
      </div>
    </div>
    <div>
    <form @submit.prevent="signUp" class="form-sign-in">
      <div class="form">
        <div class="form-input">
          <label class="input-field-label">E-mail</label>
          <input
            type="email"
            class="input-field"
            placeholder="example@gmail.com"
            id="email"
            v-model="email"
            required
          />
        </div>
        <div class="form-input">
          <label class="input-field-label">Password</label>
          <input
            type="password"
            class="input-field"
            placeholder="**********"
            id="password"
            v-model="password"
            required
          />
        </div>
        <div class="form-input">
          <label class="input-field-label">Confirm password</label>
          <input
            type="password"
            class="input-field"
            placeholder="**********"
            id="confirmPassword"
            v-model="confirmPassword"
            required
          />
          <button class="button" type="submit">Sign Up</button>
        </div>
        <p>
          Have an account?
          <PersonalRouter
            :route="route"
            :buttonText="buttonText"
            class="sign-up-link"
          />
        </p>
      </div>
    </form>
</div>
    <div v-show="errorMsg">{{errorMsg}}</div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

// Route Variables
const route = "/auth/login";
const buttonText = "Sign In";

// Input Fields
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

// Error Message
const errorMsg = ref("");

// Router to push user once SignedUp to Log In
const redirect = useRouter();

// Arrow function to SignUp user to supaBase with a timeOut() method for showing the error
const signUp = async () => {
  if (password.value === confirmPassword.value) {
    try {
      // calls the user store and send the users info to backend to logIn
      await useUserStore().signUp(email.value, password.value);
      // redirects user to the homeView
      redirect.push({ path: "/auth/login" });
    } catch (error) {
      // displays error message
      errorMsg.value = error.message;
      // hides error message
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
  errorMsg.value = "error";
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
}

.header-title {
  font-size: 6rem;
  text-shadow: 
  0px 0px 5px #be7082,
  0px 0px 8px #a84b61,
  0px 0px 10px #8f3348;
}





form label {
  font-size: 2rem;
  color: #FF8787;
  text-shadow: 
  0px 0px 5px #ffff,
  0px 0px 7px #ffff,
  0px 0px 10px #ffff,
  0px 0px 20px #ffff,
  0px 0px 24px #ffff;

}
form ::placeholder {
  text-align: center;
  font-size: 1.7rem;
}

form input {
  padding: 0.5vw 8vw;
  font-size: 2rem;
  border: 0.15rem solid #8f3348;
}

.form-input {
  display: flex;
  flex-direction: column;
  align-items: center;
}

button:hover {
  background-color: #AEE2FF;
  color: #FFFFFF;
  box-shadow: 0px 0px 18px #FF8787;
}
button {
  background-color: #B9F3FC;
  color: #000000;
  padding: 0.5vw 7vw;
  font-size: 1.5rem;
  border: 0.15rem solid #8f3348;
  margin-top: 2vw;
}

p {
  font-size: 1.7rem;
  text-decoration: none;
  margin-bottom: 5vw;
  text-align: center;
}




</style>

