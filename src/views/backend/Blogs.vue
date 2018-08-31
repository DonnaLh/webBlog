<template>
<div class="blogs">
  <header><h2>博客总览</h2></header>
  <section class="blog-content">
    <article>
      <input type="text" placeholder="搜索" v-model="search" @input="serchContent"/>
      <div class="single-blog" v-for="blog in showList">
        <router-link :to="'/single/'+blog.id"><h2 v-rainbow>{{blog.title}}</h2></router-link>
        <p>{{blog.content | snippet}}</p>
      </div>
      <pagination :total="filteredBlogs.length" :display="display" :current-page='current' @pagechange="pagechange"></pagination>
    </article>
    <Aside :len="len"></Aside>
  </section>

</div>
</template>

<script>
  import Aside from './AsideAd'
  import Pagination from '../Pagination'
    export default {
        name: "blogs",
      data(){
          return {
            blogs:[],
            search:"",
            len:0,
            display:4,
            current:1,
            isSearch:false
          }
      },
      computed:{
          filteredBlogs(){
              return this.blogs.filter((blog)=>{
                return blog.title.includes(this.search)
              })
          },
        showList(){
          let start = (this.current - 1)*this.display
          let end = start + this.current*this.display
            return this.blogs.filter((blog)=>{
              return blog.title.includes(this.search)
            }).slice(start,end)

        }
      },
      methods:{
        pagechange(currentPage){
       this.current = currentPage
         // this.filteredBlogs.slice(start,end)
      },
        serchContent(){
          if(this.search!=''){
            this.isSearch = true
          }else{
            this.isSearch = false
          }
        }
      },
      directives:{
          rainbow:{
            bind(el,binding,vnode){
               // el.style.color = '#'+Math.random().toString(16).slice(2,8);
            }
          }
      },
      filters:{
        snippet(value){
          return value.slice(0,100)+"...";
        }
      },
      created(){

          this.axios.get("http://localhost:3000/blogs")
            .then((res)=>{
              console.log(res.data)
              this.blogs = res.data
              this.len = res.data.length
              // console.log(this.blogs)
            })

      },
      components:{
          Aside:Aside,
        pagination: Pagination
      }
    }
</script>

<style scoped>

</style>
