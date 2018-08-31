<template>
<div class="add-blog">
  <h2>写博客</h2>
  <form>
    <label>博客标题</label>
    <input type="text" required v-model="blogs.title"/>
    <label>博客内容</label>
    <textarea v-model="blogs.content"></textarea>
    <div class="checkboxes">
      <span v-for="categories in blogCategories">
        <label>{{categories}}</label>
       <input type="checkbox" :value="categories" v-model="blogs.categories"/>
      </span>
    </div>
    <label>作者</label>
    <input type="text" v-model="blogs.author"/>
    <button v-on:click.prevent="post" class="add">添加博客</button>
  </form>
</div>
</template>

<script>
    export default {
        name:  "add-blog",
      data(){
          return {
            blogs: {
              title: '',
              content: '',
              categories: [],
              author: '',
              time:''
            },
            blogCategories: ["HTML","CSS","JS","JQuery","bootstrap","Vue","React","Angular4"],
            submmited: false
          }
      },
      methods:{
          post(){
            let date = new Date()
           let year = date.getFullYear()
           let month = date.getMonth()+1
           let day = date.getDate()
            let str = year+"年"+getTwo(month)+"月"+day+"日"
            this.blogs.time = str
            function getTwo(n){
              return n<10?'0'+n:''+n
            }


            this.axios.post("http://localhost:3000/blogs",this.blogs)
              .then((blog)=>{
                this.submmited = true
              }).then((res)=>{
                if(this.submmited){
                  alert("添加成功")
                  this.$router.push("/blogs")
                }
            })
          }
      }
    }
</script>

<style scoped>

</style>
