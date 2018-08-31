<template>
  <div class="main">
    <div class="home-header">
      <img src="../assets/miaov.png" alt="">
      <div class="portrait">
        <router-link to="/login" tag="span" v-show="!isLogin">登录</router-link>
        <img  src="../assets/portrait.png" alt="" v-show="isLogin">
      </div>

    </div>
    <div class="phrase">
      前端博站
    </div>
    <div class="btns">
      <router-link to="/blogs" tag="div" class="trans">博客总览</router-link>
      <router-link to="/addblog" tag="div" class=" trans">写博客</router-link>
    </div>
  </div>
</template>

<script>
    export default {
        name: "home",
      data(){
          return {
            // isLogin: false
          }
      },
      computed:{
          isLogin(){
            return this.$store.state.isLogin
          }
      }
    }
</script>

<style scoped>

</style>
