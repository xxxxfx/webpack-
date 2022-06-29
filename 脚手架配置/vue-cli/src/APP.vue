<template>
<div>
  <h1 class="title">hello APP</h1>
  <el-button>按钮</el-button>
  <ul>
    <li>
      <router-link to="/home">Home</router-link>
    </li>
     <li>
      <router-link to="/about">About</router-link>
    </li>
  </ul>
<router-view />
</div>
</template>
<script>
export default {
  name: 'APP'
};
</script>
<style scoped>
.title {
  color: red;
}
</style>