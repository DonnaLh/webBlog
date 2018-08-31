<template>
<div class="clearFix el-menu-dark">
  <ul class="nav">
    <router-link to="/" tag="li" exact class="el-menu logo">
      <img src="../assets/miaov.png"/>
    </router-link>
    <router-link to="/blogs" tag="li" exact class="el-menu">
      博客总览
    </router-link>
    <router-link to="/addblog" tag="li" exact class="el-menu">
      写博客
    </router-link>
    <router-link to="/manage" tag="li" exact class="el-menu">
      博客管理
    </router-link>
    <router-link to="/messages" tag="li" exact class="el-menu">
      论坛
    </router-link>
  </ul>
  <div class="user-info-box" v-show="isLogin"  @mouseover="showLogout" @mouseout="hideLogout">
    <div class="el-submenu__title">
      <img src="../assets/portrait.png">
      <span>{{userName}}</span>
    </div>
    <div class="header-menu" v-show="isLogout" @click="logout">
      <ul class="menu-nav">
        <li class="el-menu-item">登出</li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
    export default {
        name: "head-top",
      data(){
          return {
            isLogout:false
          }
      },
      computed:{
          isLogin(){
            return this.$store.state.isLogin
          },
        userName(){
            return this.$store.state.userName
        }
      },
      methods:{
          showLogout(){
            this.isLogout = true
          },
        hideLogout(){
            this.isLogout = false
        },
        logout(){
            this.$store.commit("confirmLogout")
          if(this.$route.meta.login){
            this.$router.push("/login")
          }

        }
      },
      created(){

      }
    }
</script>

<style scoped>

</style>
