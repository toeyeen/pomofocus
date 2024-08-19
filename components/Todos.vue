<template>
  <div class="w-80 min-h-30 p-1">

    <h1>
      Todo List
    </h1>


    <ul v-for="todo in todos">
      <li>
        <UCheckbox v-model="todo.completed" name="todoItem">
          <template #label>
            <span :class="todo.completed ? 'line-through' : ''">{{ todo.item }}</span>
          </template>
        </UCheckbox>
      </li>
    </ul>

    <h1>Completed TOdo</h1>
    <ul v-for="completedTodo in completedTodos">
      {{ completedTodo.item }}
    </ul>


    <div>
      <form class="py-2" @submit.prevent="addTodo">
        <input ref="inputRef" class="outline-none h-8" type="text" name="todos" id="todo" v-model="toyin"
          placeholder="New Todo">
        <!-- <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="addTodo">Add
          Todo</button> -->
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">

interface Todo {
  id: number
  item: string
  completed?: boolean
}


const selected = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)

const todos = ref<Todo[]>([])

const toyin = ref('')


function addTodo() {
  if (!toyin.value) return
  todos.value.push({ id: todos.value.length + 1, item: toyin.value, completed: false })
  toyin.value = ''
  inputRef.value?.focus()
}


const completedTodos = computed(() => {
  return todos.value.filter(todo => todo.completed)
})
</script>

<style scoped></style>
