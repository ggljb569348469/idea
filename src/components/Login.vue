<template>
  <div class="userlogin" id="login">
            <div style="border-radius: 4px;border: 2px solid #CCC;background-color:white;width: 30%;height: 46%;margin-left: 50px">
            <table align="center">
                   <tr>
                       <td><a href="" @click.prevent="flag=true"  style="text-decoration: none">登录</a></td>
                       <td><a href=""  @click.prevent="flag=false" style="text-decoration: none">注册</a></td>
                   </tr>
               </table>
               <hr>
               <form v-if="flag">
               <h1>登录页面</h1>
                   <table align="center">
                       <tr>
                           <td><p>用户名：</p></td>
                           <td> <input type="text" id="name" v-model.trim="loginData.name" placeholder="请输入账号"></td>
                       </tr>
                       <tr>
                           <td><p>密码：</p></td>
                           <td><input type="password" id="password" v-model.trim="loginData.password" placeholder="请输入密码"></td>
                       </tr>
                       <tr>
                           <td><p>验证码：</p></td>
                           <td><input type="text" id="yzm" placeholder="请输入验证码" v-model.trim="yzm"></td>
                       </tr>
                       <tr>
                           <td><p style="font-size: 10px;color: #747b8b">看不清...</p></td>
                           <td>
                              <input type="button" id="checkCode" @click="createCode" v-model="checkCode"/>
                           </td>
                       </tr>
                   </table>
                   <br>
                   <el-button type="primary"  @click="doLogin">登录</el-button>
                   <el-button type="danger"  @click="reset">重置</el-button>
                   <br>
            <router-link to="/" style="text-decoration: none;color: #1890ff;font-size: 16px">返回首页</router-link>
               </form>
            <form v-else>
               <h1>注册页面</h1>
                   <table align="center">
                       <tr>
                           <td><p>用户名:</p></td>
                           <td><input type="text" class="rname"  v-model.trim="registerData.name" placeholder="请输入用户名">*</td>
                       </tr>
                       <tr>
                           <td><p>密码:</p></td>
                           <td><input type="password" class="rpassword" v-model.trim="registerData.password" placeholder="请输入密码">*</td>
                       </tr>
                       <tr>
                           <td><p>个人描述：</p></td>
                           <td><input type="text" id="context" v-model.trim="registerData.context" placeholder="请输入个人描述">*</td>
                       </tr>
                       <tr>
                           <td><p>联系号码：</p></td>
                           <td> <input type="text" id="phone" v-model.trim="registerData.phone" placeholder="请输入联系号码">*</td>
                       </tr>
                       <tr>
                           <td><p>电子邮箱：</p></td>
                           <td><input type="text" id="email" v-model.trim="registerData.email" placeholder="请输入电子邮箱">*</td>
                       </tr>
                   </table>
                   <el-button type="primary"  @click="register">注册</el-button>
                   <el-button type="danger" @click="reset1">重置</el-button>
               </form>
            </div>
            </div>
</template>

<script>
import utils from "../utils/utils"
export default {
  name: 'login',
  data () {
    return {
      checkCode:"",
      yzm:"",
      flag:true,
      loginData:{
        name:"",
        password:""
      },
      registerData:{
        name:"",
        password:"",
        context:"",
        email:"",
        phone:""
      }
    }
  },
   mounted(){
            this.createCode();
        },
    methods: {
      doLogin(){
           if(this.loginData.name==''){
                        this.$message({
                            type: 'warning',
                            message: '用户名不能为空！'
                        })
                        document.getElementById("name").focus()
                        return false
                    }
                    if(this.loginData.password==''){
                        this.$message({
                            type: 'warning',
                            message: '密码不能为空！'
                        })
                        document.getElementById("password").focus()
                        return false
                    }
                    if(this.yzm==''){
                        this.$message({
                            type: 'warning',
                            message: '验证码不能为空！'
                        })
                        document.getElementById("yzm").focus()
                        return false
                    }
        if(this.loginData.name!=''&&this.loginData.password!=''&&this.yzm.toUpperCase()==this.checkCode){      
        let success=(response)=>{
          if(response.data.code=="0"){
                this.$message({
                            type: 'success',
                            message: '登录成功！'
                        })
                  this.$store.state.username=response.data.obj.name
                  this.$router.push({ path: '/'})
          }
        }
        utils.axiosMethod({
          method:"POST",
          url:'/user/login',
          data:this.loginData,
          callback:success
        })
        }
        else{
              this.$message({
                            type: 'warning',
                            message:'验证码错误，请重新输入！'
                        })
                        document.getElementById("yzm").focus()
                    }
      },

      register(){
           if(this.registerData.name==''){
                        this.$message({
                            type: 'warning',
                            message: '用户名不能为空！'
                        })
                        document.getElementById("rname").focus()
                        return false
                    }
                    if(this.registerData.password==''){
                        this.$message({
                            type: 'warning',
                            message: '密码不能为空！'
                        })
                        document.getElementById("rpassword").focus()
                        return false
                    }
                    if(this.registerData.phone==''){
                        this.$message({
                            type: 'warning',
                            message: '联系号码不能为空！'
                        })
                        document.getElementById("phone").focus()
                        return false
                    }
                    if(this.registerData.email==''){
                        this.$message({
                            type: 'warning',
                            message: '电子邮箱不能为空！'
                        })
                        document.getElementById("email").focus()
                        return false
                    }
        let success=(response)=>{
            if(response.data.code=="0"){
                  this.$message({
                            type: 'success',
                            message: response.data.msg
                        })
                     this.flag=true
            }
            else{
                this.$message({
                            type: 'warning',
                            message: response.data.msg
                        })
            }
        }
        utils.axiosMethod({
          method:"POST",
          url:'/user/register',
          data:this.registerData,
          callback:success
        })
      },
                reset(){
                    this.loginData.name=''
                    this.loginData.password=''
                    this.yzm=''
                },
                reset1(){
                        this.registerData.name='',
                        this.registerData.password='',
                        this.registerData.context='',
                        this.registerData.phone='',
                        this.registerData.email=''
                },
                createCode(){
                    var code = "";
                    var codeLength = 4;//验证码的长度
                    var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',
                        'S','T','U','V','W','X','Y','Z');//随机数
                    for(var i = 0; i < codeLength; i++) {
                        //循环操作
                        var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）
                        code += random[index];//根据索引取得随机数加到code上
                    }
                    this.checkCode = code;//把code值赋给验证码
                }
    }
}
</script>

<style lang="scss" scoped>
.userlogin{
    background-image: url(../static/img/login.jpg);
    background-repeat: no-repeat;
    background-size: 100%;
    width: 100%;
    padding-top: 100px;
    text-align: center;
    height: 1080px;
    font-size: 18px;
    color: #000;
    font-family: verdana, Arial, Helvetica, sans-serif;
}
#checkcode{
    background-color: red;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
}
input{
    border: 1px solid #ccc; 
                padding: 7px 0px;
                border-radius: 3px; 
                padding-left:5px; 
}
</style>