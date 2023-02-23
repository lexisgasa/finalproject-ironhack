<template>
  <div>
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useUserStore } from "./stores/user.js";
import { ref } from "vue";

const router = useRouter();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

onMounted(async () => {
  const appReady = ref(null);
  try {
    await userStore.fetchUser(); // here we call fetch user
    if (!user.value) {
      // redirect them to logout if the user is not there
      appReady.value = true;
      router.push({ path: "/auth/login" });
    } else {
      // continue to dashboard
      // router.push({ path: "/" });
    }
  } catch (e) {
    console.log(e);
  }
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Annie+Use+Your+Telescope&display=swap');

* {
  font-family: "Annie use your telescope", Verdana, Geneva, Tahoma, sans-serif;

}

html, body {
  width: 100vw;
  height: 100vh;
  font-size: 1rem;
  margin: 0;
  overflow-y: hidden;
  overflow-x: hidden;
}


@media (max-width: 650px) and (max-height: 900px){
  
 body {
  background-image: linear-gradient(to bottom, #fdf6bb, #ffb1c4);
 }

}
</style>
