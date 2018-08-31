<template>
  <div class="wrap">
    <div class="wrap-login">
      <div class="top-login">
        <router-link to="/"><img src="../assets/imgs/logo.png" width="99" height="34"/></router-link>
        <img src="../assets/imgs/login_top.png" width="650" height="153"/>
      </div>
      <!-- 登录 -->
      <div class="register">
        <form action="" method="post" id="" autocomplete="off">
          <div class="regis-tab">
            <div class="m12px regis-title">
              用户登录
            </div>
            <div>
              <input class="txt" type="text" placeholder="请输入姓名" v-model="loginData.name" @blur="nameBlur" @focus="nameInput"/>
              <span class="errtip" v-show="empty.nameErr">
                            <i class="icon iconfont">&#xe61b;</i>
                            请输入姓名！
                        </span>
            </div>

            <div>
              <input class="txt" type="password" placeholder="请输入密码" v-model="loginData.password" @blur="passwordBlur" @focus="passwordInput"/>
              <span class="errtip" v-show="empty.passwordErr">
                            <i class="icon iconfont">&#xe61b;</i>
                            请输入密码哦！
                        </span>
            </div>
            <div>
              <input class="txt img-mo" type="text" placeholder="图形验证码" @blur="picBlur" v-model="loginData.pic" @focus="picInput"/>
              <img class="codeImg" src="../assets/imgs/valid.jpg"/><br/>
              <span class="errtip" v-show="empty.picErr">
                            <i class="icon iconfont">&#xe61b;</i>
                            请输入图形验证码！
                        </span>
            </div>
            <div class="forget">
              <a href="#">忘记密码</a>
              <p @click="remeber"><i id="rem_me" class="l-icon remeber-icon" :class="{active:isRember}"></i>记住我 </p>
            </div>

            <div class="btn">
              <input type="button" value="登录" @click="getLogin"/>
            </div>
            <router-link to="/resign" class="on-stu">没有账号？&nbsp; 立即注册</router-link>
          </div>
        </form>
      </div>

    </div>
  </div>

</template>

<script>
    export default {
        name: "login",
      data(){
          return {
            loginData:{
              name: '',
              password: '',
              emial: '',
              pic:""
            },
            empty:{
              nameErr:false,
              passwordErr:false,
              picErr:false
            },
            isRember:false
          }
      },
      computed:{
        isLogin(){
            return this.$store.state.isLogin
          }
      },
      methods:{
        remeber(){
          this.isRember = !this.isRember
        },
          nameBlur(){
            if(this.loginData.name==''){
              this.empty.nameErr = true
            }else{
              this.empty.nameErr = false
            }
          },
        passwordBlur(){
          if(this.loginData.password==''){
            this.empty.passwordErr = true
          }else{
            this.empty.passwordErr = false
          }
        },
        picBlur(){
          if(this.loginData.pic==''){
            this.empty.picErr = true
          }else{
            this.empty.picErr = false
          }
        },
        nameInput(){
          this.empty.nameErr = false
        },
        passwordInput(){
          this.empty.passwordErr = false
        },
        picInput(){
          this.empty.picErr = false
        },
        getLogin(){
          this.axios.get("http://localhost:3000/users")
            .then((res)=>{
            var d = res.data.find((item)=>{
               return item.name == this.loginData.name
              })
              if(d&&d.password==this.loginData.password){
               this.$store.commit("judjeLogin")
               this.$store.commit("noteName",d)

                //拿到路径中的查询字符串的值
                let redirect = this.$route.query.redirect
                if(!redirect){
                 redirect = 'blogs'
                }
                this.$router.push({
                  path:'/'+redirect
                })
                alert("登录成功")
              }else{
              alert("账号或密码错误，请重新输入！")
              }
            })
        }
      }
    }
</script>

<style scoped>

</style>
