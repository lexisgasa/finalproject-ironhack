<template>
    <div class="tasks">
        <h1>Type your task down here and give your best!</h1>
        <div v-if="showErrorMessage">
            <p class="error-text">{{ errorMessage }}</p>
        </div>
        <div class="task-text">
            <div class="input-field">
                <input type="text" placeholder="Add a Task Title" v-model="name">
            </div>
            <div class="input-field">
                <textarea rows="2" cols="50" placeholder="Add a Task Description" v-model="description" />
            </div>
            <button @click="addTask" class="button">Add new task!</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task"   

const taskStore = useTaskStore();

// variables para los valors de los inputs
const name = ref('');
const description = ref('');

// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty
const showErrorMessage = ref(false);

// const constant to save a variable that holds the value of the error message
const errorMessage = ref(null);


// Arrow function para crear tareas.
const addTask = () => {
if(name.value.length === 0 || description.value.length === 0){
    // Primero comprobamos que ningún campo del input esté vacío y lanzamos el error con un timeout para informar al user.

    showErrorMessage.value = true;
    errorMessage.value = 'The task title or description is empty';
    setTimeout(() => {
    showErrorMessage.value = false;
    }, 5000);

} else {
    // Aquí mandamos los valores a la store para crear la nueva Task. Esta parte de la función tenéis que refactorizarla para que funcione con emit y el addTask del store se llame desde Home.vue.

    taskStore.addTask(name.value, description.value);
    name.value = '';
    description.value = '';
}
};

</script>

<style scoped>

.task-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.4vw;
}

input, textarea {
    background-color: #ffd1d9;
    border: none;
    border-radius: 5px 50px 50px 25px;
    resize: none;
    text-align: center;
    font-size: 1.5rem;
}
textarea {
    padding: 3vw 2vw 1vw;
}

button:hover {
  background-color: #0096FF;
  color: #FFFFFF;
  box-shadow: 0px 0px 18px #FF8787;
}
button {
  background-color: #AEE2FF;
  color: #000000;
  padding: 0.5vw;
  font-size: 1.5rem;
  border: 0.15rem solid #ffbdc8;
  border-radius: 50px;
}
h1 {
    font-size: 2.2rem;
    font-weight: 500;
  text-decoration: underline;
}







@media (max-width: 650px) {


    * {
        font-size: 0;
    }


    .task-text {

    gap: 1.5vw;
}

input, textarea {
    font-size: 1.2rem;
}
textarea {
    padding: 3vw 2vw 1vw;
}


button {

  font-size: 1.2rem;

}
h1 {
    font-size: 2rem;

}








}


</style>
  