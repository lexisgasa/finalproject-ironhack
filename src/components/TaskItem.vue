<template>
  <div :class="{ completed: isComplete}" class="container-style">
    <div class="container">
      <div class="task-order">
        <h3>{{ task.title }}</h3>
        <h3>{{ task.description }}</h3>
        <div v-if="!editData">
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
    </div>

    <div v-if="editData" class="edit-style">
      <input type="text" v-model="newTitle" placeholder="type the new title" />
     <textarea
     name="description"
     v-model="newDescription"
        cols="5"
        rows="2"
        placeholder="type the new description" />
      <div class="editButtons">
        <button @click="sendData" class="backgroundButton">
          <img src="../assets/edit3.png" class="editIcon" />
        </button>
        <button @click="cancelEdit" class="backgroundButton">
          <img src="../assets/icons8-cancel-64.png" class="editIcon" />
        </button>
      </div>
    </div>
  </div>

  <div v-if="modal" class="modal">
    <h3>Are you sure you want to delete ?</h3>
    <p>If you delete this task, you can't get it back</p>
    <div class="editButton">
      <button @click="deleteTask" class="modalButton">
        <img src="../assets/trash1s.png" class="modalIcon" />
      </button>
      <button @click="closeModal" class="modalButton">
        <img src="../assets/icons8-cancel-64.png" class="modalIcon" />
      </button>
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
const editData = ref(false);
const modal = ref(false);
const currentTitle = ref("");
const currentDescription = ref("");
const newDescription = ref("")
const newTitle = ref("")


const showModal = () => {
  modal.value = true;
};

const closeModal = () => {
  modal.value = false;
 
};

const deleteTask = async () => {
  await taskStore.deleteTask(props.task.id);

};

const completeTask = () => {
  isComplete.value = !isComplete.value;
  taskStore.toggleTask(isComplete.value, props.task.id);
};

const cancelEdit = () => {
  editData.value = false;
};

const editTask = (title, description, id) => {
  if (isComplete.value === false ) {
  editData.value = true;
  currentTitle.value = props.task.title;
  currentDescription.value = props.task.description; }
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
    await taskStore.editTask(newTitle.value, newDescription.value, props.task.id);
    showInput.value = false
    emit("updateTask");
  }
};
</script>

<style scoped>



.container-style {
  display: flex;
    flex-direction: row;
    
}


input, textarea {
    margin: 0 0 1vw 2.5vw;
    background-color: #ffd1d9;
    border: none;
    border-radius: 5px 50px 50px 25px;
    resize: none;
    text-align: center;
    font-size: 1.5rem;
}

.editButtons {
margin-left: 4vw;
}

.editIcon {
  object-fit: contain;
  object-position: 0.2vw;
  height: 2.9vw;
  width: 2.8vw;
}
.editIcon:hover {
  background-color: #abd9ff;
  cursor: pointer;
  border-radius: 50%;
  box-shadow: 0px 0px 15px #fff4d2;
}

.edit-style {
  display: flex;
  flex-direction: column;
  
}

.task-order {
  display: flex;
  flex-direction: column;
  background-color: #ffd1d9;
  margin-top: -1vw;
  padding: 10px;
  border: 0.2rem solid;
  border-image: conic-gradient(
      from var(--angle),
      red,
      yellow,
      lime,
      aqua,
      blue,
      magenta,
      red
    )
    1;
  animation: 8s rotate linear infinite;
  font-size: 1.1rem;
}

@keyframes rotate {
  to {
    --angle: 360deg;
  }
}

@property --angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

.task-order img {
  object-fit: contain;
  height: 2vw;
  width: 4vw;
}

.backgroundButton {
  background-color: #abd9ff;
  margin-left: 0.5vw;
  border: none;
  border-radius: 15px;
}

.modal {
  background-color: #abd9ff;
  margin-top: -1vw;
  padding: 10px;
  border: 0.2rem solid;
  border-image: conic-gradient(
      from var(--angle),
      red,
      yellow,
      lime,
      aqua,
      blue,
      magenta,
      red
    )
    1;
  animation: 8s rotate linear infinite;
  height: 11vw;
  font-size: 1.2rem;
  font-weight: 800;
}

.editButton {
  display: flex;
  justify-content: space-evenly;
}

.modalIcon {
  object-fit: contain;
  object-position: -0.1vw;
  height: 3vw;
  width: 2.7vw;
}

.modalButton {
  background-color: transparent;
  border: none;
  border-radius: 50%;
  width: 3.5vw;
  height: 3.2vw;
}

.modalButton:hover {
  background-color: #abd9ff;
  cursor: pointer;
  border-radius: 50%;
  box-shadow: 0px 0px 15px #fff4d2;
}
</style>
