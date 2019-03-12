<template>
         <div class="adminlogin"> 
            <div style="border-radius: 4px;border: 2px solid #CCC;background-color:white;width:20%;height: 35%;margin-left: 50px;padding-left:75px">
            <el-form ref="form" :model="form"> 
              <el-form-item> 
            <label style="font-size:20px;">管理员登录</label>
              </el-form-item> 
              <el-form-item label="账号："> 
                  <el-col :span="12">
                <el-input v-model="form.name" placeholder="请输入管理员账号"></el-input> 
                  </el-col>
              </el-form-item> 
              <el-form-item label="密码："> 
                <el-col :span="12">
                <el-input type=password v-model="form.password" placeholder="请输入管理员密码"></el-input> 
                </el-col>
              </el-form-item> 
            <el-form-item> 
                <el-button type="primary" @click="adminlogin">登录</el-button> 
                <el-button @click="reset">重置</el-button> 
              </el-form-item>
            </el-form>
            <router-link to="/" style="text-decoration: none;color: #1890ff;font-size: 16px">返回首页</router-link>
            </div>
            </div>
</template>

<script>
export default {
    data:function(){
            return{
                form:{
                    name:'',
                    password:''
                }
            }
        },
        methods:{
            adminlogin(){
                if(this.form.name!=''&&this.form.password!='') {
                    this.$http.get('/admin/adminlogin?name=' + this.form.name + '&password=' + this.form.password).then(function (result) {
                        var a = JSON.parse(result.bodyText);
                        if (a.code =="1"){
                            this.$message({
                            type: 'warning',
                            message: ''+a.msg
                        })
                        }
                        else{
                            this.$message({
                                type: 'success',
                                message: ''+a.msg
                            })
                            this.$store.state.adminname=this.form.name;
                            this.$router.push({
                                path: '/adminuser',
                            })
                        }
                    })
                }
                else{
                    this.$message({
                        type: 'error',
                        message: '账号密码为空！'
                    })
                }
            },
            reset(){
                this.form.name='',
                this.form.password=''
            }
        },
}
</script>

<style lang="scss" scoped>
.adminlogin{
            background-image: url('../static/img/adminlogin.jpg');
            background-repeat: no-repeat;
            background-size: 100%;
            width:100%;
            padding-top: 200px;
            text-align: center;
            height:870px;
            font-size: 18px;
            color: #000;
            font-family: verdana, Arial, Helvetica, sans-serif;
        }
</style>
