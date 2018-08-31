<template>
  <div class="edit-blog">
    <h2>编辑博客</h2>
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
      <button v-on:click.prevent="put">编辑博客</button>
    </form>
  </div>
</template>

<script>
    export default {
        name: "edit-blog",
      data(){
        return {
          id:this.$route.params.id,
          blogs: {
            title: '',
            content: '',
            categories: [],
            author: ''
          },
          submmited:false,
          blogCategories: ["HTML","CSS","JS","JQuery","Bootstrap","Vue","React","Angular4"]
        }
      },
      methods:{
        put(){
          this.axios.put("http://localhost:3000/blogs/"+this.id,this.blogs)
            .then((blog)=>{
              this.submmited = true
            }).then((res)=>{
            if(this.submmited){
              let redirect = this.$route.query.redirect
              this.$router.push({
                path:'/'+redirect
              })
              alert("编辑完成")
              // this.$router.push("/blogs")
            }
          })
        },
        fetchData(){
          this.axios.get("http://localhost:3000/blogs/"+this.id)
            .then((res)=>{
              console.log(res.data.categories)
              this.blogs = res.data
            })
        }
      },
      created(){
          this.fetchData()
      }
    }
</script>

<style scoped>

</style>
