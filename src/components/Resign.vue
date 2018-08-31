<template>
  <div class="wrap">
    <div class="wrap-login">
      <div class="top-login">
        <router-link to="/"><img src="../assets/imgs/logo.png" width="99" height="34"/></router-link>
        <img src="../assets/imgs/login_top.png" width="650" height="153"/>
      </div>
      <!-- 注册 -->
      <div class="register">
        <form action="" method="post" id="" autocomplete="off">
          <div class="regis-tab">
            <div class="m12px regis-title">
              用户注册
            </div>
            <div>
              <input class="txt" type="text" placeholder="请输入姓名" v-model="resignData.name" @blur="nameValid" @focus="nameInput"/>
              <span class="errtip" v-show="emptyError.nameError">
                            <i class="icon iconfont">&#xe668;</i>
                            请输入姓名！
                        </span>
            </div>

            <div>
              <input class="txt" type="password" placeholder="请设置6-12位密码" v-model="resignData.password" @blur="passwordValid" @focus="passwordInput"/>
              <span class="errtip" v-show="emptyError.passwordError">
                            <i class="icon iconfont">&#xe668;</i>
                            请设置密码哦！
                        </span>
              <span class="errtip" v-show="formatError.passwordError">
                            <i class="icon iconfont">&#xe668;</i>
                            密码位数6-12哦！
                        </span>
            </div>

            <div>
              <input class="txt" type="password" placeholder="请输入确认密码" v-model="confirmPassword" @blur="confirmValid" @focus="confirmInput"/>
              <span class="errtip" v-show="emptyError.confirmError">
                            <i class="icon iconfont">&#xe668;</i>
                            请输入确认密码！
                        </span>
              <span class="errtip" v-show="formatError.confirmError">
                            <i class="icon iconfont">&#xe668;</i>
                            确认密码有误！
                        </span>
            </div>
            <div>
              <input class="txt" name="userEmail" type="emial" placeholder="请输入邮箱" v-model="resignData.emial" @blur="emailValid" @focus="emailInput"/>
              <span class="errtip" v-show="emptyError.emailError">
                            <i class="icon iconfont">&#xe668;</i>
                            请输入邮箱！
                        </span>
              <span class="errtip" v-show="formatError.emailError">
                            <i class="icon iconfont">&#xe668;</i>
                            请输入正确格式的邮箱！
                        </span>
            </div>

            <div class="btn">
              <input type="button" value="注册" @click="resign"/>
            </div>
            <router-link to="/login" class="on-stu">已有账号？&nbsp; 立即登录</router-link>
          </div>
        </form>
      </div>

    </div>
  </div>
</template>

<script>
    export default {
        name: "resign",
      data(){
         return {
           resignData:{
             name: '',
             password: '',
             emial: ''
           },
           confirmPassword:'',
           emptyError:{
             nameError:false,
             passwordError:false,
             confirmError:false,
             emailError:false
           },
           formatError:{
             passwordError:false,
             confirmError:false,
             emailError:false
           },
           isResign:{
             nameRight:false,
             passwordRight:false,
             confirmRight:false,
             emailRight:false
           }
         }
      },
      methods: {
          nameValid(){
            if( this.resignData.name == ''){
              this.emptyError.nameError = true
              this.isResign.nameRight = false
            }else{
              this.emptyError.nameError = false
              this.isResign.nameRight = true
            }
          },
        passwordValid(){
          //  验证是否为空
          if( this.resignData.password == ''){
            this.emptyError.passwordError = true
          }else{
            this.emptyError.passwordError = false
          }
          //验证密码位数是否正确
          if( (this.resignData.password.length<6||this.resignData.password.length>12)&&this.resignData.password != ''){
            this.formatError.passwordError = true
            this.isResign.passwordRight = false
          }else{
            this.formatError.passwordError = false
            this.isResign.passwordRight = true
          }

        },
        confirmValid(){
          //  验证是否输入确认密码
          if( this.confirmPassword==''){
            this.emptyError.confirmError = true
          }else{
            this.emptyError.confirmError = false
          }
          //验证确认密码是否有误
          if( this.confirmPassword != this.resignData.password&&this.confirmPassword!=''){
            this.formatError.confirmError = true
            this.isResign.confirmRight = false
          }else{
            this.formatError.confirmError = false
            this.isResign.confirmRight = true
          }
        },
        emailValid(){
          //  验证是否输入邮箱
          if( this.resignData.emial == ''){
            this.emptyError.emailError = true
          }else{
            this.emptyError.emailError = false
          }
        //  验证邮箱格式是否正确
          if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.resignData.emial)&&this.resignData.emial!=''){
            this.formatError.emailError = true
            this.isResign.emailRight = false
          }else{
            this.formatError.emailError = false
            this.isResign.emailRight = true
          }

            },
        nameInput(){
            this.emptyError.nameError = false
        },
        passwordInput(){
          this.emptyError.passwordError = false
          this.formatError.passwordError = false
        },
        confirmInput(){
          this.emptyError.confirmError = false
          this.formatError.confirmError = false
        },
        emailInput(){
          this.emptyError.emailError = false
          this.formatError.emailError = false
        },
        resign(){
            if(this.isResign.emailRight&&this.isResign.confirmRight&&this.isResign.passwordRight&&this.isResign.nameRight){
              this.axios.post("http://localhost:3000/users",this.resignData).then((res)=>{
                this.$router.push({path:"/login"})
              })
            }else{
              alert("注册出错，请重新注册！")
            }



        }
      }
    }
</script>

<style scoped>

</style>
