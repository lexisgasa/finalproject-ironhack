<template>
  <div class="wrapper">
    <Nav />
    <div class="content"> 
      <NewTask />
      <h1>Current tasks:</h1>
      <div class="task-org">
      <TaskItem v-for="task in tasks" :key="task.id" :task="task" @updateTask="getTasks" />
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, onUpdated } from 'vue'
import { useTaskStore } from "../stores/task";
import { useRouter } from 'vue-router';
import Nav from '../components/Nav.vue';
import NewTask from '../components/NewTask.vue';
import TaskItem from '../components/TaskItem.vue';
import Footer from "../components/Footer.vue"

const taskStore = useTaskStore();

// Variable para guardar las tareas de supabase
const tasks = ref([]);

// Creamos una función que conecte a la store para conseguir las tareas de supabase
const getTasks = async() => {
  tasks.value = await taskStore.fetchTasks();
};

getTasks();
onUpdated (() => {
  getTasks();
});

</script>

<style scoped>


.content {
  background-image: url(../assets/741986.jpg);
  background-size: cover;
  background-position: 50% 50%;
  height: 41vw;
  display: flex;
  flex-direction: column;
  padding-left: 4vw;
}

nav {
  height: 4vw;
}

.task-org {
display: flex;
flex-wrap: wrap;
width: 100vw;
height: 20vw;
gap: 5vw
}


h1 {
  font-size: 2.2rem;
  font-weight: 500;
  text-decoration: underline;

}


</style>
