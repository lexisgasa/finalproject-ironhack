<template>
  <div :class="{ completed: isComplete, containerTask: true }">
    <div class="container">
        <div class="task-order">
      <h3>{{ task.title }}</h3>
      <h3>{{ task.description }}</h3>
      <div v-if="!showEdit">
        <button @click="completeTask" class="backgroundButton">
          <img src="../assets/done3s.png" />
        </button>
        <button @click="editTask" class="backgroundButton">
            <img src="../assets/edit4s.png" />
        </button>
        <button @click="showModal" class="backgroundButton">
          <img src="../assets/trash2s.png" />
        </button>
        </div>
      </div>
      <div v-if="showEdit">
        <input type="text" v-model="newTitle" placeholder="Insert new title" />
        <textarea cols="5" rows="5" />
        <div class="buttonEditCheckDelete">
          <button @click="edited" class="backgroundButton">
            <img class="buttonImgSaveAndCancel" src="" />
          </button>
          <button @click="cancelEdit" class="backgroundButton">
            <img class="buttonImgSaveAndCancel" src="" />
          </button>
        </div>
      </div>
    </div>

    <div v-if="showEdit">
      <input type="text" v-model="currentTitle" />
      <textarea cols="5" rows="5" />
      <div class="buttonEditCheckDelete">
        <button @click="edited" class="backgroundButton">
          <img class="buttonImgSaveAndCancel" src="" />
        </button>
        <button @click="cancelEdit" class="backgroundButton">
          <img class="buttonImgSaveAndCancel" src="" />
        </button>
      </div>
    </div>
  </div>
  <div v-if="modal">
    <div class="modal">
        <div class="backgroundImage">
        <h3>Are you sure you want to delete ?</h3>
        <img class="trashImg" src="../assets/trash1s.png" />
      </div>
      <p>If you delete this task, you can't get it back</p>
      <div class="buttonEditCheckDelete">
        <button @click="deleteTask" class="modalButton">
          <img src="../images/yesButton.png" />
        </button>
        <button @click="closeModal" class="modalButton">
          <img src="../images/noButton.png" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useTaskStore } from "../stores/task";
import { supabase } from "../supabase";

const taskStore = useTaskStore();
const emit = defineEmits(["updateTask"]);

const props = defineProps({
  task: Object,
});
const isComplete = ref(props.task.is_complete);
const showEdit = ref(false);
const modal = ref(false);

const currentTitle = ref("");
const currentDescription = ref("");
const showModal = () => {
  modal.value = true;
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  modal.value = false;
  document.body.style.overflow = "auto";
};

const deleteTask = async () => {
  await taskStore.deleteTask(props.task.id);
  document.body.style.overflow = "auto";
};

const completeTask = () => {
  isComplete.value = !isComplete.value;
  taskStore.toggleTask(isComplete.value, props.task.id);
};

const cancelEdit = () => {
  showEdit.value = false;
};

const editTask = () => {
  showEdit.value = true;
  currentTitle.value = props.task.title;
  currentDescription.value = props.task.description;
};

const edited = () => {
  taskStore.edited(currentTitle.value, currentDescription.value, props.task.id);
  showEdit.value = false;
};

const addColor = () => {
  addColor.value = true;
};
// Función para borrar la tarea a través de la store. El problema que tendremos aquí (y en NewTask.vue) es que cuando modifiquemos la base de datos los cambios no se verán reflejados en el v-for de Home.vue porque no estamos modificando la variable tasks guardada en Home. Usad el emit para cambiar esto y evitar ningún page refresh.

const showErrorMess = ref(false);
const errorMess = ref(null);
const sendData = async () => {
  if (newTitle.value.length === 0 || newDescription.value.length === 0) {
    //Lanzar un error
    showErrorMess.value = true;
    errorMess.value = "The task title or description is empty";
    setTimeout(() => {
      showErrorMess.value = false;
    }, 5000);
  } else {
    taskStore.editTask(newTitle.value, newDescription.value, props.task.id);
    emit("updateTask");
  }
};
</script>

<style scoped>

.task-order {
    display: flex;
    flex-direction: column;
    background-color: #ffd1d9;
    margin-top: -1vw;
    padding: 10px; 
    border: 0.2rem solid;
    border-image: conic-gradient(from var(--angle), red, yellow, lime, aqua, blue, magenta, red) 1;
    animation: 8s rotate linear infinite;
}

@keyframes rotate {
  to {
    --angle: 360deg;
  }
}

@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

.task-order img {
    object-fit: contain;
    height: 2vw;
    width: 4vw;
}

.backgroundButton {
    background-color: #ABD9FF;
}

.modal {
    background-color: #ABD9FF;
    margin-top: -1vw;
    padding: 10px; 
    border: 0.2rem solid;
    border-image: conic-gradient(from var(--angle), red, yellow, lime, aqua, blue, magenta, red) 1;
    animation: 8s rotate linear infinite;
}



.trashImg {
    position: absolute;
    top: 66%;
    left: 29.5%;

width: 60%;
  
}

.backgroundImage {
    position: relative;
}
</style>

