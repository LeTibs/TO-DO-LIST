<template>
  <main>
    <h1>Ma To-Do List</h1>

    <form @submit.prevent="addTask">
      <input v-model="newTask" placeholder="Nouvelle tâche" required />
      <button type="submit">Ajouter</button>
    </form>

    <ul>
      <li v-for="task in tasks" :key="task.id">
        <span :style="{ textDecoration: task.done ? 'line-through' : 'none' }">
          {{ task.title }}
        </span>
        <button @click="toggleDone(task.id)">✔️</button>
        <button @click="deleteTask(task.id)">🗑️</button>
      </li>
    </ul>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const tasks = ref([])
const newTask = ref('')

// Appel au backend pour récupérer les tâches
const fetchTasks = async () => {
  const res = await fetch('http://localhost:3000/tasks')
  tasks.value = await res.json()
}

// Ajouter une tâche
const addTask = async () => {
  const res = await fetch('http://localhost:3000/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: newTask.value })
  })
  const created = await res.json()
  tasks.value.push(created)
  newTask.value = ''
}

// Supprimer une tâche
const deleteTask = async (id) => {
  await fetch(`http://localhost:3000/tasks/${id}`, { method: 'DELETE' })
  tasks.value = tasks.value.filter(task => task.id !== id)
}

// Basculer une tâche en "faite / non faite"
const toggleDone = async (id) => {
  await fetch(`http://localhost:3000/tasks/${id}`, { method: 'PUT' })
  const task = tasks.value.find(t => t.id === id)
  task.done = !task.done
}

onMounted(fetchTasks)
</script>

<style>
body {
  font-family: sans-serif;
  padding: 2rem;
}
li {
  margin-bottom: 0.5rem;
}
button {
  margin-left: 0.5rem;
}
</style>
