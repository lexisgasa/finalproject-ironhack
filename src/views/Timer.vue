<template>
  <Nav />

  <div class="pomodoro">
    <div class="background"></div>
    <h2 class="cyber">Time remaining</h2>
    <h2 class="time">{{ formatTime(currentTime) }}</h2>
    <div class="buttons">
      <button @click="startTimer">Start</button>
      <button @click="stopTimer">Stop</button>
      <button @click="resetTimer">Restart</button>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import Nav from "../components/Nav.vue";
import Footer from "../components/Footer.vue";
import { ref, onMounted } from "vue";

const totalTime = ref(25 * 60);
const currentTime = ref(totalTime.value);
const isPaused = ref(true);

const startTimer = () => {
  if (isPaused.value) {
    console.log(isPaused.value);
    const intervalId = setInterval(() => {
      if (isPaused.value) {
        if (currentTime.value === 0) {
          console.log("ispaused");
          clearInterval(intervalId);
          isPaused.value = true;
        } else {
          currentTime.value--;
        }
      }
    }, 1000);
  }
};

const stopTimer = () => {
  console.log(isPaused.value);
  isPaused.value = false;
};

const resetTimer = () => {
  currentTime.value = totalTime.value;
};

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}
</script>

<style scoped>
.pomodoro {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: "Orbitron", sans-serif;
  font-size: 5rem;
  height: 100vh;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("https://rare-gallery.com/uploads/posts/981298-city-futuristic-digital-art-dystopic-neo-tokyo.jpg");
  background-size: cover;
  filter: brightness(50%);
  z-index: -1;
}

.time {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-color: #5c5b9a;
  background-image: radial-gradient(circle at 0 0, #5c5b9a, #452b61);
  box-shadow: 0 0 10px #5c5b9a, 0 0 20px #5c5b9a, 0 0 30px #5c5b9a,
    0 0 40px #452b61, 0 0 70px #452b61, 0 0 80px #452b61, 0 0 100px #452b61;
  animation: flicker 2s infinite;
}

.buttons {
  display: flex;
  margin-top: 2rem;
}

button {
  font-family: "Orbitron", sans-serif;
  font-size: 2rem;
  margin: 0 1rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 4px;
  background-color: #5c5b9a;
  color: #fff;
  text-shadow: 0 0 5px #fff;
  cursor: pointer;
  transition: all 0.2s;
}

button:hover {
  transform: scale(1.1);
  box-shadow: 0 0 10px #fff;
}

@keyframes flicker {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

.cyber {
  font-family: "Orbitron", sans-serif;
  font-size: 4rem;
  text-transform: uppercase;
  color: #841a9e;
  text-shadow: 0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 20px #00ffff,
    0 0 40px #00ffff, 0 0 80px #00ffff, 0 0 90px #00ffff, 0 0 100px #00ffff,
    0 0 150px #00ffff;
}
</style>
