<template>
  <div>
    <headerNav></headerNav>
    <div class="breadcrumb">
      <router-link to="/" exact>首页</router-link>|
      <span>{{flag}}</span>
    </div>
    <transition :name="names">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import Header from '@/components/HeadTop'
  let flags = {
    blogs: '博客总览',
    addblog: '写博客',
    manage: '博客管理',
    messages: '论坛',
    edit:"编辑博客"
  }
    export default {
        name: "layout",
      data(){
          return {
            flag:'',
            names:"left"
          }
      },
      watch:{
          $route(to,from){
            this.flag = flags[this.$route.path.slice(1)]
            if(to.meta.index<from.meta.index){
              this.names = "right"
            }else{
              this.names = "left"
            }
          }
      },
      created(){
          this.flag = flags[window.location.pathname.slice(1)]
      },
      beforeRouterEnter(to,from,next){
          next((vm)=>{
            vm.flag = flags[to.path.slice(1)]
          })
      },
      components:{
        headerNav:Header
      }
    }
</script>

<style scoped>
  .left-enter{
    transform:translateX(100%);
  }
  .left-enter-active{
    transition:1.5s;
  }
  .left-leave-to{
    transform:translateX(-100%);
  }
  .left-leave-active{
    transition:0.5s;
  }

  .right-enter{
    transform:translateX(-100%);
  }
  .right-enter-active{
    transition:1.5s;
  }
  .right-leave-to{
    transform:translateX(100%);
  }
  .right-leave-active{
    transition:0.5s;
  }
</style>
