<template>
  <div id="app">
    <!-- index
    <el-button type="danger">危险按钮</el-button>
    <el-alert
      title="成功提示的文案"
      type="success">
    </el-alert> -->

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',

  mounted(){
    
  },
  
}
</script>

<style>

*{
  margin:0;
  padding:0;
}

</style>
