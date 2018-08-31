<template>
  <aside class="aside-ad">
    <h2>博客信息</h2>
    <hr/>
    <div class="profile" v-show="isLogin">
      <img src="../../assets/portrait.png" alt="头像"/>
      <span>{{userName}}</span>
    </div>

    <div class="intro clearFix">
      <ul class="blog-count">
        <li><span>博客</span><em  :title="len">{{len}}</em></li>
        <li><span>粉丝</span><em  :title="30">30</em></li>
        <li><span>喜欢</span><em :title="likeCount">{{likeCount}}</em></li>
        <li><span>评论</span><em :title="commentLen">{{commentLen}}</em></li>
      </ul>
    </div>
    <hr/>

    <div class="pic">
      <ul class="ad">
        <li v-for="(item,i) in picArr"  :style="{opacity:i==mark?1:0}" :key="i"><img :src="item"/></li>
      </ul>
      <div class="preview">
        <div class="preview-inner"  :style="{left:left}">
          <span
            v-for="(item,i) in picArr" :key="i"
            @mouseover="change(i)"
            @mouseout="setTimer(i)"
            :class="{active:i==mark}"
          ><img :src="item"/></span>
        </div>
      </div>
    </div>
    <div class="good">
      <h2>优质文章</h2>
      <hr/>
      <ul class="like" v-show="!!hotEassy.length">
        <li v-for="item in hotEassy"><p>{{item.title}}</p><em>喜欢：{{item.count}}</em></li>
      </ul>
      <div class="null" v-show="!hotEassy.length"></div>
    </div>
  </aside>
</template>

<script>
    export default {
        name: "aside-ad",
      props:['len'],
      data(){
          return {
            picArr:[
              require("../../assets/imgs/ad_1.jpg"),
              require("../../assets/imgs/ad_2.jpg"),
              require("../../assets/imgs/ad_3.jpg"),
              require("../../assets/imgs/ad_4.jpg"),
              require("../../assets/imgs/ad_5.jpg")
            ],
            dataPic:[],
            mark:0,
            timer:null,
            commentLen:0,
            likeCount:0,
            left:0,
            hotEassy:[]
          }
      },
      methods:{
          play(){
            this.mark++
            if(this.mark>=this.picArr.length){
              this.mark = 0
            }
            this.changeLeft()

          },
        autoPlay(){
            this.clearTimer()
         this.timer =  setInterval(this.play,2000)
        },
        clearTimer(){
            clearInterval(this.timer)
        },
        changeLeft(){
            let len = this.picArr.length - 1
          if(this.mark==0){
            this.left = 0
          }else if(this.mark>=4){
            this.left =-(this.mark-4)*66 -54+'px'
          }
        },
        change(i){
          this.clearTimer()
            this.mark = i
          this.changeLeft()
        },
        setTimer(){
            this.autoPlay()
        }
      },
      computed:{
          userName(){
            return this.$store.state.userName
          },
        isLogin(){
            return this.$store.state.isLogin
        }
      },
      created(){
          this.autoPlay()
        this.axios.get("http://localhost:3000/blogcomment")
          .then((res)=>{
            this.commentLen = res.data.length


          })
        this.axios.get("http://localhost:3000/like")
          .then((res)=>{
            let count = 0
            let hotEssay = []
            res.data.forEach((item)=>{
              count+=item.count
              if(item.count>=1){
                let hot = {
                  title:item.title,
                  count :item.count
                }
                hotEssay.push(hot)
              }
            })
            this.likeCount = count
            this.hotEassy = hotEssay
          })
      }
    }
</script>

<style scoped>

</style>
