<template>
<div class="comment">
  <div class="list">
    <div class="item clearFix">

      <div v-for="item in msg" :class="{sub:item.sub}" class="item" :id="item.id" v-show="(item.mark==spd)||item.topClass==1">
        <hr v-if="!item.sub"/>
        <!--head-->
        <div class="head">
          <span title="leo" v-if="item.topClass==1">楼主:</span>
          <span title="leo" v-if="item.topClass==2">{{item.author}}</span>
        </div>
        <!--内容-->
        <div class="cont">
          <div class="info">
            <span class="name" v-if="item.topClass==1">{{item.author}}</span>
            <span class="name" v-if="item.topClass==2">回复：@{{item.toAuthor}}</span>
            <span class="cag">[Vue]</span>
          </div>
          <div class="txt">{{item.content}}</div>
          <div class="action">
            <span class="time">{{time(item.time)}}<em v-show="time(item.time).length<=2">分钟前</em></span>
            <span class="btns">
            <a class="vote icon iconfont" v-show="!!userName" :title="item.voteUser.indexOf(userName)==-1?'点赞':'已点赞'" href="javascript:;"
               @click="vote(item)"
               :class="{active:!(item.voteUser.indexOf(userName)==-1)}"
            >&#xe668;</a>
              <em class="vot">{{item.voteCount}}</em>

            <a class="reply icon iconfont" title="回复" href="javascript:;" @click="reply(item)" :class="{active:showReply==item.id}">&#xe61a;</a>
              <span v-show="!item.sub&&!!item.mark" class="fold">
                <em v-show="shk==item.mark||(shk!=item.mark&&spd!=item.mark)" @click="spread(item.mark)">展开</em>
                <em v-show="spd==item.mark" @click="shrink(item.mark)">收缩</em>
              </span>
          </span>
          </div>
        </div>
        <!--回复-->
        <div class="reply-form-wrap" v-show="showReply==item.id">
          <div class="reply-form-top">
            <em>◆</em>
            <span>◆</span>
          </div>
          <div class="reply-form comment-form">
            <div class="hd"></div>
            <div class="bd">
              <div class="editor">
                <div class="inner">
                  <textarea class="box" :placeholder="'回复'+item.author" v-model="releaseContent"></textarea>
                  <div class="autogrow-textarea-clone"></div>
                </div>
                <span class="arrow"></span>
              </div>
              <div class="user"></div>
              <div class="user user-default">
                <div class="form-head"><a title="donna">{{userName}}</a></div>
              </div>
            </div>
            <div class="ft clearFix">
              <a  href="javascript:;"  class="btn" @click="release(item)">发布</a>
              <div class="login">
                <a v-show="!userName" class="login-lnk" href="javascript:;" title="登录" @click="bbsLogin">登录</a><em v-show="!userName">|</em>
                <a v-show="!userName"  class="register-lnk">注册</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="release">
    <div class="relTitle">有什么想聊的，不如发出来，大家热聊一下！</div>
    <textarea :class="{focus:inputing}" placeholder="发您想发，聊您想聊(最多输入200字哦！)" v-model="talkContent" @focus="inputContent"></textarea>
    <div class="relFoo clearFix"><span class="relBtn">还能输入<em :class="{disabled:inputNum==0}">{{inputNum}}</em>字<button @click="talkRelease">发布</button></span></div>
  </div>

</div>
</template>

<script>
    export default {
        name: "leave-message",
      data(){
        return {
          msg:[],
          releaseContent:"",
          talkContent:"",
          "showReply":-1,
          inputing:false,
          timer:null,
          spd:-1,
          shk:-1
        }
      },
      computed:{
        userName(){
          return this.$store.state.userName
        },
        inputNum(){
          let num = 200 - Number(this.talkContent.length)
          if(num<=0)num=0
          return num
        }
      },
      methods:{
          setInt(){
            clearInterval(this.timer)
            this.timer = setInterval(this.time,1000)
          },
          time(time){
            let nowTime = new Date()
            let lastTime = new Date(time)
            let t = Math.floor((nowTime - lastTime)/1000)
            let Day = Math.floor(t/86400)
            let Hour = Math.floor(t%86400/3600)
            let Min = Math.floor(t%86400%3600/60)
            let str = ''
            if(Day<1&&Hour<1){
              str = String(Min)
            }else{
              let year = lastTime.getFullYear()
              let month = lastTime.getMonth()+1
              let day = lastTime.getDate()
               str = year+"年"+getTwo(month)+"月"+day+"日"
            }
            function getTwo(n){
              return n<10?'0'+n:''+n
            }
            return str
          },
        //点赞
        vote(item){

          // console.log(this.userName)

            if(item.voteUser.indexOf(this.userName)==-1){
              item.voteUser.push(this.userName)
              item.voteCount++
              this.axios.put("http://localhost:3000/interlocution/"+item.id,item)
              this.voted = -1
            }
        },
        //回复显示隐藏
        reply(item){

          if(this.showReply==item.id){
            this.showReply = -1
          }else{
            this.showReply = item.id

          }
        },
        //回复发布
        releaseCount(item){
          let releaseData = {
            "author": "",
            "toAuthor": "",
            "voteCount": 0,
            "content": "",
            "sub": true,
            "topClass":2,
            voteUser:[]
          }
          releaseData.author = this.userName
          releaseData.topClass = 2
          releaseData.toAuthor = item.author
          releaseData.content = this.releaseContent
          releaseData.time = new Date()
          if(item.mark==0){
            releaseData.mark = item.id
            item.mark = item.id
            this.axios.put("http://localhost:3000/interlocution/"+item.id,item)
          }else{
            releaseData.mark = item.mark
          }
          return releaseData
        },
        release(item){
          console.log(item)
          let index = this.msg.indexOf(item)+1
      this.msg.splice(index,0,this.releaseCount(item))
          this.axios.post("http://localhost:3000/interlocution",this.releaseCount(item))
            .then(()=>{
             this.releaseContent = ""
              // this.axiosFn()
              this.spd = item.mark
            })

        },
      //  子级展开和收缩功能实现
        spread(mark){
            this.spd = mark
          this.shk = -1
        },
        shrink(mark){
            this.shk = mark
          this.spd = -1
        },
      //  发布
        inputContent(){
          this.inputing = true
          if(this.talkContent.length>=200){

          }
        },
        talkRelease(){
          let talkData = {
            "author": "",
            "voteCount": 0,
            "content": "",
            "topClass":1,
            voteUser:[],
            mark:0
          }
          talkData.author = this.userName
          talkData.time = new Date()
          talkData.content = this.talkContent

          this.inputing = true
          this.axios.post("http://localhost:3000/interlocution",talkData)
            .then((res)=>{
              this.inputing = false
              this.talkContent = ""
              // this.msg.push(talkData)
              this.axiosFn()
            })
        },
        axiosFn(){
          this.axios.get("http://localhost:3000/interlocution?_sort=mark&_order=asc")
            .then((res)=>{
              this.msg = res.data
            })
        },
      //  登录
        bbsLogin(){
          this.$router.push({
            path:"/login",
            query:{
              redirect:this.$route.path.slice(1)
            }
          })
        }
      },
      created(){
        this.axiosFn()
      }
    }
</script>

<style scoped>

</style>
