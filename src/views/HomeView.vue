<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <JsView></JsView>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import JsView from './jsView.vue'

export default defineComponent({
  name: "HomeView",
  components: {
    HelloWorld,
    JsView
  },
  methods: {
    
  }
});
</script>
