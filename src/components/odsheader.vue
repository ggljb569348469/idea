<template>
            <div class="header" id="odsheader">
                           <el-menu class="el-menu-demo" mode="horizontal" background-color="white" text-color="black">
                               <el-menu-item class="elhead" index="0"><a href="javascript:;" @click="home">首页</a></el-menu-item>
                               <el-menu-item class="elhead" index="1"><a @click="tosearchgoods">所有商品</a></el-menu-item>
                               <el-submenu index="2">
                                   <template slot="title">跑步</template>
                                   <el-submenu index="2-1">
                                       <template slot="title">男子跑步</template>
                                       <el-menu-item index="2-1-1">跑步鞋</el-menu-item>
                                       <el-menu-item index="2-1-2">跑步服</el-menu-item>
                                   </el-submenu>
                                   <el-submenu index="2-2">
                                       <template slot="title">女子跑步</template>
                                       <el-menu-item index="2-2-1">跑步鞋</el-menu-item>
                                       <el-menu-item index="2-2-2">跑步服</el-menu-item>
                                   </el-submenu>
                               </el-submenu>
                               <el-submenu index="3">
                                   <template slot="title">篮球</template>
                                   <el-menu-item index="3-1">篮球鞋</el-menu-item>
                                   <el-menu-item index="3-2">篮球服</el-menu-item>
                               </el-submenu>
                               <el-submenu index="4">
                                   <template slot="title">足球</template>
                                   <el-menu-item index="4-1">足球鞋</el-menu-item>
                                   <el-menu-item index="4-2">足球服</el-menu-item>
                                   <el-menu-item index="4-3">足球配件</el-menu-item>
                               </el-submenu>
                               <el-submenu index="5">
                                   <template slot="title">休闲</template>
                                   <el-submenu index="5-1">
                                       <template slot="title">男子生活</template>
                                       <el-menu-item index="5-1-1">休闲鞋</el-menu-item>
                                       <el-menu-item index="5-1-2">板鞋</el-menu-item>
                                       <el-menu-item index="5-1-3">衣服</el-menu-item>
                                       <el-menu-item index="5-1-4">裤子</el-menu-item>
                                   </el-submenu>
                                   <el-submenu index="5-2">
                                       <template slot="title">女子生活</template>
                                       <el-menu-item index="5-2-1">休闲鞋</el-menu-item>
                                       <el-menu-item index="5-2-2">板鞋</el-menu-item>
                                       <el-menu-item index="5-2-3">衣服</el-menu-item>
                                       <el-menu-item index="5-2-4">裤子</el-menu-item>
                                   </el-submenu>
                               </el-submenu>
                               <el-submenu index="6">
                                   <template slot="title">配件</template>
                                   <el-menu-item index="6-1">运动袜</el-menu-item>
                                   <el-menu-item index="6-2">运动内裤</el-menu-item>
                                   <el-menu-item index="6-3">篮球/足球</el-menu-item>
                                   <el-menu-item index="6-4">运动包包</el-menu-item>
                               </el-submenu>
                               <el-submenu index="7">
                                   <template slot="title">儿童</template>
                                   <el-submenu index="7-1">
                                       <template slot="title">童鞋</template>
                                       <el-menu-item index="7-1-1">男童鞋</el-menu-item>
                                       <el-menu-item index="7-1-2">女童鞋</el-menu-item>
                                   </el-submenu>
                                   <el-submenu index="7-2">
                                       <template slot="title">童装</template>
                                       <el-menu-item index="7-2-1">男童装</el-menu-item>
                                       <el-menu-item index="7-2-2">女童装</el-menu-item>
                                   </el-submenu>
                               </el-submenu>
            
                               <el-menu-item v-if="this.$store.state.username.length==0" class="elhead" index="8"><a href="javascript:;" @click="touserlogin" style="color:#f5222d;text-decoration: none;font-size: 16px;">登录/注册</a></el-menu-item>
                               <el-menu-item v-else class="elhead" index="8"><p>你好！{{this.$store.state.username}}</p></el-menu-item>
                                <el-menu-item><a v-if="this.$store.state.username.length!=0" @click="logout">注销</a></el-menu-item>
                               <el-menu-item><el-input placeholder="请输入查询内容" class="input-with-select"  v-model="$store.state.search">
                                   <el-button slot="append" icon="el-icon-search" @click="tosearchgoods"></el-button>
                               </el-input>
                               </el-menu-item>
                           </el-menu>
            
                           <el-header class="welcome-line">欢迎来到ods商城</el-header>
                       </div>
</template>

<script>
import utils from "../utils/utils"
export default {
    name: 'odsheader',
   methods:{
            home(){
                this.$router.push({ path: '/' })
            },
            touserlogin(){
                this.$router.push({ path: '/userlogin' })
            },
            tosearchgoods(){     //若搜索内容为空则为显示所有商品信息
                this.$router.push({ path: '/goods' })
               /*   this.$http.get('/ods/searchgoods?keyword='+this.$store.state.search).then(function (result) {
                    var a = JSON.parse(result.bodyText);
                    this.$store.state.itemlist = a.list;
                }) */ 
                  let success=(response)=>{
                    this.$store.state.itemlist =response.data.list;
                 }
                  utils.axiosMethod({
                  method:"GET",
                  url:'/ods/searchgoods',
                  params:{keyword:this.$store.state.search},
                  callback:success
               })
            },
            logout(){
                this.$store.state.username='';
                this.$router.push({ path: '/'});
            }
        }, 
}
</script>

<style lang="scss" scoped>
.el-input-group {
    padding: 15px;
    line-height: normal;
    display: inline-table;
    width: 200px;
    border-collapse: separate;
    border-spacing: 0;
}
.header {
    float: left;
    background-color: #ffffff;
    color: #333;
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    z-index: 99;
}
.header ul{
    display:inline-block;
    padding-top: 0px;
}
.header ul li{
    display: inline-block;
    vertical-align: top;
    margin-right: 30px;
    width: 80px;
    text-align: center;
    font-size: 16px;
    list-style: none;
}
* {
    margin: 0;
    padding: 0;
    list-style: none;
}
.welcome-line {
    background-color: #000;
    color: white;
    text-align: center;
    padding-top: 5px;
}
.el-header {
    height: 30px !important;
    padding: 0 20px;
    box-sizing: border-box;
    -ms-flex-negative: 0;
    flex-shrink: 0;
}
.v-enter,
.v-leave-to{
    opacity:0;
    transform: translate3d(0,0,0);
}
</style>
