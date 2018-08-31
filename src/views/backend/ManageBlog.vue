<template>
  <div class="blogs blog-manage">
    <header><h2>博客管理</h2></header>
    <section class="blog-content">
      <div class="categries">
        <h2>博客分类</h2>
        <ul>
          <li v-for="cate in blogCategories" @click="filterBlogs(cate)" :class="{active:cate==blogCate}"><span>{{cate}}</span><em>{{count(cate)}}条</em></li>
        </ul>
        <div class="clock">
          <img v-for="i in src" :src="i"/>
        </div>
      </div>
      <article>
        <div v-show="!len" class="none">{{blogCate}}中还没有数据哦！等着您添加哦^o^</div>
        <div class="single-blog" v-for="blog in filteredBlogs"  v-show="len">
          <router-link :to="'/single/'+blog.id"><h2 v-rainbow>{{blog.title}}</h2></router-link>
          <p>{{blog.content | snippet}}</p>
          <div class="manaEdit">
            <router-link tag="em" :to="'/edit/'+blog.id">编辑</router-link>
            <em>|</em>
            <em @click="delBlog(blog.id)">删除</em>
          </div>
        </div>
      </article>


    </section>

  </div>
</template>

<script>
  export default {
    name: "manage-blog",
    data(){
      return {
        blogs:[],
        blogCategories: ["全部","HTML","CSS","JS","JQuery","Bootstrap","Vue","React","Angular4"],
        blogCate:'全部',
        len:0,
        timer:null,
        time:"",
        pic:[
          "../../static/imgs/0.JPG",
          "../../static/imgs/1.JPG",
          "../../static/imgs/2.JPG",
          "../../static/imgs/3.JPG",
          "../../static/imgs/4.JPG",
          "../../static/imgs/5.JPG",
          "../../static/imgs/6.JPG",
          "../../static/imgs/7.JPG",
          "../../static/imgs/8.JPG",
          "../../static/imgs/9.JPG",
          "../../static/imgs/colon.JPG"
        ],
        src:[]
      }
    },
    computed:{
      filteredBlogs(){
        let filter = this.blogs
        if(this.blogCate!='全部'){
          filter  = this.blogs.filter((item)=>{
            return item.categories.includes(this.blogCate)
          })
        }
        this.len = filter.length
        return filter
      }
    },
    watch:{

    },
    methods:{
      filterBlogs(cate){
        this.blogCate = cate;
      },
    count(cate){
      let count= 0
      this.blogs.forEach((item)=>{
        let a = item.categories.find((i)=>{
          return i==cate
        })
        if(a){
          count++
        }
      })
      if(cate=="全部"){
        count = this.blogs.length
      }
      return count
    },
      delBlog(id){
        // console.log(id)
       let delItem = this.blogs.find(item=>{
          return item.id == id
        })
        let index = this.blogs.indexOf(delItem);
       this.blogs.splice(index,1)
        this.axios.delete("http://localhost:3000/blogs/"+id)
          .then((res)=>{
            this.$router.push({path:"/manage"})
            console.log(this.blogs.length)
          })
      },
      fnTime(){
        let date = new Date()
        let iHours = date.getHours()
        let iMin = date.getMinutes()
        let iSec = date.getSeconds()
        let str = getTwo(iHours)+":"+getTwo(iMin)+":"+getTwo(iSec)
        this.time = str
        function getTwo(n){
          return n<10?'0'+n:''+n
        }
        this.src = []
        for(var i=0;i<str.length;i++){
          let n = str.charAt(i)
          if(n==":"){
            n=10
          }
          this.src.push(this.pic[n])
        }
      },
      setTimer(){
        clearInterval(this.timer)
        this.timer = setInterval(this.fnTime,1000)
      }
    },
    directives:{
      rainbow:{
        bind(el,binding,vnode){
          el.style.color = '#'+Math.random().toString(16).slice(2,8);
        }
      }
    },
    filters:{
      snippet(value){
        return value.slice(0,100)+"...";
      }
    },
    created(){
      this.setTimer()
      this.axios.get("http://localhost:3000/blogs")
        .then((res)=>{
          this.blogs = res.data
          // this.len = res.data.length
          // console.log(this.blogs)
        })

    }
  }
</script>

<style scoped>

</style>
