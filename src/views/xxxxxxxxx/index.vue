<template>
    <div>
        <div class="file-preview">
    <input type="file" @change="previewFile" />
    
    <div v-if="fileContent">
      <VueOffice :content="fileContent" />
    </div>
  </div>
    </div>
  </template>
  


<script setup>
import { ref, reactive } from 'vue';
import VueOffice from 'vue-office';
const fileContent = ref(null);

const previewFile = (event) => {
    const file = event.target.files[0];
    if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        fileContent.value = e.target.result;
    };
    reader.readAsArrayBuffer(file);
    }
};

</script>

<style scoped>
   .file-preview {
  margin: 20px;
}
</style>