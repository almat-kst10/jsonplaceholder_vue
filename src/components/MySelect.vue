<template>
    <div class="form-floating mb-2">
        <select @change="selectItem" class="form-select" id="floatingSelect" aria-label="Floating label select example">
            <option v-for="select in sortArray" :value="select.value" :key="select.id">{{select.text}}</option> <!--v-for="select in selectedArray" :value="select.value"  :key="id"-->
        </select>
        <label for="floatingSelect">Сортировка</label>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch, reactive } from 'vue'
import { RouterView } from 'vue-router'

const props = defineProps({
  sortArray: Object
})

const select = ref<string>('')

const emit = defineEmits(['submit'])

const selectItem = (value: any) => {
    emit('submit', value.target.value)
}

// const getProperty = (obj: unknown) => {
//   if (typeof obj === 'object' && obj !== null) {
//     if (key in obj) {
//       return (obj as Record<string, unknown>)[key];
//     }
//   }
//   return undefined;
// }

</script>

<style scoped></style>