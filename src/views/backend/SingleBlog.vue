<template>
    <div class="single">
      <header-nav></header-nav>
      <section class="blog-content">
        <article>
          <h1>{{blog.title}}</h1>
          <div class="detail-info clearFix">
            <span class="author">作者：<em>{{blog.author}}</em></span>
            <span v-show="isLogin" class="edit" @click="edit">编辑</span>
            <!--<router-link :to="'/edit/'+id" tag="span" v-show="isLogin" class="edit">编辑</router-link>-->
          </div>
          <div class="person-cate">
            <em>{{blog.time}}</em>
            <em>个人分类：</em><span v-for="item in blog.categories">{{item}}</span>
          </div>
          <hr/>
          <p class="copyright">版权声明：未经博主同意，不得转载
            <em v-show="!!userName" class="icon iconfont" :class="{active:isLike}" title="喜欢" @click="like">&#xe6ca;</em></p>
          <div>
            {{blog.content}}
          </div>
        </article>

      </section>
      <section class="attach" id="comment">
        <div class="commit clearFix">
          <div class="commit-btn">
            <img src="../../assets/portrait.png"/>
            <input type="text" placeholder="想对博主说点什么   按Enter键提交" v-model="content" @keydown.enter="commit"/>
          </div>
          <div class="btn" v-show="!userName">评论请先<em @click="commentLogin">登录</em></div>
        </div>
      </section>
      <section class="comment" v-show="!!this.comment.length">
        <h2>评论列表</h2>
        <hr/>
        <div v-for="item in comment" class="comment-list">
          <div class="comment-list-title"><span>{{item.name}}</span><em>{{item.time}}</em></div>
          <div class="comment-list-content">{{item.content}}</div>
        </div>
      </section>
      <div class="comment-aside">
        <ul>
          <li><a href="#comment" v-show="fixShow==1" @mouseout="hide(1)">评论</a><span v-show="fixShow!=1" class="icon iconfont" @mouseover="show(1)">&#xe61a;</span></li>
          <li><a v-show="fixShow==2" @mouseout="hide(2)">手机看</a><span v-show="fixShow!=2" class="icon iconfont" @mouseover="show(2)">&#xe63e;</span></li>
          <li><a v-show="fixShow==3" @mouseout="hide(3)">收藏</a><span v-show="fixShow!=3" class="icon iconfont" @mouseover="show(3)">&#xe60a;</span></li>
        </ul>
      </div>
    </div>
</template>

<script>
  import Header from '@/components/HeadTop'
  import Tween from 'tween.js'
    export default {
        name: "single-blog",
      data(){
          return {
            id: this.$route.params.id,
            blog:{},
            comment:[],
            content:"",
            likeCount:{
              "likeUser":[],
              "count":0,
              mark:0,
              title:""
            },
            fixShow:0
          }
      },
      computed:{
          isLogin(){
            return this.$store.state.isLogin
          },
        userName(){
            return this.$store.state.userName
        },
        commentContent(){
          let content = {
            "mark":this.id,
            "content":"",
            "time":"",
            "name":this.userName
          }
          content.time=this.time()
          content.content = this.content
          return content
        },
        isLike(){
          return this.likeCount.likeUser.indexOf(this.userName)!=-1
        }
      },
      methods:{
        time(){
          let date = new Date()
          let year = date.getFullYear()
          let month = date.getMonth()+1
          let day = date.getDate()
          let str = year+"-"+getTwo(month)+"-"+day
          function getTwo(n){
            return n<10?'0'+n:''+n
          }
          return str
        },
        //提交评论
        commit(){
          this.axios.post("http://localhost:3000/blogcomment",this.commentContent)
            .then((res)=>{
              this.comment.push(this.commentContent)
              this.content = ""
            })
        },
        like(){
          var likeArr = this.likeCount.likeUser
          this.likeCount.mark = this.id
          this.likeCount.title = this.blog.title
          if(this.isLike){
            let index = likeArr.indexOf(this.userName)
            likeArr.splice(index,1)
            this.likeCount.count--
            this.axios.put("http://localhost:3000/like/"+this.likeCount.id,this.likeCount)
          }else{
            console.log(!this.likeCount.id)
            likeArr.push(this.userName)
            this.likeCount.count++
           if(!this.likeCount.id){
             this.axios.post("http://localhost:3000/like",this.likeCount).then((res)=>{
               this.likeData()
             })
           }else{
             this.axios.put("http://localhost:3000/like/"+this.likeCount.id,this.likeCount)
           }
          }

        },
        likeData(){
          this.axios.get("http://localhost:3000/like?mark="+this.id)
            .then((res)=>{
              console.log(res.data[0])
              if(res.data.length!=0){
                this.likeCount = res.data[0]
              }

            })
        },
        //  固定区域
        show(num){
          this.fixShow = num
        },
        hide(num){
          this.fixShow = 0
        },
        commentLogin(){
          this.$router.push({
            path:"/login",
            query:{
              redirect:this.$route.path.slice(1)
            }
          })
        },
        edit(){
         this.$router.push({
            path:`/edit/${this.id}`,
            query:{
              redirect:this.$route.path.slice(1)
            }
          })
        //   console.log(this.$router)
        //   console.log(this.$route)
        }

      },
      created(){
          this.axios.get("http://localhost:3000/blogs/"+this.id)
            .then((item)=>{
              this.blog = item.data
            })
        this.axios.get("http://localhost:3000/blogcomment?mark="+this.id)
          .then((res)=>{
            this.comment = res.data
          })
        this.likeData()
      },
      components:{
        headerNav:Header
      },
      beforeRouteUpdate(to,from,next){
          next()
      }
    }
</script>

<style scoped>

</style>
