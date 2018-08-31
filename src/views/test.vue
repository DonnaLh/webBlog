<template>
  <div class="box">

    <ul>
      <li v-for="item in showList">{{item}}</li>
    </ul>
    <pagination :total="newList.length" :prepage="prepage" :show-page="4"  v-model="sPage"></pagination>
  </div>

</template>

<script>
  import Pagination from './Pagination'
    export default {
        name: "test",
      components:{
        pagination:Pagination
      },
      data(){
       return {
         newList:[
           ...`当你老了，`
         ],
         sPage:1,
         prepage:4
       }
      },
      computed:{
        showList(){
          let start = (this.sPage-1)*this.prepage
          let end = start+this.prepage
          // if(start<0){
          //     start = 0
          // }
          start = Math.max(0,start);
          end = Math.min(end,this.newList.length)
          return this.newList.slice(start,end)
        }
      }

    }
</script>

<style scoped>
  .box {
    margin: 100px auto 0;
    width: 80%;
  }

</style>
