<template>
         <el-aside width="200px" style="background-color: rgb(238, 241, 246)"> 
            <el-menu 
                active-text-color="#409EFF"
                  class="el-menu-vertical-demo"> 
                  <el-menu-item index="1" @click.native="toadminuser"> 
                      <i class="el-icon-location"></i> 
                      <span slot="title">用户管理</span> 
                  </el-menu-item> 
                  <el-menu-item index="2" @click.native="toadmingoods"> 
                    <i class="el-icon-menu"></i> 
                    <span slot="title">商品管理</span> 
                  </el-menu-item> 
                  <el-menu-item index="3" @click.native="toadmincategory"> 
                    <i class="el-icon-setting"></i> 
                    <span slot="title">类别管理</span> 
                  </el-menu-item> 
                  <el-menu-item index="4" @click.native="toadminorder"> 
                    <i class="el-icon-document"></i> 
                    <span slot="title">订单管理</span> 
                  </el-menu-item> 
                </el-menu>
                </el-aside>
</template>

<script>
export default {
     methods:{
            toadminuser(){
                this.$router.push({
                    path: '/adminuser',
                })
            },
            toadmingoods(){
                this.$router.push({
                    path: '/admingoods',
                })
            },
            toadmincategory(){
                this.$router.push({
                    path: '/admincategory',
                })
            },
            toadminorder(){
                this.$router.push({
                    path: '/adminorder',
                })
            },
        },
}
</script>

<style>

</style>
