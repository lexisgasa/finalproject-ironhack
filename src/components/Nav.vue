<template>
  <nav>
    <!-- <PersonalRouter :route="route" :buttonText="buttonText" class="logo-link"/> -->
    <router-link to="/" class="start-link">
      Home
    </router-link>
    <img src="../assets/kirby-run.png" alt="">
    <div class="mid-link">
    <ul>
        <li>
          <router-link to="/">Task Manager</router-link>
        </li>

        <li>
          <router-link to="/account">Your Account</router-link>
        </li>
        <li>
          <router-link to="/timer">Set Pomodoro timer</router-link>
        </li>
    </ul>
</div>
    <div class="end-link">
      <ul>
        <li class="log-out-welcome">
          <p>Welcome, user</p>
        </li>
        <li>
          <button @click="signOut" class="button">Log out</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
// import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { ref } from 'vue';

//constant to save a variable that will hold the use router method
const route = "/";
const buttonText = "Todo app";

// constant to save a variable that will get the user from store with a computed function imported from vue
// const getUser = computed(() => useUserStore().user);
const getUser = useUserStore().user;

// constant that calls user email from the useUSerStore
const userEmail = getUser.email;

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const redirect = useRouter();

const signOut = async () => {
  try{
    await useUserStore().signOut(); 
    redirect.push({ path: "/auth/login" });
    // call the user store and send the users info to backend to signOut
    // then redirect user to the homeView
  } catch (error) {}
};

</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;500;800&display=swap');


*{
  color: #0096FF;
  font-family: "Poppins";
  font-weight: 300;
}

nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.3vw 3vw;
  height: 4vw;

  font-size: 1.2rem;
  background: repeating-linear-gradient(
  -37deg,
  #ABD9FF,
  #ABD9FF 10px,
  #ffffff 10px,
  #acd9ec 20px
);
}

.start-link {
  width: 25vw;
}
.mid-link ul {
  display: flex;
  flex-direction: row;
  width: 50vw;
  justify-content: space-evenly;
}

.end-link ul {
  display: flex;
  flex-direction: row;
  width: 25vw;
  justify-content: flex-end;
  gap: 2vw;
}

a {
  text-decoration: none;
}

nav ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
}

button:hover {
  background-color: #ffaeb8;
  color: #8f3348;
  box-shadow: 0px 0px 18px #8f3348;
}
button {
  background-color: #fec9cf;
  color: #8f3348;
  padding: 0.5vw;
  font-size: 1.3rem;
  border: 0.1rem solid #8f3348;
  border-radius: 45%;
}




@media (max-width: 650px) {

* {
 font-size: 0.7rem; 
}

button {
  padding: 0.4vw;
  font-size: 1rem;
  border: 0.1rem solid #8f3348;
  border-radius: 45%;

}

img {
  display: none;
}


}

</style>
